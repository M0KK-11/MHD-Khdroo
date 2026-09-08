import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { defaultPortfolioContent } from '../config/defaultData';
import type { ConnectionStatus, PortfolioContent } from '../types/portfolio';

const LOCAL_STORAGE_KEY = 'mhd_khdroo_portfolio_data_cache_v1';
const SUPABASE_TABLE = 'app_data';
const DATA_ROW_ID = 'content';

interface PortfolioContextType {
  data: PortfolioContent;
  status: ConnectionStatus;
  user: User | null;
  authLoading: boolean;
  saveData: (newData: PortfolioContent) => Promise<void>;
  resetToSeed: () => Promise<void>;
  exportJSON: () => void;
  importJSON: (jsonStr: string) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioContent>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // Fallback on error
    }
    return defaultPortfolioContent;
  });

  const [status, setStatus] = useState<ConnectionStatus>('synced');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Monitor Auth State via Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
      setAuthLoading(false);
    }).catch(() => {
      setAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch initial data from Supabase and subscribe to Realtime changes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: row, error } = await supabase
          .from(SUPABASE_TABLE)
          .select('data')
          .eq('id', DATA_ROW_ID)
          .maybeSingle();

        if (error) {
          if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
            console.warn('⚠️ Supabase Table "public.app_data" is missing. Please run the SQL script in your Supabase SQL Editor.');
          } else {
            console.warn('Supabase fetch notice:', error.message);
          }
          setStatus('synced');
          return;
        }

        if (row && row.data) {
          setData(row.data as PortfolioContent);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(row.data));
          } catch (e) {
            console.warn('Failed to cache in localStorage', e);
          }
        } else {
          // Auto-seed if table is available and row is empty
          const { error: seedErr } = await supabase
            .from(SUPABASE_TABLE)
            .upsert({ id: DATA_ROW_ID, data: defaultPortfolioContent, updated_at: new Date().toISOString() });
          if (seedErr) {
            console.warn('Supabase auto-seed notice:', seedErr.message);
          }
        }
      } catch (err) {
        console.warn('Supabase connection warning:', err);
      } finally {
        setStatus('synced');
      }
    };

    fetchInitialData();

    // Supabase Realtime Subscription
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel('public:app_data')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: SUPABASE_TABLE, filter: `id=eq.${DATA_ROW_ID}` },
          (payload) => {
            if (payload.new && (payload.new as any).data) {
              const remoteData = (payload.new as any).data as PortfolioContent;
              setData(remoteData);
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
              } catch (e) {
                console.warn('Failed to cache in localStorage', e);
              }
              setStatus('synced');
            }
          }
        )
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel error:', e);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Save updated portfolio data to Supabase database (app_data table) + local cache
  const saveData = async (newData: PortfolioContent) => {
    const updated: PortfolioContent = {
      ...newData,
      updatedAt: new Date().toISOString(),
    };
    
    // Update local state immediately for fast UI response
    setData(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }

    // Push to Supabase app_data table
    const { error } = await supabase
      .from(SUPABASE_TABLE)
      .upsert({
        id: DATA_ROW_ID,
        data: updated,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('❌ Supabase save error:', error);
      if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        throw new Error('جدول Supabase لم يُنشأ بعد! يرجى تنفيذ كود الـ SQL التأسيسي في Supabase SQL Editor داخل لوحة تحكم Supabase.');
      }
      throw new Error(error.message || 'Failed to save to Supabase app_data table.');
    }

    console.log('✅ Successfully saved data to Supabase app_data table!');
    setStatus('synced');
  };

  // Reset data to seed default
  const resetToSeed = async () => {
    await saveData(defaultPortfolioContent);
  };

  // Export JSON file
  const exportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const importJSON = async (jsonStr: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonStr) as PortfolioContent;
      if (!parsed.siteConfig || !parsed.projects) {
        throw new Error('Invalid JSON structure');
      }
      await saveData(parsed);
      return true;
    } catch (err) {
      console.error('Import JSON error:', err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        status,
        user,
        authLoading,
        saveData,
        resetToSeed,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

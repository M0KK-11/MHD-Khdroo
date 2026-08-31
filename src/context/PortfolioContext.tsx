import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { defaultPortfolioContent } from '../config/defaultData';
import type { ConnectionStatus, PortfolioContent } from '../types/portfolio';

const LOCAL_STORAGE_KEY = 'mhd_khdroo_portfolio_data_cache_v1';
const FIRESTORE_COLLECTION = 'Khdroo';
const FIRESTORE_DOC = 'content';

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

  // Monitor Auth State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // Monitor Firestore Realtime Sync
  useEffect(() => {
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
    
    const unsubscribeSnapshot = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as PortfolioContent;
          setData(remoteData);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
          } catch (e) {
            console.warn('Failed to cache in localStorage', e);
          }
          setStatus('synced');
        } else {
          // Auto-initialize document in Firestore collection Khdroo
          setDoc(docRef, defaultPortfolioContent, { merge: true })
            .then(() => {
              console.log('✅ Auto-created Firestore collection "Khdroo", document "content"!');
              setStatus('synced');
            })
            .catch((err) => {
              console.warn('Firestore auto-seed notice (requires Firestore write rules):', err);
              setStatus('synced');
            });
        }
      },
      (error) => {
        console.warn('Firestore snapshot listener notice:', error);
        setStatus('synced');
      }
    );

    return () => unsubscribeSnapshot();
  }, []);

  // Save updated portfolio data to Firestore + local cache
  const saveData = async (newData: PortfolioContent) => {
    const updated: PortfolioContent = {
      ...newData,
      updatedAt: new Date().toISOString(),
    };
    
    // Update local state immediately for instant responsiveness
    setData(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }

    // Explicitly push to Firestore document 'Khdroo/content'
    const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
    try {
      await setDoc(docRef, updated, { merge: true });
      console.log('✅ Successfully saved and created Firestore collection "Khdroo", document "content"!');
      setStatus('synced');
    } catch (err: any) {
      console.error('❌ Firestore setDoc error:', err);
      // Re-throw so user gets clear feedback if Firebase rules block writing
      throw new Error(err.message || 'Failed to write to Firestore collection Khdroo.');
    }
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

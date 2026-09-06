import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ayubzogruomemjxhtfgo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_JDOKwfYwwkMHf6ohfZw9wQ_TYfCk7pg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

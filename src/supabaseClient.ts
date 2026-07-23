import { createClient } from '@supabase/supabase-js';

// Read config credentials from environment variables loaded by Vite.
// Fallback to placeholder strings to prevent application compile crashes.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

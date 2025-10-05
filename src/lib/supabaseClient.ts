import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Create a dummy client-like object that will throw on use to surface clear error
    return new Proxy({} as any, {
      get() {
        throw new Error('Supabase env not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      },
    });
  }
  return createClient(supabaseUrl, supabaseAnonKey);
})();

export type QuizSubmissionRow = {
  team_name: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  percentage: number;
  created_at?: string;
};



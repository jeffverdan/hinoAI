import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnon);

// Server-side Supabase (service role — use only in API routes)
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    // Fallback to anon key in dev if service key is not set
    return createClient(supabaseUrl, supabaseAnon);
  }
  return createClient(supabaseUrl, serviceKey);
}

// Types
export interface Hymn {
  id: string;
  story: string;
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  theme: string;
  themes: string[];
  style: string;
  tone: string;
  audio_url: string | null;
  user_id: string | null;
  created_at: string;
}

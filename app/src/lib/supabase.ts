import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — o cliente só é criado quando realmente chamado em runtime,
// não no momento da importação do módulo (evita crash no build do Next.js quando
// as env vars ainda não estão disponíveis).
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      '[Supabase] Env vars ausentes: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.',
    );
  }

  _client = createClient(url, key);
  return _client;
}

// Alias — mantém compatibilidade com código que importava `supabase` diretamente
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Server-side client (service role — usar apenas em API routes)
export function createServerClient(): SupabaseClient {
  const url        = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) throw new Error('[Supabase] NEXT_PUBLIC_SUPABASE_URL não configurada.');

  return createClient(url, serviceKey ?? anonKey ?? '');
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

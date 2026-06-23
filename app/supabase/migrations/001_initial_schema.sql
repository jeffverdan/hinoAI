-- ============================================================
-- HinoAI — Schema inicial (MVP)
-- Rodar no Supabase: SQL Editor → colar e executar
-- ============================================================

-- ── Extensões ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Tabela: hymns ─────────────────────────────────────────
-- Armazena cada hino gerado. user_id é nullable (MVP sem login).

create table if not exists public.hymns (
  id          uuid primary key default uuid_generate_v4(),

  -- Input do usuário
  story       text        not null,
  style       text        not null,   -- 'tradicional' | 'quarteto' | 'congregacional' | 'jovem'
  tone        text        not null,   -- 'Solene' | 'Alegre' | 'Inspirador' | 'Sereno'
  themes      text[]      not null default '{}',

  -- Output da IA
  title       text        not null,
  lyrics      text        not null,
  chords      text        not null default '',
  verses      text[]      not null default '{}',
  theme       text        not null default '',   -- tema bíblico principal
  audio_url   text,                             -- URL do Suno (nullable até o áudio ficar pronto)

  -- Vínculo com usuário (Fase 2 — por enquanto sempre null)
  user_id     uuid        references auth.users(id) on delete set null,

  -- Metadados
  created_at  timestamptz not null default now()
);

-- Índices
create index if not exists hymns_created_at_idx on public.hymns (created_at desc);
create index if not exists hymns_user_id_idx    on public.hymns (user_id) where user_id is not null;

-- ── Row Level Security ────────────────────────────────────
alter table public.hymns enable row level security;

-- MVP: qualquer pessoa pode inserir (sem login)
-- A inserção vem pelo service_role key no servidor, então bypassa RLS.
-- Mas criamos a policy mesmo assim para quando migrar para anon key.
create policy "Inserção pública via service role"
  on public.hymns for insert
  with check (true);

-- Leitura pública de todos os hinos (para futura página de exemplos)
create policy "Leitura pública"
  on public.hymns for select
  using (true);

-- Usuário autenticado pode atualizar e deletar os próprios hinos (Fase 2)
create policy "Usuário atualiza próprios hinos"
  on public.hymns for update
  using (auth.uid() = user_id);

create policy "Usuário deleta próprios hinos"
  on public.hymns for delete
  using (auth.uid() = user_id);

-- ============================================================
-- FASE 2 — rodar quando implementar autenticação e pagamentos
-- (não rodar agora)
-- ============================================================

/*

-- Tabela: user_credits (créditos avulsos)
create table if not exists public.user_credits (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  credits     int  not null default 0,
  updated_at  timestamptz not null default now()
);
alter table public.user_credits enable row level security;
create policy "Usuário lê próprios créditos"
  on public.user_credits for select using (auth.uid() = user_id);

-- Tabela: subscriptions (plano Ministério)
create table if not exists public.subscriptions (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  plan                text not null default 'ministerio',
  status              text not null default 'active',  -- 'active' | 'cancelled' | 'past_due'
  mp_subscription_id  text,   -- ID da assinatura no Mercado Pago
  current_period_end  timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
create policy "Usuário lê própria assinatura"
  on public.subscriptions for select using (auth.uid() = user_id);

-- Tabela: payments (histórico de pagamentos avulsos)
create table if not exists public.payments (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  hymn_id         uuid references public.hymns(id) on delete set null,
  amount_cents    int  not null,
  status          text not null default 'pending',  -- 'pending' | 'approved' | 'rejected'
  mp_payment_id   text,
  created_at      timestamptz not null default now()
);
alter table public.payments enable row level security;
create policy "Usuário lê próprios pagamentos"
  on public.payments for select using (auth.uid() = user_id);

*/

-- ============================================================
-- HinoAI — Migration 002: áudio salvo, karaokê e link permanente
-- Rodar DEPOIS do 001_initial_schema.sql, no projeto correto
-- (esoufwvapxuvgiubspcw). Supabase: SQL Editor → colar e executar.
-- Idempotente: pode rodar mais de uma vez sem erro.
-- ============================================================

alter table public.hymns
  -- IDs do Suno: task (geração) e audio (faixa escolhida) — usados p/ karaokê
  add column if not exists task_id       text,
  add column if not exists audio_id      text,

  -- Letra sincronizada palavra a palavra (endpoint get-timestamped-lyrics do Suno)
  -- Formato: [{ "word": "...", "startS": 0.0, "endS": 0.0, "success": true }, ...]
  add column if not exists aligned_words jsonb,

  -- Expiração do áudio do Suno (links do Suno expiram) — 14 dias a partir da criação
  add column if not exists expires_at    timestamptz not null default (now() + interval '14 days');

-- Para os hinos já existentes, define a expiração com base na data de criação
update public.hymns
   set expires_at = created_at + interval '14 days'
 where expires_at is null;

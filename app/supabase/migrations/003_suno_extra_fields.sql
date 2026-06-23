-- ============================================================
-- HinoAI — Migration 003: campos extras retornados pelo Suno
-- Rodar DEPOIS do 002. Idempotente.
-- ============================================================

alter table public.hymns
  add column if not exists stream_audio_url text,     -- URL de streaming (disponível antes do mp3 final)
  add column if not exists image_url        text,     -- capa gerada pelo Suno
  add column if not exists duration         numeric,  -- duração em segundos
  add column if not exists model_name       text,     -- ex: chirp-v3-5 / V4_5ALL
  add column if not exists tags             text;     -- estilos/tags retornados pelo Suno

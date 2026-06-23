import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { HYMN_SYSTEM_PROMPT, buildHymnUserPrompt } from '@/lib/prompts';
import { createServerClient } from '@/lib/supabase';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { story, style, tone, themes } = body as {
      story: string;
      style: string;
      tone: string;
      themes: string[];
    };

    if (!story || story.trim().length < 12) {
      return NextResponse.json({ error: 'Testemunho muito curto.' }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      system: HYMN_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildHymnUserPrompt({ story, style, tone, themes }),
        },
      ],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Resposta da Claude:', raw);
      return NextResponse.json({ error: 'Formato de resposta inválido.' }, { status: 500 });
    }

    const hymn = JSON.parse(jsonMatch[0]) as {
      title: string;
      lyrics: string;
      chords: string;
      verses: string[];
      theme: string;
    };

    // Persiste no Supabase (best effort — não bloqueia a resposta)
    try {
      const db = createServerClient();
      await db.from('hymns').insert({
        story,
        title:     hymn.title,
        lyrics:    hymn.lyrics,
        chords:    hymn.chords,
        verses:    hymn.verses,
        theme:     hymn.theme,
        themes:    themes,
        style,
        tone,
        audio_url: null,
        user_id:   null,
      });
    } catch (dbErr) {
      console.warn('Supabase insert failed (non-fatal):', dbErr);
    }

    return NextResponse.json({ hymn });
  } catch (err: unknown) {
    console.error('generate-lyrics error:', err);
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

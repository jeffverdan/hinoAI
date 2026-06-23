# Hino.AI — Design System

> _"Cantai ao Senhor um cântico novo."_ — Salmos 96:1

Hino.AI is a platform that turns real life-and-faith experiences into **personalized Christian (Adventist) hymns** — complete with lyrics, *cifra* (chord chart) and an AI-sung audio track. A person tells their story (a hardship overcome, a grace received, a moment of faith); the AI interprets the emotional tone and biblical theme and generates a hymn ready to sing, share, or use in worship.

This design system establishes the Hino.AI brand and gives design agents the foundations, components, and full-screen UI kits to build on-brand interfaces and assets.

---

## Sources

- **GitHub:** [`github.com/jeffverdan/hinoai`](https://github.com/jeffverdan/hinoai) — at the time of authoring this repo contained **only a `README.md`** (product concept, roadmap, stack, business model). There was **no application code, no components, and no existing visual identity.** Explore it further if more is added later; everything visual in this system was therefore *established from the product concept*, not recreated from source UI.
- **Product concept (from the repo README):** MVP flow is `Form → Lyrics → Audio → Download`; stack is Next.js + Supabase + Claude API (lyrics/cifra) + Suno AI (audio) + Mercado Pago (payments). Target market: members and worship leaders of Adventist churches in Brazil (~1.5M people), worship ministries, and families. Plans: Free (1 hymn), Avulso (R$ 14,90/hymn), Ministério (R$ 39,90/mês unlimited).

> ⚠️ **This is an established brand, not a recreation.** Because no UI existed, the colors, type, logo, and screens here are a proposed identity. Treat them as a strong v1 to react to — see the open asks at the bottom.

---

## The brand in one breath

Warm, intimate, and reverent — a **sacred-editorial** voice. It should feel like a beautifully printed hymnal meeting a calm, modern app: candle-lit warmth, generous space, scripture-like serifs, and a single golden light of hope. Emotional without being saccharine; devotional without being heavy.

---

## CONTENT FUNDAMENTALS

**Language.** Brazilian Portuguese, always. (UI labels, marketing, notifications.) English appears only in the product name's `.AI`.

**Voice & person.** Speaks *to* the user as **"você"**, warmly and personally — a gentle worship leader, never a salesperson. Invites rather than commands: _"Conte sua história"_, _"Vamos transformar isso em louvor"_. First-person plural ("nós/vamos") is used to walk *alongside* the user.

**Tone.** Acolhedor (welcoming), esperançoso (hopeful), respeitoso. Reverent but plain-spoken — avoid churchy jargon that excludes; avoid hype. Emotion is carried by the testimony and the scripture, not by exclamation marks.

**Casing.** Sentence case everywhere for UI and headings (_"Seu hino está pronto"_). UPPERCASE reserved only for small tracked eyebrows/overlines (_"PASSO 2 DE 3"_, _"MINISTÉRIO"_). Never ALL-CAPS headlines.

**Scripture.** Bible verses are a signature device, always set in *italic Spectral* with the reference after an em-dash: _"Cantai ao Senhor um cântico novo." — Salmos 96:1_. Use sparingly and intentionally — a verse should feel like a held note, not decoration.

**Numbers & money.** Brazilian formatting: `R$ 14,90`, `R$ 39,90/mês`. Comma decimal.

**Emoji.** **Not used in the product UI.** The concept README uses them as casual markdown decoration; the product itself stays free of emoji to preserve reverence. (Iconography is handled by a proper icon set — see below.)

**Microcopy examples.**
- Empty state: _"Seu hinário começa aqui. Conte o primeiro testemunho."_
- Generating: _"Compondo seu hino… isso leva cerca de um minuto."_
- CTA primary: _"Criar meu hino"_ · CTA secondary: _"Ouvir um exemplo"_
- Error (gentle): _"Algo não saiu como esperávamos. Vamos tentar de novo?"_

---

## VISUAL FOUNDATIONS

**Color.** A warm sacred palette of three voices plus one emotion:
- **Midnight blue** (`--night-800` #1a2438) — brand ink; used for serif headings on light, and as the full "Sanctuary" dark surface for the player and hero moments.
- **Gold** (`--gold-500` #c9a14a) — the sacred accent and primary action; a single golden light. Used as fills, hairline borders, and glows — never as large flat fields.
- **Warm ivory / cream** (`--ivory-50` #fdfaf3 → `--cream-300` #e8dcc0) — the default page; paper-like warmth, never pure white as the canvas (cards may be white to lift off the ivory).
- **Ember** (`--ember-500` #cf5a3c) — emotional warm accent for love/gratitude/testimony highlights and as the danger hue. Used sparingly.
Neutrals are **warm-tinted** (`--ink-*`, brown-gray), never cool gray. Success borrows a calm **sage** green.

**Two themes.** Light (warm ivory) is primary. `[data-theme="sanctuary"]` flips to deep midnight for the hymn player, hero sections, and "the reveal" — the moment a finished hymn is presented. Switching theme only re-points semantic aliases; component code never changes.

**Type.** Editorial pairing:
- **Spectral** (serif) — display, hymn titles, lyrics, and scripture. Reads like a printed hymnal; italic for verses.
- **Figtree** (sans) — all UI, body, labels. Warm humanist, friendly, highly legible.
- **JetBrains Mono** — *cifra* / chord charts only, where character alignment above lyrics matters.
Display sizes are large and confident (44–72px); body is 16–18px at `line-height 1.6`; lyrics breathe at `1.8`. Headings use tight tracking (`-0.02em`); eyebrows use wide tracking (`0.18em`).

**Spacing & layout.** 8px rhythm. Generous, calm, lots of breathing room — sacred space. Reading width capped (~768px) for lyrics; app content ~1080px. Single-column, centered focus for the creation flow (one question at a time).

**Backgrounds.** Warm ivory flats are the default. Reserved gradient *washes*: `--wash-dawn` (subtle ivory→cream), `--wash-sanctuary` (midnight, for dark), `--wash-halo` (a soft radial golden glow behind hero/reveal moments — like light from above). **No** purple/blue tech gradients, no busy patterns. Optional fine paper grain at very low opacity is on-brand; loud textures are not.

**Imagery.** Warm, natural-light **photography** is the intended hero medium — real people, hands, candlelight, church interiors, golden-hour tones; emotionally warm, slightly desaturated, never cold or clinical. Because no brand photos exist yet, UI kits use clearly-marked image slots / warm gradient placeholders. Decorative illustration is minimal-line if used at all. (No stock-y, no cool blue imagery.)

**Corners & cards.** Gently rounded — `--radius-lg` (18px) for cards, pill (`999px`) for buttons and chips. Cards sit on ivory as **white surfaces with a soft warm shadow** and a hairline `--border` (warm). On dark, cards are translucent (`rgba(255,255,255,0.04)`) with a faint light border. Avoid hard 90° corners; avoid heavy/black borders.

**Shadows.** **Warm-tinted** (brown/gold cast, never neutral gray): `--shadow-sm…xl`. A special `--glow-gold` ring is used for the active/sacred emphasis (the selected hymn style, the play button). Sunken lyric sheets use a soft `--shadow-inset`.

**Borders.** Hairline (1px) warm `--ink-200`; gold hairline (`--border-gold`) for selected/sacred states. Dividers are very faint.

**Motion.** Calm and reverent — **gentle fades and soft rises, never bounce or spring.** Easing `--ease-out` for entrances, `--ease-standard` for state changes. Content fades up over `--dur-reveal` (700ms) — especially "the reveal" of a finished hymn, which should feel like a held breath releasing. Respect `prefers-reduced-motion`. No infinite decorative loops except the audio waveform while playing.

**Hover / press.**
- **Hover:** primary (gold) buttons deepen to `--accent-strong` and lift with `--glow-soft`; ghost/secondary warm their background to `--bg-subtle`; cards lift shadow `sm → md`. Links deepen toward `--accent-ink`.
- **Press:** scale down to `0.98` and drop shadow — a gentle, grounded press (no color flash).
- **Focus:** always a visible `--focus-ring` (soft gold), never removed.

**Transparency & blur.** Used lightly: the Sanctuary player uses a frosted (`backdrop-filter: blur`) bottom bar over the dark wash; sticky app headers use a translucent ivory with slight blur. Never glassmorphism-as-decoration.

---

## ICONOGRAPHY

There were no icon assets in the source repo. The system standardizes on **[Lucide](https://lucide.dev)** (MIT) — clean, rounded, consistent **stroke** icons (1.75–2px stroke, round caps/joins) that match Figtree's friendly humanism.

- **Delivery:** load from CDN — `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`, or the per-icon ESM/React package. In this system's cards/components icons are drawn inline (see `IconButton`).
- **Sizing:** 16 / 20 / 24px; stroke `2`; color inherits `currentColor` (use `--text-muted` for quiet, `--accent` for emphasis).
- **Common glyphs:** `music` / `music-2` (the brand note), `play` / `pause`, `mic`, `audio-lines` (waveform), `download`, `share-2`, `heart`, `sparkles` (generation), `book-open` (scripture/lyrics), `church`, `wand-2`.
- **The brand mark** is a custom roundel built from the Lucide `music` note on a gold disc — see `assets/logo/`. The treble-clef motif lives in the mark.
- **Emoji & unicode** are **not** used as UI icons. (⚠️ Substitution flag: Lucide is a chosen substitute since no brand icon set existed — see open asks.)

---

## File index / manifest

```
styles.css                     ← global entry (consumers link this); @import lines only
tokens/
  fonts.css                    ← Spectral · Figtree · JetBrains Mono (Google-hosted)
  colors.css                   ← palette + light & [data-theme="sanctuary"] semantic aliases
  typography.css               ← families, scale, weights, line-heights, tracking
  spacing.css                  ← 8px rhythm, containers, control heights
  effects.css                  ← radii, warm shadows, gold glow, motion
assets/
  logo/                        ← hinoai-mark.svg, hinoai-mark-outline.svg (+ Logo component)
guidelines/                    ← 14 foundation specimen cards (Design System tab)
components/
  core/                        ← Button, IconButton, Badge, Tag, Card, Avatar, Logo, Icon
  forms/                       ← Input, Textarea, Checkbox, Switch, RadioCard
  hymn/                        ← ScriptureQuote, ChordSheet, WaveBars, StepDots
ui_kits/
  creator/                     ← hymn-creation flow (story → style → generating → reveal)
  player/                      ← Sanctuary hymn player (lyrics + cifra + audio)
README.md                      ← this guide
SKILL.md                       ← Agent-Skills-compatible entry
```

Namespace for cards/components: `window.HinoAIDesignSystem_121ee1`.
Each component ships a `.jsx` + `.d.ts` (props contract) + `.prompt.md` (usage); per-group `*.card.html` files render the Components tab. Five components (Logo, ScriptureQuote, Button, Card, RadioCard) carry `@startingPoint` tags as intentional showcase entries.

### Open asks (help me make this perfect)
1. **Fonts** — Spectral/Figtree/JetBrains Mono are my picks (no brand fonts existed). Approve or send replacements.
2. **Icons** — Lucide is a substitute for a missing brand set. Keep it, or point me at one.
3. **Photography** — I used marked placeholders; share real warm photos (or approve a sourced direction) and I'll wire them in.
4. **Palette/logo** — react to the gold + midnight + ivory direction and the music-note roundel.

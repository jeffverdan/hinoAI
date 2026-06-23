---
name: hinoai-design
description: Use this skill to generate well-branded interfaces and assets for Hino.AI — a platform that turns real testimonies of faith into personalized Adventist hymns (lyrics + cifra + AI-sung audio), for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** warm, intimate, reverent "sacred-editorial". Deep midnight blue + gold + warm ivory/cream, with an ember accent. Portuguese (pt-BR).
- **Tokens:** link `styles.css` (it `@import`s `tokens/*.css`). Light theme is default; wrap dark/hero/player surfaces in `[data-theme="sanctuary"]`.
- **Type:** Spectral (serif display, scripture, lyrics) · Figtree (sans UI/body) · JetBrains Mono (cifra/chords).
- **Components:** React primitives under `components/` — Button, IconButton, Badge, Tag, Card, Avatar, Logo, Icon, Input, Textarea, Checkbox, Switch, RadioCard, ScriptureQuote, ChordSheet, WaveBars, StepDots. Each has a `.prompt.md` with usage.
- **UI kits:** `ui_kits/creator/` (hymn-creation flow) and `ui_kits/player/` (sanctuary player) — interactive recreations of the product surfaces.
- **Signature:** the verse _"Cantai ao Senhor um cântico novo." — Salmos 96:1_, set via `<ScriptureQuote>`.
- **Icons:** Lucide (curated subset inlined in `Icon`); use `lucide-react` in production.

See the README's CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS and ICONOGRAPHY sections before designing.

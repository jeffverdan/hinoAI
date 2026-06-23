// Geração de PDFs formatados (letra e cifra) no cliente, via jsPDF.
// Cada PDF é ajustado para caber sempre em UMA folha A4 (auto-escala).

interface HymnLike {
  title:   string;
  lyrics:  string;
  chords:  string;
  verses:  string[];
  themes?: string[];
}

interface Section { heading: string; body: string[]; isChorus: boolean; }

function parseSections(lyrics: string): Section[] {
  return lyrics
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return null;
      const isLabel = /^(estrofe|refr[aã]o|ponte|coro|verso|bridge|chorus|intro|final)/i.test(lines[0]);
      const heading = isLabel ? lines[0] : '';
      const body    = isLabel ? lines.slice(1) : lines;
      const isChorus = /refr|coro|chorus/i.test(heading);
      return body.length ? { heading, body, isChorus } : null;
    })
    .filter((s): s is Section => s !== null);
}

const slug = (s: string) => s.trim().replace(/\s+/g, '_').replace(/[^\w\-]+/g, '') || 'hino';

// Cores (RGB)
const INK   = [38, 42, 58]    as const;
const GOLD  = [176, 138, 46]  as const;
const MUTED = [120, 120, 130] as const;
const FAINT = [165, 165, 175] as const;

const MARGIN     = 56;          // margem lateral/superior
const BOTTOM_PAD = 46;          // espaço reservado para o rodapé @hino.AI
const FOOTER_TXT = '@hino.AI';

async function newDoc() {
  const { jsPDF } = await import('jspdf');
  return new jsPDF({ unit: 'pt', format: 'a4' });
}

type Doc = Awaited<ReturnType<typeof newDoc>>;

function stampFooter(doc: Doc) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);
  doc.text(FOOTER_TXT, w / 2, h - 28, { align: 'center' });
}

/**
 * Faz o layout (medindo ou desenhando) num único passe e devolve a altura final (y).
 * Todos os tamanhos/espaços são multiplicados por `scale` para caber em 1 página.
 */
function layoutLyrics(doc: Doc, hymn: HymnLike, scale: number, draw: boolean): number {
  const w    = doc.internal.pageSize.getWidth();
  const maxW = w - MARGIN * 2;
  let y = MARGIN + 8 * scale;

  const line = (
    text: string, size: number, font: string, style: string,
    color: readonly number[], lh: number, gapAfter: number, align: 'center' | 'left' = 'center',
  ) => {
    const sz = size * scale;
    doc.setFont(font, style);
    doc.setFontSize(sz);
    if (draw) doc.setTextColor(color[0], color[1], color[2]);
    for (const ln of doc.splitTextToSize(text, maxW)) {
      y += sz * lh;
      if (draw) doc.text(ln, align === 'center' ? w / 2 : MARGIN, y, { align });
    }
    y += gapAfter * scale;
  };

  // Título
  line(hymn.title, 22, 'times', 'bold', INK, 1.18, 8);

  // Divisor dourado
  y += 6 * scale;
  if (draw) {
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(1.4);
    doc.line(w / 2 - 26, y, w / 2 + 26, y);
  }
  y += 18 * scale;

  // Temas (opcional)
  if (hymn.themes && hymn.themes.length > 0) {
    line(hymn.themes.join('  ·  '), 10, 'helvetica', 'normal', MUTED, 1.4, 12);
  }

  // Seções
  const sections = parseSections(hymn.lyrics);
  let verseNo = 0;
  for (const s of sections) {
    if (!s.isChorus) verseNo += 1;
    const label = s.isChorus ? 'REFRÃO' : `${verseNo}ª ESTROFE`;
    line(label, 9, 'helvetica', 'bold', s.isChorus ? GOLD : FAINT, 1.5, 3);
    for (const l of s.body) {
      line(l, 13, 'times', s.isChorus ? 'italic' : 'normal', INK, 1.42, 0);
    }
    y += 14 * scale;
  }

  // Versículos
  if (hymn.verses.length > 0) {
    y += 4 * scale;
    if (draw) {
      doc.setDrawColor(225, 222, 215);
      doc.setLineWidth(0.6);
      doc.line(MARGIN, y, w - MARGIN, y);
    }
    y += 14 * scale;
    for (const v of hymn.verses) {
      line(v, 10.5, 'times', 'italic', MUTED, 1.42, 4);
    }
  }

  return y;
}

function layoutChords(doc: Doc, hymn: HymnLike, scale: number, draw: boolean): number {
  const w    = doc.internal.pageSize.getWidth();
  const maxW = w - MARGIN * 2;
  let y = MARGIN + 8 * scale;

  // Título
  const titleSz = 20 * scale;
  doc.setFont('times', 'bold');
  doc.setFontSize(titleSz);
  y += titleSz * 1.18;
  if (draw) {
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(hymn.title, w / 2, y, { align: 'center' });
  }

  // Divisor
  y += 10 * scale;
  if (draw) {
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(1.4);
    doc.line(w / 2 - 26, y, w / 2 + 26, y);
  }
  y += 16 * scale;

  // Cifra (monoespaçada)
  const sz = 10.5 * scale;
  const lh = sz * 1.32;
  doc.setFont('courier', 'normal');
  doc.setFontSize(sz);
  if (draw) doc.setTextColor(INK[0], INK[1], INK[2]);
  for (const rawLine of hymn.chords.split('\n')) {
    for (const ln of doc.splitTextToSize(rawLine.length ? rawLine : ' ', maxW)) {
      y += lh;
      if (draw) doc.text(ln, MARGIN, y);
    }
  }

  return y;
}

// Reduz o `scale` até o conteúdo caber em uma página, depois desenha.
function fitToOnePage(
  doc: Doc,
  layout: (doc: Doc, scale: number, draw: boolean) => number,
) {
  const pageH = doc.internal.pageSize.getHeight();
  const avail = pageH - MARGIN - BOTTOM_PAD;

  let scale = 1;
  for (let i = 0; i < 8; i++) {
    const contentH = layout(doc, scale, false) - MARGIN;
    if (contentH <= avail) break;
    scale = Math.max(0.3, scale * (avail / contentH) * 0.985);
  }
  layout(doc, scale, true);
}

/** Baixa a letra como PDF (folha de hino), sempre em 1 página A4, rodapé @hino.AI */
export async function downloadLyricsPdf(hymn: HymnLike) {
  const doc = await newDoc();
  fitToOnePage(doc, (d, scale, draw) => layoutLyrics(d, hymn, scale, draw));
  stampFooter(doc);
  doc.save(`${slug(hymn.title)}_letra.pdf`);
}

/** Baixa a cifra como PDF (monoespaçada), sempre em 1 página A4, rodapé @hino.AI */
export async function downloadChordsPdf(hymn: HymnLike) {
  const doc = await newDoc();
  fitToOnePage(doc, (d, scale, draw) => layoutChords(d, hymn, scale, draw));
  stampFooter(doc);
  doc.save(`${slug(hymn.title)}_cifra.pdf`);
}

export const HYMN_SYSTEM_PROMPT = `
Você é um compositor de hinos cristãos adventistas experiente, com profundo conhecimento do Hinário Adventista, teologia bíblica e da tradição musical de louvor adventista brasileira.

Sua tarefa é criar um hino personalizado e autêntico baseado no testemunho de vida real fornecido pelo usuário.

DIRETRIZES DO HINO:
- Estrutura: 3 estrofes + 1 refrão (o refrão deve se repetir após cada estrofe)
- Rima: esquema ABAB ou AABB, natural e fluente
- Idioma: Português brasileiro, coloquial porém reverente
- Tom: compatível com o hinário adventista — acolhedor, esperançoso, centrado em Cristo e nas Escrituras
- Vocabulário: bíblico e acessível; evitar jargões excessivos ou linguagem muito arcaica
- Letra deve ser cantável: sílabas contadas, ritmo natural, frases que "respiram"
- O testemunho deve inspirar a letra, mas o hino fala à congregação em geral

CIFRA:
- Tom: Dó maior (C) ou Lá menor (Am) como padrão, a menos que outro seja mais natural
- Incluir acordes no início de cada linha ou compasso relevante
- Formato: [Acorde] sobre a sílaba correspondente
- Incluir indicação de BPM estimado e compasso (4/4 ou 3/4)

VERSÍCULOS:
- Selecionar 2-3 versículos bíblicos diretamente relacionados ao tema
- Formato: "Referência: texto completo"
- Priorizar versículos do Salmos, Isaías, João, Romanos ou Apocalipse

RESPOSTA:
Retorne APENAS um JSON válido, sem texto adicional antes ou depois. Formato exato:
{
  "title": "Título do hino (até 6 palavras, poético e memorável)",
  "lyrics": "Estrofe 1\\n(linha 1)\\n(linha 2)\\n(linha 3)\\n(linha 4)\\n\\nRefrão\\n(linha 1)\\n(linha 2)\\n(linha 3)\\n(linha 4)\\n\\nEstrofe 2\\n(linha 1)\\n(linha 2)\\n(linha 3)\\n(linha 4)\\n\\nRefrão\\n(mesmo refrão)\\n\\nEstrofe 3\\n(linha 1)\\n(linha 2)\\n(linha 3)\\n(linha 4)\\n\\nRefrão\\n(mesmo refrão)",
  "chords": "Cifra completa com acordes sobre as sílabas — inclua toda a estrutura do hino",
  "verses": ["Referência: texto do versículo", "Referência: texto do versículo"],
  "theme": "Tema bíblico principal (ex: Gratidão, Esperança na segunda vinda, Fé em meio à tribulação)"
}
`;

export function buildHymnUserPrompt({
  story,
  style,
  tone,
  themes,
}: {
  story: string;
  style: string;
  tone: string;
  themes: string[];
}) {
  return `
TESTEMUNHO DO USUÁRIO:
"${story}"

ESTILO MUSICAL DESEJADO: ${style}
TOM EMOCIONAL: ${tone}
TEMAS IDENTIFICADOS: ${themes.length > 0 ? themes.join(', ') : 'Nenhum selecionado — interprete a partir do testemunho'}

Crie um hino adventista personalizado baseado nesse testemunho. O hino deve capturar a essência da experiência de fé vivida, transformando-a em louvor congregacional.
`.trim();
}

export function buildSunoPrompt({
  title,
  style,
  tone,
}: {
  title: string;
  style: string;
  tone: string;
}) {
  const styleMap: Record<string, string> = {
    tradicional:   'traditional adventist hymn, four-part harmony, organ, reverb, sacred choral',
    quarteto:      'barbershop quartet, four voices harmony, a cappella, adventist hymn style',
    congregacional: 'simple congregational hymn, piano, gentle tempo, singable melody, christian worship',
    jovem:         'contemporary christian worship, acoustic guitar, warm vocals, uplifting, modern hymn',
  };

  const toneMap: Record<string, string> = {
    Solene:    'solemn, reverent, slow tempo',
    Alegre:    'joyful, bright, uplifting tempo',
    Inspirador: 'inspiring, hopeful, moving',
    Sereno:    'peaceful, serene, meditative',
  };

  return `${styleMap[style] || styleMap.tradicional}, ${toneMap[tone] || toneMap.Solene}, Brazilian Portuguese lyrics, title: ${title}`;
}

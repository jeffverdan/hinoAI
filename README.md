# 🎵 HinoAI

> Plataforma que transforma experiências reais de vida e fé em hinos cristãos adventistas personalizados, com letra, cifra e áudio gerados por IA.

---

## 💡 Sobre o Projeto

O HinoAI permite que qualquer pessoa conte sua história — uma superação, uma graça recebida, um momento de fé — e receba um hino personalizado no estilo adventista, pronto para cantar, compartilhar ou usar no culto.

---

## 🙋 Como o usuário usa

1. **Conta sua história**
   - "Perdi meu emprego em 2024 e Deus abriu uma porta melhor."
   - "Passei por dificuldades financeiras, mas hoje sou grato."

2. **Escolhe o estilo**
   - Hino tradicional, quarteto, congregacional ou jovem

3. **A IA interpreta e gera automaticamente**
   - Tema bíblico (fé, esperança, gratidão, família, cura, segunda vinda)
   - Tom emocional (solene, alegre, inspirador)
   - Letra completa + versículos relacionados + cifra
   - Áudio cantado

---

## 🗺️ Roadmap

| Fase | Escopo | Status |
|------|--------|--------|
| **MVP** | Formulário → Letra → Áudio → Download | 🔨 Em desenvolvimento |
| **Monetização** | Auth + planos + histórico de hinos | 🔜 Planejado |
| **Viral** | Vídeos automáticos para Instagram/TikTok/WhatsApp | 🔜 Planejado |

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend + Backend | Next.js |
| Banco de dados + Auth | Supabase |
| Geração de letra e cifra | Claude API (Anthropic) |
| Geração de áudio | Suno AI |
| Pagamentos | Mercado Pago |
| Deploy | Vercel |

---

## 💰 Modelo de Negócio

| Plano | Preço | Descrição |
|-------|-------|-----------|
| Gratuito | R$ 0 | 1 hino para experimentar |
| Avulso | R$ 14,90 | Por hino gerado |
| Ministério | R$ 39,90/mês | Ilimitado — para igrejas e líderes de louvor |

---

## 📁 Estrutura do Projeto

```
hinoai/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
│       ├── generate-lyrics/   # Claude API
│       └── generate-audio/    # Suno API
├── components/
├── lib/
│   ├── supabase.ts
│   └── prompts/               # Prompts adventistas
└── public/
```

---

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/hinoai.git
cd hinoai

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Rode o servidor
npm run dev
```

### Variáveis de ambiente necessárias

```env
ANTHROPIC_API_KEY=
SUNO_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
MERCADO_PAGO_ACCESS_TOKEN=
```

---

## 🎯 Mercado-alvo

- Membros e líderes de igrejas Adventistas no Brasil
- Ministérios de louvor
- Famílias que querem registrar momentos de fé

> Brasil possui aproximadamente 1,5 milhão de adventistas — nicho específico, engajado e com alta propensão ao compartilhamento orgânico.

---

## ✍️ Autor

Desenvolvido por [Seu Nome] — projeto solo.

---

*"Cantai ao Senhor um cântico novo." — Salmos 96:1*

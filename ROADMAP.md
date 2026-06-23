# 🗺️ HinoAI — Roadmap

> Plataforma que transforma histórias reais de fé em hinos adventistas personalizados com IA.
> Formato: **Now / Next / Later** — foco no que realmente importa agora, sem falsa precisão de datas.

---

## Status Geral

| Fase | Nome | Status |
|------|------|--------|
| 1 | MVP — Geração de hinos | 🔨 Em andamento |
| 2 | Monetização | 🔜 Planejado |
| 3 | Viral & Crescimento | 🔜 Planejado |

---

## 🟢 NOW — MVP (Fase 1)

> **Objetivo:** Usuário conta sua história → recebe letra + cifra + áudio → pode baixar.
> **Critério de conclusão:** fluxo end-to-end funcionando em produção, sem login obrigatório.

### Iniciativas

| Item | Descrição | Prioridade | Status |
|------|-----------|------------|--------|
| Setup do projeto | Next.js + Supabase + Vercel configurados | Must Have | 🔜 Pendente |
| Formulário de entrada | História + estilo + tom emocional | Must Have | 🔜 Pendente |
| Geração de letra (Claude) | Prompt adventista → letra + cifra + versículos | Must Have | 🔜 Pendente |
| Geração de áudio (Suno) | Estilo mapeado → áudio cantado | Must Have | 🔜 Pendente |
| Página de resultado | Letra + cifra + player + download PDF/MP3 | Must Have | 🔜 Pendente |
| Deploy em produção | Vercel + variáveis de ambiente | Must Have | 🔜 Pendente |
| Persistência básica | Salvar cada hino gerado (sem login) | Should Have | 🔜 Pendente |

### Riscos
- **Timeout do áudio:** Suno pode demorar mais de 10s — verificar limite de função Vercel e usar polling assíncrono
- **Qualidade do prompt:** letras adventistas exigem vocabulário e estrutura específicos — iterar rápido com feedback real
- **Custo por geração:** Claude + Suno = custo por hino — monitorar desde o início

### Dependências
- Conta e API key ativas: Anthropic, Suno, Supabase, Vercel

---

## 🟡 NEXT — Monetização (Fase 2)

> **Objetivo:** Cobrar pelo uso, criar histórico e fidelizar usuários.
> **Quando:** Após MVP validado com usuários reais e pelo menos 20 hinos gerados.

### Iniciativas

| Item | Descrição | Prioridade | Status |
|------|-----------|------------|--------|
| Autenticação | Supabase Auth (email + Google) | Must Have | 🔜 Planejado |
| Controle de cotas | 1 gratuito → bloqueio → CTA de upgrade | Must Have | 🔜 Planejado |
| Pagamento avulso | R$ 14,90 por hino via Mercado Pago | Must Have | 🔜 Planejado |
| Assinatura Ministério | R$ 39,90/mês — ilimitado | Should Have | 🔜 Planejado |
| Dashboard do usuário | Histórico de hinos, regenerar, deletar | Should Have | 🔜 Planejado |
| Emails transacionais | Boas-vindas + hino gerado por email | Should Have | 🔜 Planejado |

### Riscos
- **Aprovação Mercado Pago:** integração de assinaturas pode ter burocracia — testar com pagamento avulso primeiro
- **Churn no plano gratuito:** 1 hino pode ser suficiente para muitos usuários — monitorar conversão

---

## 🔵 LATER — Viral & Crescimento (Fase 3)

> **Objetivo:** Facilitar compartilhamento e crescimento orgânico nas redes sociais.
> **Quando:** Após Fase 2 operacional e com receita recorrente comprovada.

### Iniciativas

| Item | Descrição | Prioridade | Status |
|------|-----------|------------|--------|
| Link público de compartilhamento | URL pública para cada hino com OG tags | Should Have | 🔜 Planejado |
| Vídeo automático (Reels/TikTok) | Letra animada em formato vertical 9:16 | Could Have | 🔜 Planejado |
| Botão "Compartilhar no WhatsApp" | Link direto com preview | Should Have | 🔜 Planejado |
| Landing page com exemplos públicos | SEO + depoimentos + hinos demo | Should Have | 🔜 Planejado |
| Analytics | Vercel Analytics ou PostHog | Should Have | 🔜 Planejado |
| Vídeo para feed (1:1) | Formato quadrado para Instagram | Could Have | 🔜 Planejado |

---

## 💰 Modelo de Negócio

| Plano | Preço | Benefício |
|-------|-------|-----------|
| Gratuito | R$ 0 | 1 hino para experimentar |
| Avulso | R$ 14,90 | 1 hino gerado |
| Ministério | R$ 39,90/mês | Geração ilimitada — igrejas e líderes |

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

## 🎯 Métricas de Sucesso por Fase

| Fase | Métrica | Meta |
|------|---------|------|
| MVP | Hinos gerados | 50 na primeira semana |
| MVP | Taxa de download | > 60% dos hinos gerados |
| Monetização | Conversão gratuito → pago | > 10% |
| Monetização | MRR | R$ 500 no primeiro mês |
| Viral | Compartilhamentos por hino | > 1 por usuário |
| Viral | Novos usuários via indicação | > 30% do total |

---

## 🔄 Histórico de Atualizações

| Data | Mudança |
|------|---------|
| 22/06/2026 | Criação inicial do roadmap — 3 fases definidas |

---

*"Cantai ao Senhor um cântico novo." — Salmos 96:1*

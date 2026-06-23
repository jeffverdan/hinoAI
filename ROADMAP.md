# 🗺️ HinoAI — Roadmap

> Plataforma que transforma histórias reais de fé em hinos adventistas personalizados com IA.
> Formato: **Now / Next / Later** — foco no que realmente importa agora, sem falsa precisão de datas.

---

## Status Geral

| Fase | Nome | Status |
|------|------|--------|
| 1 | MVP — Geração de hinos | ✅ Código pronto — pendente deploy |
| 2 | Monetização | 🔜 Planejado |
| 3 | Viral & Crescimento | 🔜 Planejado |

---

## 🟢 NOW — MVP (Fase 1)

> **Objetivo:** Usuário conta sua história → recebe letra + cifra + áudio → pode baixar.
> **Critério de conclusão:** fluxo end-to-end funcionando em produção, sem login obrigatório.

### Iniciativas

| Item | Descrição | Prioridade | Status |
|------|-----------|------------|--------|
| Setup do projeto | Next.js + Supabase + Vercel configurados | Must Have | ✅ Concluído |
| Formulário de entrada | História + estilo + tom emocional | Must Have | ✅ Concluído |
| Geração de letra (Claude) | Prompt adventista → letra + cifra + versículos | Must Have | ✅ Concluído |
| Geração de áudio (Suno) | Estilo mapeado → áudio cantado | Must Have | ✅ Concluído |
| Página de resultado | Letra + cifra + player + download .txt | Must Have | ✅ Concluído |
| Persistência básica | Salvar cada hino gerado (sem login) | Should Have | ✅ Concluído |
| Deploy em produção | Vercel + variáveis de ambiente | Must Have | 🔜 Pendente |

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
| Controle de cotas | 1 gratuito/mês → bloqueio → CTA de compra | Must Have | 🔜 Planejado |
| Pack de hinos | R$ 19,90 por pack de 5 via Mercado Pago | Must Have | 🔜 Planejado |
| Promoção de lançamento | R$ 9,90 nos 3 primeiros meses (coupon/flag) | Must Have | 🔜 Planejado |
| Dashboard do usuário | Histórico de hinos, saldo de créditos, deletar | Should Have | 🔜 Planejado |
| Emails transacionais | Boas-vindas + confirmação de compra + hino gerado | Should Have | 🔜 Planejado |

### Evolução planejada do modelo de negócio

> O modelo de pack (5 hinos / R$ 19,90) é a estratégia de lançamento — mais simples de implementar e suficiente para validar disposição de pagamento. Após validação com usuários reais, o plano é introduzir assinaturas mensais:

| Plano futuro | Preço estimado | Benefício |
|--------------|---------------|-----------|
| Starter | ~R$ 19,90/mês | 10 hinos/mês |
| Ministério | ~R$ 39,90/mês | Ilimitado — igrejas e líderes de louvor |

A lógica de créditos (`user_credits`) já está desenhada para suportar ambos os modelos sem refatoração estrutural.

### Riscos
- **Conversão pack → assinatura:** usuários podem preferir pagar por demanda — monitorar frequência de recompra antes de lançar assinatura
- **Churn no gratuito:** 1 hino/mês pode ser suficiente para usuários casuais — monitorar conversão

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
| Gratuito | R$ 0 | 1 hino por mês |
| Pack de 5 | R$ 19,90 | 5 hinos (válidos por 30 dias) |
| Promoção lançamento | R$ 9,90 | Pack de 5 nos 3 primeiros meses |

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
| Monetização | Conversão gratuito → pack pago | > 10% |
| Monetização | Packs vendidos | 50 no primeiro mês (≈ R$ 500) |
| Viral | Compartilhamentos por hino | > 1 por usuário |
| Viral | Novos usuários via indicação | > 30% do total |

---

## 🔄 Histórico de Atualizações

| Data | Mudança |
|------|---------|
| 22/06/2026 | Criação inicial do roadmap — 3 fases definidas |
| 23/06/2026 | MVP concluído (código); modelo de negócio atualizado para pack de 5 hinos |

---

*"Cantai ao Senhor um cântico novo." — Salmos 96:1*

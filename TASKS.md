# 📋 HinoAI — Backlog de Tarefas

> Organizado por fase. Prioridade dentro de cada fase segue ordem de cima para baixo.
> Status: `[ ]` pendente · `[x]` concluído · `[~]` em andamento · `[-]` cancelado

---

## 🔨 FASE 1 — MVP

> Objetivo: usuário entra com a história → recebe letra + cifra + áudio → pode baixar.

### Setup
- [x] Criar projeto Next.js com TypeScript e Tailwind CSS
- [x] Configurar variáveis de ambiente (`.env.local` + `.env.example`)
- [x] Configurar Design System (tokens CSS, componentes portados para TypeScript)
- [x] Configurar Supabase (schema SQL definido em `supabase/migrations/001_initial_schema.sql`)
- [x] Rodar migration no Supabase (SQL Editor → colar e executar)
- [ ] Configurar deploy na Vercel (CI/CD automático via GitHub)

### Formulário de entrada
- [x] Criar página inicial com formulário de história (`/`)
- [x] Campo: textarea para a história do usuário (mín. 12 chars + contador)
- [x] Campo: seletor de estilo (Hino Tradicional / Quarteto / Congregacional / Jovem)
- [x] Campo: tom emocional (Solene / Alegre / Inspirador / Sereno)
- [x] Seleção de temas bíblicos (Gratidão, Esperança, Fé, Família, Cura, Segunda vinda, Perdão)
- [x] Validação do formulário no client
- [x] Tela de loading com estágios e barra de progresso

### Geração de letra (Claude API)
- [x] Criar rota `POST /api/generate-lyrics`
- [x] Criar prompt base adventista (tema bíblico, estrutura de hino, vocabulário)
- [x] Extração de tema bíblico a partir da história
- [x] Geração de letra com 3 estrofes + refrão
- [x] Geração de versículos bíblicos relacionados
- [x] Geração de cifra (tom + acordes)
- [x] Persistência no Supabase (best-effort, não bloqueia)
- [ ] Tratamento de erros e retry na API

### Geração de áudio (Suno AI)
- [x] Criar rota `POST /api/generate-audio`
- [x] Mapear estilo/tom para tags do Suno
- [x] Polling de status até áudio pronto (até 300s) 
- [x] Tratamento de timeout e erros (não bloqueia o fluxo)
- [x] Armazenar URL do áudio no Supabase após geração

### Página de resultado
- [x] Tela RevealStep com tema Sanctuary (dark) ao revelar o hino
- [x] Exibir trecho da letra + título + temas
- [x] Player de áudio embutido com WaveBars animado
- [x] Exibir letra completa e cifra (expansível)
- [x] Exibir versículos relacionados
- [x] Botão de download da letra (`.txt`)
- [x] Botão "Compartilhar" (Web Share API / clipboard)
- [x] Botão "Criar outro hino"
- [x] Botão de download do áudio (MP3)
- [x] Botão de download da letra (PDF formatado)

### Banco de dados (MVP)
- [x] Schema da tabela `hymns` definido em `supabase.ts`
- [x] Criar tabela `hymns` no Supabase (migration)
- [ ] Índice por `created_at`

### Deploy & QA
- [ ] Rodar `npm install` localmente e verificar build
- [ ] Testar fluxo completo end-to-end com as chaves reais
- [ ] Verificar limites de timeout da Vercel (função de áudio pode demorar)
- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Teste em mobile (formulário + resultado)
- [ ] Deploy em produção

---

## 💳 FASE 2 — Monetização

> Objetivo: limitar uso gratuito, cobrar por geração avulsa ou plano mensal.

### Autenticação
- [ ] Configurar Supabase Auth (email/senha + Google OAuth)
- [ ] Página de login e cadastro (`/login`, `/cadastro`)
- [ ] Middleware de proteção de rotas autenticadas
- [ ] Associar hinos gerados ao usuário logado

### Histórico de hinos
- [ ] Dashboard do usuário (`/dashboard`)
- [ ] Listagem de hinos gerados (com preview de letra)
- [ ] Página individual de cada hino (`/hino/[id]`)
- [ ] Opção de regenerar ou editar hino
- [ ] Deletar hino

### Planos e limites
- [ ] Definir lógica de cotas: 1 gratuito/mês → bloqueio → CTA de compra de pack
- [ ] Tabela `user_credits` no Supabase (créditos = hinos restantes no pack)
- [ ] Tabela `purchases` no Supabase (histórico de compras)
- [ ] Verificação de créditos antes de cada geração
- [ ] Resetar 1 crédito gratuito no início de cada mês (cron ou trigger)
- [ ] Bloqueio com CTA de compra quando sem crédito

### Pagamentos (Mercado Pago)
- [ ] Configurar conta Mercado Pago e credenciais
- [ ] Fluxo de compra de pack — R$ 19,90 por 5 hinos
- [ ] Aplicar preço promocional R$ 9,90 nas 3 primeiras compras do usuário
- [ ] Webhook de confirmação de pagamento
- [ ] Adicionar 5 créditos ao usuário após pagamento confirmado
- [ ] Página de saldo de créditos e histórico de compras

### Evolução futura — Assinaturas (pós-validação)
> Implementar apenas após o modelo de pack estar operacional e com recompra recorrente comprovada.
- [ ] Plano Starter (~R$ 19,90/mês — 10 hinos/mês)
- [ ] Plano Ministério (~R$ 39,90/mês — ilimitado)
- [ ] Tabela `subscriptions` no Supabase
- [ ] Webhook de renovação mensal (Mercado Pago)
- [ ] Upgrade/downgrade de plano pelo dashboard

### Notificações
- [ ] Email de boas-vindas no cadastro
- [ ] Email com o hino gerado (letra + link)
- [ ] Email de confirmação de compra de pack

---

## 🚀 FASE 3 — Viral

> Objetivo: facilitar compartilhamento e crescimento orgânico nas redes sociais.

### Compartilhamento
- [ ] Gerar link público para cada hino (`/hino/[id]/public`)
- [ ] Meta tags OG para preview no WhatsApp/Instagram
- [ ] Botão "Compartilhar no WhatsApp" (link direto)
- [ ] Botão "Copiar link"

### Vídeo automático
- [ ] Gerar vídeo com letra animada sobre fundo visual (usando FFmpeg ou API de vídeo)
- [ ] Formato vertical (9:16) para Stories/Reels/TikTok
- [ ] Formato quadrado (1:1) para feed
- [ ] Download do vídeo gerado
- [ ] Opção de personalização (cor de fundo, fonte)

### Marketing & Crescimento
- [ ] Landing page com depoimentos e exemplos
- [ ] Exemplo de hinos públicos na home
- [ ] SEO básico (title, description, sitemap)
- [ ] Página "Sobre o projeto"
- [ ] Integração com analytics (Vercel Analytics ou Posthog)

---

## 🐛 Bugs & Melhorias Contínuas

- [ ] Rate limiting nas APIs para evitar abuso
- [ ] Logs de erro centralizados (Sentry ou similar)
- [ ] Melhorar qualidade dos prompts a partir de feedback
- [ ] Teste A/B de CTAs e copy
- [ ] Acessibilidade (a11y) no formulário e resultado

---

*Atualizado em: 23/06/2026 — monetização migrada para modelo de pack (5 hinos / R$19,90)*

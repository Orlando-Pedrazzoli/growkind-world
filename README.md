# GrowKind World

Projecto educativo e editorial dedicado à infância neurodivergente.  
**Site:** [growkindworld.com](https://growkindworld.com)

---

## Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- **Backend:** API Routes Next.js + Node.js
- **Base de dados:** MongoDB + Mongoose
- **Media:** Cloudinary (imagens optimizadas)
- **Email:** Brevo (captura + automação)
- **Loja:** Printful (POD) + Stripe (pagamentos)
- **i18n:** next-intl (preparado para PT + EN)
- **Deploy:** Vercel

---

## Início rápido

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.local.example .env.local
# Editar .env.local com as credenciais reais

# 3. Popular base de dados (requer MongoDB)
npm run seed

# 4. Executar em desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## Estrutura do projecto

```
src/
├── app/                    # App Router (páginas)
│   ├── layout.tsx          # Layout raiz (fonts, metadata, header, footer)
│   ├── page.tsx            # Home — Server Component
│   ├── o-livro/            # Página do livro
│   ├── rdf/                # RDF & Cursos
│   │   └── cursos/[slug]/  # Curso individual
│   ├── loja/               # Loja
│   │   ├── [categoria]/    # Categoria de produtos
│   │   └── produto/[slug]/ # Produto individual
│   ├── blog/               # Blog
│   │   └── [slug]/         # Artigo individual
│   ├── sobre/              # Sobre João Pereira
│   ├── obrigado/           # Pós captura de email (noindex)
│   ├── obrigado-compra/    # Pós compra (noindex)
│   ├── privacidade/        # RGPD
│   ├── termos/             # Termos
│   ├── cookies/            # Cookies
│   ├── devolucoes/         # Devoluções
│   ├── membros/            # Placeholder fase 2
│   └── api/                # API Routes
│       ├── leads/          # Captura de email
│       ├── products/       # Sync Printful (Sprint 4)
│       ├── orders/         # Checkout (Sprint 4)
│       └── blog/           # Blog API (Sprint 2)
├── components/
│   ├── layout/             # Header, Footer, CookieBanner
│   ├── home/               # Blocos da Home
│   ├── rdf/                # Diagrama interactivo (Sprint 3)
│   ├── loja/               # Componentes da loja (Sprint 4)
│   ├── blog/               # Componentes do blog (Sprint 2)
│   └── ui/                 # CloudinaryImage, AnimatedSection
├── lib/
│   ├── mongodb.ts          # Conexão MongoDB (singleton)
│   ├── content.ts          # Helpers para buscar conteúdo
│   └── fonts.ts            # Playfair Display + DM Sans
├── models/                 # Mongoose schemas
│   ├── ContentBlock.ts     # Blocos de conteúdo das páginas
│   ├── Course.ts           # Cursos RDF
│   ├── Product.ts          # Produtos POD
│   ├── Order.ts            # Encomendas
│   ├── BlogPost.ts         # Artigos do blog
│   ├── Lead.ts             # Subscrições de email
│   └── User.ts             # Utilizadores (fase 2)
├── types/
│   └── index.ts            # Tipos TypeScript globais
├── seed/
│   └── seed.ts             # Script para popular a DB
└── i18n/
    ├── request.ts          # Config next-intl
    └── messages/
        └── pt.json         # Strings UI em português
```

---

## Decisões de arquitectura

### App Router + next-intl (em vez de Pages Router + next-i18next)
Next.js 15 com App Router é o caminho moderno: Server Components, layouts aninhados, melhor SEO nativo. `next-intl` é compatível com App Router de raiz, ao contrário de `next-i18next`. Na fase 1 o site é só PT, mas a estrutura está preparada para EN.

### Conteúdo dinâmico com fallback
Todo o conteúdo textual está no MongoDB (colecção `ContentBlock`), conforme pedido pelo João. Mas a Home tem fallback hardcoded para funcionar mesmo sem DB — útil em desenvolvimento e como safety net.

### Tailwind CSS v4 (CSS-first)
Configuração via `@theme` no `globals.css`. Sem `tailwind.config.ts`. Todas as cores GrowKind e tokens de design estão centralizados no CSS.

### Seed script
Em vez de admin panel (fase 2), usamos um seed script (`npm run seed`) para popular a base de dados. O conteúdo pode ser editado no ficheiro `src/seed/seed.ts` e re-executado.

---

## Paleta de cores

| Nome | Hex | CSS Variable |
|---|---|---|
| Verde escuro | `#1A5C2A` | `--color-gk-green-dark` |
| Verde claro | `#C8DCC0` | `--color-gk-green-light` |
| Ocre | `#C17F3A` | `--color-gk-ocre` |
| Creme | `#F8F4ED` | `--color-gk-creme` |
| Preto | `#1E1E1E` | `--color-gk-black` |
| Branco | `#FFFFFF` | `--color-gk-white` |

---

## Sprints

### Sprint 1 — Fundação ✅
- [x] Setup Next.js 15 + TypeScript + App Router
- [x] Tailwind v4 com paleta GrowKind
- [x] MongoDB conexão + todos os modelos
- [x] Layout global (Header + Footer + CookieBanner)
- [x] Home com 7 blocos (conteúdo dinâmico + fallback)
- [x] API de leads
- [x] Seed script
- [x] next-intl configurado
- [x] Páginas placeholder (legais, obrigado, loja, blog, rdf)
- [x] SEO base (metadata, sitemap config)

### Sprint 2 — Conteúdo
- [ ] Página O Livro completa
- [ ] Página Sobre completa
- [ ] Blog (listagem + artigo individual)
- [ ] Formulário Brevo activo (quando API key disponível)

### Sprint 3 — RDF
- [ ] Diagrama interactivo SVG
- [ ] Páginas de cursos individuais
- [ ] Lista de espera (Brevo)

### Sprint 4 — Loja
- [ ] Integração Printful (sync produtos)
- [ ] Páginas de produto
- [ ] Stripe Checkout
- [ ] Webhook Printful (produção automática)

### Sprint 5 — Acabamentos
- [ ] SEO completo (Open Graph, structured data)
- [ ] Textos legais finais
- [ ] Performance (Lighthouse 90+)
- [ ] Testes mobile completos

---

## Dependências externas (a receber do João)

- [ ] Imagens: `hero-forest-sprout.jpg`, `book-cover.jpg`, `book-mockup-grass.jpg`
- [ ] PDF lead magnet: `growkind_guia_5formas.pdf`
- [ ] Credenciais Cloudinary
- [ ] API key Brevo
- [ ] API key Printful
- [ ] Chaves Stripe

---

## Deploy

O projecto está preparado para Vercel. Basta ligar o repositório Git e configurar as variáveis de ambiente no painel da Vercel.

```bash
npm run build   # Verificar que compila sem erros
```

---

*GrowKind World · Fase 1 · Março 2026*

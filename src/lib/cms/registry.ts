// src/lib/cms/registry.ts
// FONTE ÚNICA do que é editável no admin: medidas das imagens, slots fixos,
// slides por omissão do Hero e campos de texto de cada secção.
// Usado pelo admin (UI) e pelo site (fallbacks). Sem acesso à BD.
import type { ImageSpec, HeroSlideDoc } from '@/types/cms';

// ── Medidas recomendadas ────────────────────────────────────────────
// Hero: o carrossel tem proporções FIXAS (ver Hero.tsx):
//   desktop (md+) 12:5  → 1920 × 800 px
//   mobile        3:4   → 1080 × 1440 px
// Fora destas proporções a imagem é cortada (object-cover).
export const IMAGE_SPECS = {
  heroDesktop: {
    width: 1920,
    height: 800,
    label: '1920 × 800 px · proporção 12:5 · JPG ou WebP · até 8 MB',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  heroMobile: {
    width: 1080,
    height: 1440,
    label: '1080 × 1440 px · proporção 3:4 · JPG ou WebP · até 8 MB',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  bookCover: {
    width: 1000,
    height: 1500,
    label: '1000 × 1500 px · proporção 2:3 (capa) · JPG · até 8 MB',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  portrait: {
    width: 1200,
    height: 1800,
    label: '1200 × 1800 px · proporção 2:3 · JPG · até 8 MB',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  profilePhoto: {
    width: 800,
    height: 800,
    label: '800 × 800 px · quadrada (é recortada em círculo) · JPG · até 8 MB',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  logo: {
    width: 512,
    height: 512,
    label: '512 × 512 px · quadrado · PNG com fundo transparente · até 2 MB',
    formats: ['png', 'webp'],
  },
} as const satisfies Record<string, ImageSpec>;

export type ImageSpecKey = keyof typeof IMAGE_SPECS;

// ── Slots fixos (imagens únicas) ────────────────────────────────────
export interface ImageSlotDef {
  key: string;
  label: string;
  description: string; // onde aparece
  spec: ImageSpecKey;
  fallback: string; // ficheiro actual em /public
  /** Rotas (filesystem) a revalidar depois de guardar. */
  revalidate: string[];
  group: 'home' | 'site';
}

export const IMAGE_SLOTS: ImageSlotDef[] = [
  {
    key: 'book.cover',
    label: 'Capa do livro',
    description:
      'Homepage (secção "O Livro") e topo da página /o-livro. Também é a imagem de partilha (Open Graph) da página do livro.',
    spec: 'bookCover',
    fallback: '/images/book-cover.jpg',
    revalidate: ['/[locale]', '/[locale]/o-livro', '/[locale]/livro/preview'],
    group: 'home',
  },
  {
    key: 'home.rdf',
    label: 'Imagem do RDF (homepage)',
    description: 'Lado esquerdo da secção "Relational Development Framework".',
    spec: 'portrait',
    fallback: '/images/rdf-principal.jpg',
    revalidate: ['/[locale]', '/[locale]/rdf'],
    group: 'home',
  },
  {
    key: 'about.photo',
    label: 'Foto do João (página Sobre)',
    description: 'Fotografia redonda no topo da página /sobre.',
    spec: 'profilePhoto',
    fallback: '/images/joao-profile.jpeg',
    revalidate: ['/[locale]/sobre'],
    group: 'site',
  },
  {
    key: 'header.logo',
    label: 'Logótipo do cabeçalho',
    description:
      'Círculo ao lado de "GrowKind World" no topo de todas as páginas.',
    spec: 'logo',
    fallback: '/images/logo-growkind3.png',
    revalidate: ['/[locale]'],
    group: 'site',
  },
  {
    key: 'footer.logo',
    label: 'Logótipo do rodapé',
    description: 'Círculo no rodapé de todas as páginas.',
    spec: 'logo',
    fallback: '/images/logo-growkind.jpg',
    revalidate: ['/[locale]'],
    group: 'site',
  },
];

export const IMAGE_SLOT_KEYS = IMAGE_SLOTS.map(s => s.key);

export function getSlotDef(key: string): ImageSlotDef | undefined {
  return IMAGE_SLOTS.find(s => s.key === key);
}

/** Mapa key → fallback (para o site quando a BD não tem nada). */
export const IMAGE_SLOT_FALLBACKS: Record<string, string> = Object.fromEntries(
  IMAGE_SLOTS.map(s => [s.key, s.fallback]),
);

// ── Hero: slides por omissão (os 3 actuais do código) ───────────────
// Usados pelo site enquanto a colecção HeroSlide estiver vazia e pelo
// botão "Importar slides actuais" no admin.
export const DEFAULT_HERO_SLIDES: Omit<HeroSlideDoc, '_id'>[] = [
  {
    order: 0,
    active: true,
    desktop: { url: '/images/hero-home.jpg' },
    mobile: { url: '/images/hero-mobile.png' },
    alt: {
      pt: 'GrowKind World — Um mundo criado a partir da experiência neurodivergente',
      en: 'GrowKind World — A world created from the neurodivergent experience',
    },
    href: null,
  },
  {
    order: 1,
    active: true,
    desktop: { url: '/images/hero-livro.jpg' },
    mobile: { url: '/images/hero-livro-mobile.jpg' },
    alt: {
      pt: 'Onde o Mundo Nasce Entre Nós — o livro de João Pereira',
      en: 'Where the World Is Born Between Us — the book by João Pereira',
    },
    href: '/o-livro',
  },
  {
    order: 2,
    active: true,
    desktop: { url: '/images/hero-rdf.jpg' },
    mobile: { url: '/images/hero-rdf-mobile.jpg' },
    alt: {
      pt: 'Relational Development Framework (RDF) — uma nova forma de olhar o desenvolvimento',
      en: 'Relational Development Framework (RDF) — a new way of looking at development',
    },
    href: '/cursos',
  },
];

// ── Secções com textos editáveis ────────────────────────────────────
export interface SectionFieldDef {
  key: string; // chave em messages/{locale}.json dentro do namespace
  label: string;
  kind: 'text' | 'textarea';
  hint?: string;
}

export interface SectionDef {
  key: string; // namespace next-intl (ex.: 'home.bookSection')
  label: string;
  description: string;
  imageSlot?: string; // slot de imagem associado (IMAGE_SLOTS.key)
  fields: SectionFieldDef[];
  revalidate: string[];
}

export const SECTIONS: SectionDef[] = [
  {
    key: 'home.bookSection',
    label: 'Secção "O Livro"',
    description:
      'Bloco verde-escuro da homepage com a capa do livro à esquerda.',
    imageSlot: 'book.cover',
    fields: [
      { key: 'eyebrow', label: 'Etiqueta (eyebrow)', kind: 'text' },
      {
        key: 'title',
        label: 'Título',
        kind: 'textarea',
        hint: 'Uma linha por verso — a quebra de linha é respeitada.',
      },
      { key: 'body1', label: 'Parágrafo 1', kind: 'textarea' },
      { key: 'body2', label: 'Parágrafo 2', kind: 'textarea' },
      { key: 'body3', label: 'Parágrafo 3', kind: 'textarea' },
      { key: 'cta', label: 'Texto do botão', kind: 'text' },
      {
        key: 'coverAlt',
        label: 'Texto alternativo da capa (acessibilidade/SEO)',
        kind: 'text',
      },
    ],
    revalidate: ['/[locale]'],
  },
  {
    key: 'home.rdfSection',
    label: 'Secção "Relational Development Framework"',
    description:
      'Bloco branco da homepage com a imagem do RDF à esquerda. O título "Relational Development Framework" é fixo (nome próprio).',
    imageSlot: 'home.rdf',
    fields: [
      { key: 'eyebrow', label: 'Etiqueta (eyebrow)', kind: 'text' },
      {
        key: 'subtitle',
        label: 'Subtítulo (itálico)',
        kind: 'textarea',
        hint: 'A quebra de linha é respeitada.',
      },
      { key: 'body', label: 'Parágrafo', kind: 'textarea' },
      { key: 'closing', label: 'Frase de fecho', kind: 'textarea' },
      { key: 'cta', label: 'Texto do botão', kind: 'text' },
      {
        key: 'imageAlt',
        label: 'Texto alternativo da imagem (acessibilidade/SEO)',
        kind: 'text',
      },
    ],
    revalidate: ['/[locale]'],
  },
];

export function getSectionDef(key: string): SectionDef | undefined {
  return SECTIONS.find(s => s.key === key);
}

// ============================================
// GrowKind World — Dados da página /o-livro
// Textos aprovados pelo João Pereira
//
// i18n: os TEXTOS vivem em messages/pt.json e en.json
// (namespace book.data). Este ficheiro guarda apenas a
// ESTRUTURA (ícones, preços, hrefs, formatos) e expõe o
// hook useBookData() que junta as duas partes.
// ============================================

import { useTranslations } from 'next-intl';
import { BookOpen, Tablet, Book, type LucideIcon } from 'lucide-react';

export interface BookEdition {
  format: 'ebook' | 'kindle' | 'physical';
  label: string;
  sublabel: string;
  price: string;
  icon: LucideIcon;
  href: string;
  style: 'primary' | 'secondary' | 'ghost';
}

export interface BookPart {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  chapters: string[];
}

export interface BookAudience {
  icon: string;
  title: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────
// EDIÇÕES — estrutura (sem textos; labels/sublabels vêm do dicionário)
// ─────────────────────────────────────────────────────────────────
//
// NOTA Maio 2026 (Item 2 — Revisão João Pereira):
// As edições Amazon (Kindle e Físico) estão temporariamente
// desactivadas até o livro ser publicado e os ISBN existirem.
// Para reactivar: adicionar 'kindle' e/ou 'physical' a
// ACTIVE_FORMATS, e substituir 'XXXXXXXXX' pelos ISBN reais.
// ─────────────────────────────────────────────────────────────────

type EditionConfig = Omit<BookEdition, 'label' | 'sublabel'>;

const EDITIONS_CONFIG: EditionConfig[] = [
  {
    format: 'ebook',
    price: '€14',
    icon: BookOpen,
    href: '/comprar/ebook',
    style: 'primary',
  },
  {
    format: 'kindle',
    price: '€9.99',
    icon: Tablet,
    href: 'https://amazon.com/dp/XXXXXXXXX', // TODO: substituir por ISBN Kindle real
    style: 'secondary',
  },
  {
    format: 'physical',
    price: '€19.99',
    icon: Book,
    href: 'https://amazon.com/dp/XXXXXXXXX', // TODO: substituir por ISBN físico real
    style: 'ghost',
  },
];

// Só os formatos listados aqui aparecem no site
const ACTIVE_FORMATS: BookEdition['format'][] = ['ebook'];

// Estrutura das partes (números romanos) e dos públicos (ícones)
const PART_KEYS = ['part1', 'part2', 'part3'] as const;
const PART_NUMBERS = ['I', 'II', 'III'];

const AUDIENCE_CONFIG = [
  { icon: '👨‍👩‍👧', key: 'families' },
  { icon: '🏫', key: 'educators' },
  { icon: '🩺', key: 'professionals' },
] as const;

// ─────────────────────────────────────────────────────────────────
// Hook — devolve todos os dados do livro já no idioma ativo
// Uso: const { editions, parts, audiences, excerpt, quote } = useBookData();
// ─────────────────────────────────────────────────────────────────
export function useBookData() {
  const t = useTranslations('book.data');

  const editions: BookEdition[] = EDITIONS_CONFIG.filter(cfg =>
    ACTIVE_FORMATS.includes(cfg.format),
  ).map(cfg => ({
    ...cfg,
    label: t(`editions.${cfg.format}.label`),
    sublabel: t(`editions.${cfg.format}.sublabel`),
  }));

  const parts: BookPart[] = PART_KEYS.map((key, i) => ({
    number: PART_NUMBERS[i],
    label: t(`parts.${key}.label`),
    title: t(`parts.${key}.title`),
    subtitle: t(`parts.${key}.subtitle`),
    chapters: t.raw(`parts.${key}.chapters`) as string[],
  }));

  const audiences: BookAudience[] = AUDIENCE_CONFIG.map(({ icon, key }) => ({
    icon,
    title: t(`audiences.${key}.title`),
    description: t(`audiences.${key}.description`),
  }));

  const excerpt = t.raw('excerpt') as string[];

  const quote = t('quote');

  return { editions, parts, audiences, excerpt, quote };
}

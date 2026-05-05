// ============================================================
// GrowKind — Livro Digital · Tipos TypeScript
// Onde o Mundo Nasce Entre Nós · João Pereira
// ============================================================

export type AccessTier = 'preview' | 'full';

export interface BookMeta {
  title: string;
  subtitle: string;
  author: string;
  year: number;
  isbn: string;
  edition: string;
  coverTagline: string;
}

export interface Part {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  opening: string; // Texto de abertura da parte
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  slug: string;
  number: number;
  partId: string;
  title: string;
  subtitle: string;
  access: AccessTier; // 'preview' = livre; 'full' = requer compra
  estimatedMinutes: number;
  blocks: ContentBlock[];
}

export type ContentBlock =
  | ParagraphBlock
  | PullQuoteBlock
  | SectionTitleBlock
  | PracticesBlock
  | ExerciseBlock
  | SilenceBlock
  | NextBlock
  | GlossaryBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface PullQuoteBlock {
  type: 'pullquote';
  text: string;
}

export interface SectionTitleBlock {
  type: 'section-title';
  text: string;
  subtitle?: string;
}

export interface PracticesBlock {
  type: 'practices';
  title: string;
  subtitle: string;
  items: { title: string; text: string }[];
}

export interface ExerciseBlock {
  type: 'exercise';
  title: string;
  subtitle: string;
  body: string[];
}

export interface SilenceBlock {
  type: 'silence';
  text: string;
}

export interface NextBlock {
  type: 'next';
  text: string;
}

export interface GlossaryBlock {
  type: 'glossary';
  part: string;
  entries: {
    term: string;
    bookLanguage: string;
    technicalTerm: string;
    explanation: string;
  }[];
}

// ── Progresso do leitor ──────────────────────────────────
export interface ReadingProgress {
  userId: string;
  chapterId: string;
  scrollPercent: number; // 0-100
  completedAt?: string; // ISO date
  updatedAt: string;
}

// ── Compra ──────────────────────────────────────────────
export interface BookPurchase {
  userId: string;
  stripeSessionId: string;
  purchasedAt: string;
  priceEur: number;
}

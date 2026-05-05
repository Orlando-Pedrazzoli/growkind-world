// src/lib/book-data/index.ts
// ============================================================
// GrowKind — Livro Digital · Index consolidado
// Resolve os BUGs 1 e 3 reportados pelo João: garante que
// chaptersMap tem TODOS os 30 capítulos (não apenas os 4 do Batch 1).
// ============================================================

// Re-exporta meta e índice (vêm do Batch 1)
export { bookMeta, bookIndex } from './chapters';

// Re-exporta tipos
export type {
  AccessTier,
  BookMeta,
  Part,
  Chapter,
  ContentBlock,
  ParagraphBlock,
  PullQuoteBlock,
  SectionTitleBlock,
  PracticesBlock,
  ExerciseBlock,
  SilenceBlock,
  NextBlock,
  GlossaryBlock,
  ReadingProgress,
  BookPurchase,
} from './types';

// Re-exporta o mapa COMPLETO (todos os 30 capítulos) com nomes simples.
// Importações a usar nos componentes:
//   import { chaptersMap, previewChapterIds } from '@/lib/book-data';
export {
  chaptersMapCompleto as chaptersMap,
  previewChapterIdsCompletos as previewChapterIds,
} from './chapters-batch-7-final';

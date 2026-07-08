// src/lib/book-data/i18n.ts
// ============================================================
// GrowKind — Camada de tradução do Livro (PT ↔ EN)
// PT é "texto sagrado" e não é tocado. Esta camada sobrepõe EN por cima,
// com fallback: se uma tradução faltar, usa-se o PT.
// ============================================================

import { bookIndex as ptBookIndex, bookMeta as ptBookMeta } from './chapters';
import { chaptersMapCompleto as ptChaptersMap } from './chapters-batch-7-final';
import type { BookMeta, Chapter, ContentBlock } from './types';
import enRaw from './en/book-en.json';
import enBlocksRaw from './en/book-en-blocks.json';

const enDict = enRaw as Record<string, string>;
const enBlocks = enBlocksRaw as unknown as Record<string, ContentBlock[]>;

export interface IndexEntry {
  id: string;
  label: string;
  access?: string;
  chapters?: { id: string; label: string; access: string }[];
}

export type Locale = 'pt' | 'en';

export function extractBookStrings(): Record<string, string> {
  const out: Record<string, string> = {};
  out['meta.title'] = ptBookMeta.title;
  out['meta.subtitle'] = ptBookMeta.subtitle;
  out['meta.coverTagline'] = ptBookMeta.coverTagline;
  for (const section of ptBookIndex as unknown as IndexEntry[]) {
    out[`index.${section.id}`] = section.label;
    if (section.chapters) {
      for (const c of section.chapters) out[`index.${c.id}`] = c.label;
    }
  }
  for (const [id, chapter] of Object.entries(ptChaptersMap)) {
    out[`ch.${id}.title`] = chapter.title;
    out[`ch.${id}.subtitle`] = chapter.subtitle;
    chapter.blocks.forEach((block, i) => {
      const base = `ch.${id}.b.${i}`;
      walkBlock(block, {
        set: (suffix, value) => {
          out[suffix ? `${base}.${suffix}` : base] = value;
        },
        get: undefined,
      });
    });
  }
  return out;
}

function applyChapter(
  id: string,
  chapter: Chapter,
  dict: Record<string, string>,
): Chapter {
  const t = (suffix: string, fallback: string) =>
    dict[`ch.${id}.${suffix}`] ?? fallback;
  const blocks: ContentBlock[] = chapter.blocks.map((block, i) => {
    const base = `b.${i}`;
    const bt = (suffix: string, fallback: string) =>
      dict[`ch.${id}.${base}${suffix ? '.' + suffix : ''}`] ?? fallback;
    switch (block.type) {
      case 'paragraph':
      case 'pullquote':
      case 'silence':
      case 'next':
        return { ...block, text: bt('text', block.text) };
      case 'section-title':
        return {
          ...block,
          text: bt('text', block.text),
          ...(block.subtitle !== undefined
            ? { subtitle: bt('subtitle', block.subtitle) }
            : {}),
        };
      case 'practices':
        return {
          ...block,
          title: bt('title', block.title),
          subtitle: bt('subtitle', block.subtitle),
          items: block.items.map((it, j) => ({
            title: bt(`item.${j}.title`, it.title),
            text: bt(`item.${j}.text`, it.text),
          })),
        };
      case 'exercise':
        return {
          ...block,
          title: bt('title', block.title),
          subtitle: bt('subtitle', block.subtitle),
          body: block.body.map((p, j) => bt(`body.${j}`, p)),
        };
      case 'glossary':
        return {
          ...block,
          entries: block.entries.map((e, j) => ({
            term: bt(`entry.${j}.term`, e.term),
            bookLanguage: bt(`entry.${j}.bookLanguage`, e.bookLanguage),
            technicalTerm: bt(`entry.${j}.technicalTerm`, e.technicalTerm),
            explanation: bt(`entry.${j}.explanation`, e.explanation),
          })),
        };
      default:
        return block;
    }
  });
  return {
    ...chapter,
    title: t('title', chapter.title),
    subtitle: t('subtitle', chapter.subtitle),
    blocks,
  };
}

function walkBlock(
  block: ContentBlock,
  io: { set: (suffix: string, value: string) => void; get?: undefined },
): void {
  switch (block.type) {
    case 'paragraph':
    case 'pullquote':
    case 'silence':
    case 'next':
      io.set('text', block.text);
      break;
    case 'section-title':
      io.set('text', block.text);
      if (block.subtitle !== undefined) io.set('subtitle', block.subtitle);
      break;
    case 'practices':
      io.set('title', block.title);
      io.set('subtitle', block.subtitle);
      block.items.forEach((it, j) => {
        io.set(`item.${j}.title`, it.title);
        io.set(`item.${j}.text`, it.text);
      });
      break;
    case 'exercise':
      io.set('title', block.title);
      io.set('subtitle', block.subtitle);
      block.body.forEach((p, j) => io.set(`body.${j}`, p));
      break;
    case 'glossary':
      block.entries.forEach((e, j) => {
        io.set(`entry.${j}.term`, e.term);
        io.set(`entry.${j}.bookLanguage`, e.bookLanguage);
        io.set(`entry.${j}.technicalTerm`, e.technicalTerm);
        io.set(`entry.${j}.explanation`, e.explanation);
      });
      break;
  }
}

interface ResolvedBook {
  chaptersMap: Record<string, Chapter>;
  bookIndex: IndexEntry[];
  bookMeta: BookMeta;
}

const ptIndex = ptBookIndex as unknown as IndexEntry[];

const ptBook: ResolvedBook = {
  chaptersMap: ptChaptersMap,
  bookIndex: ptIndex,
  bookMeta: ptBookMeta,
};

let enBookCache: ResolvedBook | null = null;

function resolveEn(): ResolvedBook {
  if (enBookCache) return enBookCache;
  const chaptersMap: Record<string, Chapter> = {};
  for (const [id, chapter] of Object.entries(ptChaptersMap)) {
    const applied = applyChapter(id, chapter, enDict);
    const override = enBlocks[id];
    chaptersMap[id] = override ? { ...applied, blocks: override } : applied;
  }
  const bookIndex: IndexEntry[] = ptIndex.map(section => ({
    ...section,
    label: enDict[`index.${section.id}`] ?? section.label,
    ...(section.chapters
      ? {
          chapters: section.chapters.map(c => ({
            ...c,
            label: enDict[`index.${c.id}`] ?? c.label,
          })),
        }
      : {}),
  }));
  const bookMeta: BookMeta = {
    ...ptBookMeta,
    title: enDict['meta.title'] ?? ptBookMeta.title,
    subtitle: enDict['meta.subtitle'] ?? ptBookMeta.subtitle,
    coverTagline: enDict['meta.coverTagline'] ?? ptBookMeta.coverTagline,
  };
  enBookCache = { chaptersMap, bookIndex, bookMeta };
  return enBookCache;
}

export function getBook(locale: string): ResolvedBook {
  return locale === 'en' ? resolveEn() : ptBook;
}

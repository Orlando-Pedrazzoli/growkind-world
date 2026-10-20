// src/types/cms.ts
// Tipos partilhados do CMS (admin ↔ site público).

export type Locale = 'pt' | 'en';

/** Texto bilingue. EN vazio → o site usa o PT. */
export interface LocalizedString {
  pt: string;
  en: string;
}

/**
 * Imagem guardada na BD.
 * - `url`: URL Cloudinary (https://res.cloudinary.com/…) OU caminho local
 *   (/images/…) quando o slide/slot ainda usa o ficheiro original do repo.
 * - `publicId`: só existe para assets Cloudinary (permite apagar ao substituir).
 */
export interface ImageAsset {
  url: string;
  publicId?: string | null;
  width?: number | null;
  height?: number | null;
}

/** Medidas recomendadas (px) para um slot/slide. */
export interface ImageSpec {
  width: number;
  height: number;
  /** Texto curto para o admin — ex.: "1920 × 800 px · 12:5 · JPG" */
  label: string;
  formats: string[]; // ex.: ['jpg', 'png', 'webp']
}

// ── Hero ────────────────────────────────────────────────────────────
export interface HeroSlideDoc {
  _id: string;
  order: number;
  active: boolean;
  desktop: ImageAsset;
  mobile: ImageAsset;
  alt: LocalizedString;
  href: string | null;
}

/** Shape que o componente Hero recebe (já no idioma activo). */
export interface HeroSlideView {
  id: string;
  desktop: string;
  mobile: string;
  alt: string;
  href: string | null;
}

// ── Slots fixos ─────────────────────────────────────────────────────
export interface SiteImageDoc {
  key: string;
  image: ImageAsset;
}

// ── Textos de secção ────────────────────────────────────────────────
export interface SectionContentDoc {
  key: string;
  texts: Record<string, LocalizedString>;
}

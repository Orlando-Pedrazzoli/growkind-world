// src/lib/cms/content.ts
// Leitura do conteúdo editável (server-only). BD por cima dos defaults em código:
// se a BD estiver vazia ou indisponível, o site continua igual ao de hoje.
import { connectDB } from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';
import SiteImage from '@/models/SiteImage';
import SectionContent from '@/models/SectionContent';
import { DEFAULT_HERO_SLIDES, IMAGE_SLOT_FALLBACKS } from '@/lib/cms/registry';
import type {
  HeroSlideDoc,
  HeroSlideView,
  Locale,
  LocalizedString,
} from '@/types/cms';

type SectionTexts =
  Map<string, LocalizedString> | Record<string, LocalizedString> | undefined;
type SectionLean = { texts?: SectionTexts } | null;

function textEntries(texts: SectionTexts): [string, LocalizedString][] {
  if (!texts) return [];
  return texts instanceof Map
    ? Array.from(texts.entries())
    : Object.entries(texts);
}

function pick(ls: LocalizedString | undefined, locale: Locale): string {
  if (!ls) return '';
  const v = locale === 'en' ? ls.en : ls.pt;
  return (v && v.trim()) || ls.pt || '';
}

// ── Hero ────────────────────────────────────────────────────────────
/** Todos os slides (admin), ordenados. */
export async function getHeroSlidesRaw(): Promise<HeroSlideDoc[]> {
  await connectDB();
  const docs = await HeroSlide.find().sort({ order: 1, createdAt: 1 }).lean();
  return docs.map(d => ({
    _id: String(d._id),
    order: d.order,
    active: d.active,
    desktop: {
      url: d.desktop.url,
      publicId: d.desktop.publicId ?? null,
      width: d.desktop.width ?? null,
      height: d.desktop.height ?? null,
    },
    mobile: {
      url: d.mobile.url,
      publicId: d.mobile.publicId ?? null,
      width: d.mobile.width ?? null,
      height: d.mobile.height ?? null,
    },
    alt: { pt: d.alt?.pt ?? '', en: d.alt?.en ?? '' },
    href: d.href || null,
  }));
}

/** Slides activos, já no idioma (site público). Vazio na BD → os 3 do código. */
export async function getHeroSlides(locale: Locale): Promise<HeroSlideView[]> {
  let docs: Omit<HeroSlideDoc, '_id'>[] = [];
  try {
    docs = await getHeroSlidesRaw();
  } catch (err) {
    console.error('[cms] getHeroSlides falhou — a usar defaults', err);
  }
  const source = docs.length ? docs.filter(s => s.active) : DEFAULT_HERO_SLIDES;

  return source.map((s, i) => ({
    id: '_id' in s && typeof s._id === 'string' ? s._id : `default-${i}`,
    desktop: s.desktop.url,
    mobile: s.mobile.url,
    alt: pick(s.alt, locale),
    href: s.href || null,
  }));
}

// ── Slots de imagem ─────────────────────────────────────────────────
/** key → url, já com fallback para /public. */
export async function getSiteImages(): Promise<Record<string, string>> {
  const map: Record<string, string> = { ...IMAGE_SLOT_FALLBACKS };
  try {
    await connectDB();
    const docs = await SiteImage.find().lean();
    for (const d of docs) {
      if (d.key in map && d.image?.url) map[d.key] = d.image.url;
    }
  } catch (err) {
    console.error('[cms] getSiteImages falhou — a usar fallbacks', err);
  }
  return map;
}

export async function getSiteImage(key: string): Promise<string> {
  const all = await getSiteImages();
  return all[key] ?? IMAGE_SLOT_FALLBACKS[key] ?? '';
}

// ── Textos de secção ────────────────────────────────────────────────
/**
 * Devolve APENAS os textos definidos na BD para o idioma (ou PT se EN vazio).
 * O componente faz `texts.title ?? t('title')` — assim nada deixa de aparecer.
 */
export async function getSectionTexts(
  key: string,
  locale: Locale,
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    await connectDB();
    const doc = (await SectionContent.findOne({ key }).lean()) as SectionLean;
    if (!doc?.texts) return out;
    for (const [field, ls] of textEntries(doc.texts)) {
      const v = pick(ls, locale);
      if (v) out[field] = v;
    }
  } catch (err) {
    console.error('[cms] getSectionTexts falhou', key, err);
  }
  return out;
}

/** Versão crua (PT + EN) para o admin. */
export async function getSectionTextsRaw(
  key: string,
): Promise<Record<string, LocalizedString>> {
  await connectDB();
  const doc = (await SectionContent.findOne({ key }).lean()) as SectionLean;
  if (!doc?.texts) return {};
  return Object.fromEntries(
    textEntries(doc.texts).map(([k, v]) => [
      k,
      { pt: v.pt ?? '', en: v.en ?? '' },
    ]),
  );
}

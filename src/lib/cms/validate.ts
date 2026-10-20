// src/lib/cms/validate.ts
// Validação manual (sem dependências) dos payloads do CMS.
import { isAllowedImageUrl } from '@/lib/cloudinary';
import type { ImageAsset, LocalizedString } from '@/types/cms';

export class ValidationError extends Error {}

export function parseImageAsset(input: unknown, field: string): ImageAsset {
  if (!input || typeof input !== 'object') {
    throw new ValidationError(`${field}: imagem em falta.`);
  }
  const obj = input as Record<string, unknown>;
  if (!isAllowedImageUrl(obj.url)) {
    throw new ValidationError(`${field}: URL de imagem inválido.`);
  }
  const num = (v: unknown) =>
    typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.round(v) : null;
  return {
    url: obj.url as string,
    publicId: typeof obj.publicId === 'string' ? obj.publicId : null,
    width: num(obj.width),
    height: num(obj.height),
  };
}

export function parseLocalized(
  input: unknown,
  field: string,
  { required = false, max = 2000 } = {},
): LocalizedString {
  const obj = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const pt = typeof obj.pt === 'string' ? obj.pt.trim() : '';
  const en = typeof obj.en === 'string' ? obj.en.trim() : '';
  if (required && !pt) {
    throw new ValidationError(`${field}: o texto em português é obrigatório.`);
  }
  if (pt.length > max || en.length > max) {
    throw new ValidationError(`${field}: máximo ${max} caracteres.`);
  }
  return { pt, en };
}

/** Link interno (/o-livro) ou externo (https://…). Vazio → null. */
export function parseHref(input: unknown): string | null {
  if (input === null || input === undefined) return null;
  if (typeof input !== 'string') throw new ValidationError('Link inválido.');
  const v = input.trim();
  if (!v) return null;
  if (v.startsWith('/') || /^https?:\/\//i.test(v)) return v;
  throw new ValidationError(
    'Link inválido — usa um caminho interno (ex.: /o-livro) ou um URL completo (https://…).',
  );
}

export function parseBoolean(input: unknown, fallback: boolean): boolean {
  return typeof input === 'boolean' ? input : fallback;
}

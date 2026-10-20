// src/lib/cms/revalidate.ts
// Revalidação on-demand das páginas públicas (SSG) depois de uma escrita no CMS.
// Convenção igual à rota de preços: rotas do filesystem ('/[locale]/…') para
// invalidar PT e EN de uma vez.
import { revalidatePath } from 'next/cache';

export function revalidatePaths(paths: string[]) {
  const unique = Array.from(new Set(paths));
  for (const p of unique) {
    revalidatePath(p, 'page');
  }
}

/** Homepage — PT e EN. */
export function revalidateHome() {
  revalidatePaths(['/[locale]']);
}

/** Header/Footer aparecem em todas as páginas → revalida o layout inteiro. */
export function revalidateEverything() {
  revalidatePath('/[locale]', 'layout');
}

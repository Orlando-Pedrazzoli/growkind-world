import type { Metadata } from 'next';
import { getPageBlocks, blocksToMap } from '@/lib/content';

export const metadata: Metadata = {
  title: 'O Livro',
  description: 'O primeiro livro do universo GrowKind — uma obra que convida a olhar para o comportamento da criança como linguagem.',
};

export default async function LivroPage() {
  let blocks: Record<string, any> = {};

  try {
    const dbBlocks = await getPageBlocks('o-livro');
    blocks = blocksToMap(dbBlocks);
  } catch {
    // fallback silencioso
  }

  const hero = blocks['hero'] || {};

  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">
          {hero.titulo || 'O Livro'}
        </h1>
        {hero.subtitulo && (
          <p className="mx-auto mt-6 max-w-lg text-lg text-[var(--color-gk-black)]/70">
            {hero.subtitulo}
          </p>
        )}
        <p className="mt-12 text-sm text-[var(--color-gk-black)]/40">
          Conteúdo completo em preparação — Sprint 2
        </p>
      </div>
    </section>
  );
}

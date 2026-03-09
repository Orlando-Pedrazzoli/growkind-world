import type { Metadata } from 'next';
import { getPageBlocks, blocksToMap } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sobre João Pereira',
  description: 'Educador, autor e fundador do GrowKind World. Mais de 20 anos dedicados à infância neurodivergente.',
};

export default async function SobrePage() {
  let blocks: Record<string, any> = {};

  try {
    const dbBlocks = await getPageBlocks('sobre');
    blocks = blocksToMap(dbBlocks);
  } catch {
    // fallback silencioso
  }

  const hero = blocks['hero'] || {};
  const bio = blocks['bio'] || {};

  return (
    <>
      <section className="section-padding">
        <div className="content-width">
          <h1 className="text-[var(--color-gk-green-dark)]">
            {hero.titulo || 'Sobre João Pereira'}
          </h1>
          {hero.subtitulo && (
            <p className="mt-4 text-lg text-[var(--color-gk-black)]/70">
              {hero.subtitulo}
            </p>
          )}
        </div>
      </section>

      {bio.corpo && (
        <section className="section-padding bg-[var(--color-gk-creme)]">
          <div className="content-width">
            <h2 className="text-[var(--color-gk-green-dark)]">
              {bio.titulo || 'Percurso'}
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--color-gk-black)]/80 md:text-lg">
              {bio.corpo.split('\n\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

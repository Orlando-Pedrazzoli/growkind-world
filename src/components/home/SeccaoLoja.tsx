import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ContentBlock } from '@/types';

interface SeccaoLojaProps {
  block: ContentBlock;
}

export default function SeccaoLoja({ block }: SeccaoLojaProps) {
  return (
    <AnimatedSection bg="creme">
      <div className="content-width text-center">
        {block.titulo && (
          <h2 className="text-[var(--color-gk-green-dark)]">
            {block.titulo}
          </h2>
        )}
        {block.corpo && (
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-[var(--color-gk-black)]/80 md:text-lg">
            {block.corpo.split('\n\n').map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        )}
        {block.ctaTexto && block.ctaLink && (
          <Link
            href={block.ctaLink}
            className="mt-10 inline-block rounded-lg bg-[var(--color-gk-ocre)] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-gk-ocre)]/90 hover:shadow-lg"
          >
            {block.ctaTexto}
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}

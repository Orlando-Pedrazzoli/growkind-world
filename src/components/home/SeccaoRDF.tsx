import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ContentBlock } from '@/types';

interface SeccaoRDFProps {
  block: ContentBlock;
}

export default function SeccaoRDF({ block }: SeccaoRDFProps) {
  return (
    <AnimatedSection bg="white">
      <div className="content-width text-center">
        {block.titulo && (
          <h2 className="text-[var(--color-gk-green-dark)]">
            {block.titulo}
          </h2>
        )}
        {block.subtitulo && (
          <p className="mx-auto mt-4 max-w-lg text-base italic text-[var(--color-gk-ocre)]">
            {block.subtitulo}
          </p>
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
            className="mt-10 inline-block rounded-lg border-2 border-[var(--color-gk-green-dark)] px-8 py-3.5 text-sm font-semibold text-[var(--color-gk-green-dark)] transition-all duration-300 hover:bg-[var(--color-gk-green-dark)] hover:text-white"
          >
            {block.ctaTexto}
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}

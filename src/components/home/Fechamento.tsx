import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ContentBlock } from '@/types';

interface FechamentoProps {
  block: ContentBlock;
}

export default function Fechamento({ block }: FechamentoProps) {
  return (
    <AnimatedSection bg="white">
      <div className="content-width py-8 text-center md:py-16">
        {block.titulo && (
          <p className="font-[family-name:var(--font-display)] text-2xl font-medium italic leading-relaxed text-[var(--color-gk-green-dark)] md:text-3xl">
            {block.titulo}
          </p>
        )}
        {block.subtitulo && (
          <p className="mt-4 text-base text-[var(--color-gk-ocre)]">
            — {block.subtitulo}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}

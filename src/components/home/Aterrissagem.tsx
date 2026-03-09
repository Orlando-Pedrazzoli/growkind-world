import AnimatedSection from '@/components/ui/AnimatedSection';
import type { ContentBlock } from '@/types';

interface AterrissagemProps {
  block: ContentBlock;
}

export default function Aterrissagem({ block }: AterrissagemProps) {
  return (
    <AnimatedSection bg="white">
      <div className="content-width text-center">
        {block.titulo && (
          <h2 className="text-[var(--color-gk-green-dark)]">
            {block.titulo}
          </h2>
        )}
        {block.corpo && (
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-[var(--color-gk-black)]/80">
            {block.corpo.split('\n\n').map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

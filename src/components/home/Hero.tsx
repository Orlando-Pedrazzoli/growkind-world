import CloudinaryImage from '@/components/ui/CloudinaryImage';
import type { ContentBlock } from '@/types';

interface HeroProps {
  block: ContentBlock;
}

export default function Hero({ block }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <CloudinaryImage
          publicId={block.imagemId || 'growkind/hero-forest-sprout'}
          alt="Floresta com broto crescendo — GrowKind World"
          width={1920}
          height={1080}
          priority
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        {/* Overlay para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gk-green-dark)]/50 via-[var(--color-gk-green-dark)]/30 to-[var(--color-gk-green-dark)]/60" />
      </div>

      {/* Conteúdo */}
      <div className="content-width relative z-10 text-center">
        <h1 className="text-white drop-shadow-sm">
          {block.titulo || 'Educação que cresce com a criança'}
        </h1>
        {block.subtitulo && (
          <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-white/90 md:text-xl">
            {block.subtitulo}
          </p>
        )}
      </div>
    </section>
  );
}

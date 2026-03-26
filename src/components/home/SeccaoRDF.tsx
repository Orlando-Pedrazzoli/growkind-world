import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ContentBlock {
  titulo?: string;
  subtitulo?: string;
  corpo?: string;
  ctaTexto?: string;
  ctaLink?: string;
}

interface SeccaoRDFProps {
  block: ContentBlock;
}

export default function SeccaoRDF({ block }: SeccaoRDFProps) {
  return (
    <AnimatedSection bg='white'>
      <div className='content-width text-center'>
        {/* Badge RDF — sem border-radius */}
        <div className='mx-auto mb-8 w-20 md:w-24'>
          <Image
            src='/images/rdf-badge.jpg'
            alt='RDF — Relational Development Framework'
            width={800}
            height={533}
            className='w-full'
            sizes='96px'
            quality={85}
          />
        </div>

        {block.titulo && (
          <h2 className='text-[var(--color-gk-green-dark)]'>{block.titulo}</h2>
        )}

        {block.subtitulo && (
          <p className='mx-auto mt-4 max-w-lg font-[family-name:var(--font-display)] text-base italic text-[var(--color-gk-ocre)]'>
            {block.subtitulo}
          </p>
        )}

        {block.corpo && (
          <div className='mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-[var(--color-gk-black)]/80 md:text-lg'>
            {block.corpo.split('\n\n').map((paragrafo: string, i: number) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>
        )}

        {block.ctaTexto && block.ctaLink && (
          <Link href={block.ctaLink} className='btn-ghost mt-10'>
            {block.ctaTexto}
          </Link>
        )}
      </div>
    </AnimatedSection>
  );
}

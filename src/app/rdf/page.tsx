import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'RDF & Cursos',
  description:
    'Relational Development Framework — o framework pedagógico da GrowKind. Cursos para famílias e profissionais.',
};

export default function RDFPage() {
  return (
    <>
      {/* Hero split — inspirado no mockup do João */}
      <section className='grid min-h-[80vh] grid-cols-1 pt-0 md:grid-cols-2 md:pt-0'>
        {/* Imagem */}
        <div className='relative min-h-[40vh] bg-[var(--color-gk-green-dark)] md:min-h-0'>
          <Image
            src='/images/rdf-principal.jpg'
            alt='RDF — Relational Development Framework'
            fill
            priority
            className='object-cover opacity-80'
            sizes='(max-width: 768px) 100vw, 50vw'
            quality={85}
          />
          <div className='absolute inset-0 bg-[var(--color-gk-green-dark)]/30' />
        </div>

        {/* Texto */}
        <div className='flex items-center bg-[var(--color-gk-creme)] px-8 py-16 md:px-16 md:py-24'>
          <div className='max-w-lg'>
            <span className='mb-6 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-gk-ocre)]'>
              Framework · GrowKind World
            </span>
            <h1 className='text-[var(--color-gk-green-dark)]'>
              Relational Development{' '}
              <em className='text-[var(--color-gk-ocre)]'>Framework</em>
            </h1>
            <p className='mt-4 font-[family-name:var(--font-display)] text-base italic leading-relaxed text-[var(--color-gk-black)]/50'>
              Uma forma de ler o que está a acontecer antes de qualquer decisão
              de resposta.
            </p>
            <div className='mt-8 space-y-4 text-sm leading-relaxed text-[var(--color-gk-black)]/75 md:text-base'>
              <p>
                O RDF não é uma terapia. Não é um protocolo. É uma lente — uma
                forma de organizar como o adulto observa, lê e se posiciona no
                campo relacional da criança.
              </p>
              <p>
                O desenvolvimento não se resolve. O desenvolvimento
                acompanha-se.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagrama — imagem estática (interactivo no Sprint 3) */}
      <section className='section-padding bg-white'>
        <div className='content-width-wide text-center'>
          <span className='mb-4 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-gk-ocre)]'>
            O Campo Relacional
          </span>
          <h2 className='text-[var(--color-gk-green-dark)]'>
            Onde o desenvolvimento acontece
          </h2>
          <p className='mx-auto mt-4 max-w-lg text-base text-[var(--color-gk-black)]/60'>
            Clica em cada movimento para explorar o que o campo está a pedir — e
            o que o adulto pode oferecer.
          </p>

          {/* Diagrama como imagem (substituir por SVG interactivo no Sprint 3) */}
          <div className='mx-auto mt-12 max-w-xl'>
            <Image
              src='/images/rdf-diagrama.jpg'
              alt='Diagrama do Campo Relacional — Criança, Adulto, Ambiente com os 3 movimentos'
              width={1024}
              height={1024}
              className='w-full rounded-sm'
              sizes='(max-width: 768px) 100vw, 576px'
              quality={90}
            />
          </div>

          <p className='mt-8 text-sm text-[var(--color-gk-black)]/40'>
            Diagrama interactivo em preparação — Sprint 3
          </p>
        </div>
      </section>
    </>
  );
}

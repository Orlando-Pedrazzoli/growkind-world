'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function FrameworkRDF() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id='rdf'
      className='w-full'
      style={{ backgroundColor: '#ffffff' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='flex flex-col md:flex-row'
      >
        {/* Lado esquerdo — imagem */}
        <div className='flex items-center justify-center px-6 pt-12 pb-6 md:w-1/2 md:px-[60px] md:py-[var(--spacing-section)]'>
          <Image
            src='/images/rdf-principal.jpg'
            alt='Relational Development Framework'
            width={1200}
            height={1600}
            className='w-full max-w-sm md:max-w-none'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>

        {/* Lado direito — conteudo */}
        <div className='flex flex-col justify-center px-6 pt-6 pb-12 md:w-1/2 md:px-[60px] md:py-[var(--spacing-section)]'>
          {/* Eyebrow */}
          <span className='eyebrow'>Framework · GrowKind World</span>

          {/* Titulo */}
          <h2 className='mt-6' style={{ color: 'var(--color-gk-green-dark)' }}>
            Relational
            <br />
            Development
            <br />
            <em style={{ color: 'var(--color-gk-ocre)' }}>Framework</em>
          </h2>

          {/* Subtitulo italico */}
          <p
            className='mt-6 font-[family-name:var(--font-display)] text-xl italic leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Uma forma de ler o que está a acontecer
            <br />
            antes de qualquer decisão de resposta.
          </p>

          {/* Paragrafos */}
          <div className='mt-8 space-y-6'>
            <p
              className='text-lg leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.7)' }}
            >
              O RDF não é uma terapia. Não é um protocolo. É uma lente — uma
              forma de organizar como o adulto observa, lê e se posiciona no
              campo relacional da criança.
            </p>
            <p
              className='text-lg leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.7)' }}
            >
              O desenvolvimento não se resolve. O desenvolvimento acompanha-se.
            </p>
          </div>

          {/* Botao */}
          <div className='mt-10'>
            <Link
              href='/rdf'
              className='inline-block cursor-pointer border-[1.5px] px-10 py-4 text-center text-[14px] font-medium uppercase tracking-widest'
              style={{
                borderColor: 'var(--color-gk-green-dark)',
                color: 'var(--color-gk-green-dark)',
                backgroundColor: 'transparent',
                width: 'fit-content',
              }}
            >
              Conheça o RDF
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

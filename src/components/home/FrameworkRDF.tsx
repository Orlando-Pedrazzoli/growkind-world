'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function FrameworkRDF() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id='rdf' className='w-full'>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='flex flex-col md:flex-row'
      >
        {/* Lado esquerdo — verde escuro + imagem */}
        <div
          className='flex items-center justify-center md:w-1/2'
          style={{
            backgroundColor: 'var(--color-gk-green-dark)',
            paddingBlock: 'var(--spacing-section)',
            paddingInline: '60px',
          }}
        >
          <Image
            src='/images/rdf-principal.jpg'
            alt='Relational Development Framework'
            width={1200}
            height={1600}
            className='w-full max-w-md'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>

        {/* Lado direito — creme + conteúdo */}
        <div
          className='flex flex-col justify-center md:w-1/2'
          style={{
            backgroundColor: 'var(--color-gk-creme)',
            paddingBlock: 'var(--spacing-section)',
            paddingInline: '60px',
          }}
        >
          {/* Eyebrow */}
          <span className='eyebrow'>Framework · GrowKind World</span>

          {/* Título */}
          <h2 className='mt-6' style={{ color: 'var(--color-gk-green-dark)' }}>
            Relational
            <br />
            Development
            <br />
            <em style={{ color: 'var(--color-gk-ocre)' }}>Framework</em>
          </h2>

          {/* Subtítulo itálico */}
          <p
            className='mt-6 font-[family-name:var(--font-display)] text-lg italic leading-relaxed'
            style={{ color: 'rgba(30,30,30,0.7)' }}
          >
            Uma forma de ler o que está a acontecer
            <br />
            antes de qualquer decisão de resposta.
          </p>

          {/* Parágrafos */}
          <div className='mt-8 space-y-6'>
            <p
              className='text-base leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.7)' }}
            >
              O RDF não é uma terapia. Não é um protocolo. É uma lente — uma
              forma de organizar como o adulto observa, lê e se posiciona no
              campo relacional da criança.
            </p>
            <p
              className='text-base leading-relaxed'
              style={{ color: 'rgba(30,30,30,0.7)' }}
            >
              O desenvolvimento não se resolve. O desenvolvimento acompanha-se.
            </p>
          </div>

          {/* Botões */}
          <div className='mt-10 flex flex-col gap-4'>
            <button
              disabled
              className='inline-block px-10 py-4 text-center text-[13px] font-medium uppercase tracking-widest text-white'
              style={{
                backgroundColor: 'var(--color-gk-green-dark)',
                width: 'fit-content',
              }}
            >
              Entrar na lista de espera
            </button>
            <button
              disabled
              className='inline-block border-[1.5px] px-10 py-4 text-center text-[13px] font-medium uppercase tracking-widest'
              style={{
                borderColor: 'var(--color-gk-green-dark)',
                color: 'var(--color-gk-green-dark)',
                backgroundColor: 'transparent',
                width: 'fit-content',
              }}
            >
              Ver o diagrama →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

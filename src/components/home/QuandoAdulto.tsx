'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function QuandoAdulto() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-ocre)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto flex items-center justify-center text-center'
        style={{
          maxWidth: 'var(--width-content-wide)',
          paddingBlock: '5rem',
          paddingInline: '60px',
        }}
      >
        <p className='font-[family-name:var(--font-display)] text-2xl leading-relaxed italic text-white md:text-3xl'>
          Quando o adulto aprende a ver,
          <br />
          a criança deixa de estar sozinha
          <br />
          no processo.
        </p>
      </motion.div>
    </section>
  );
}

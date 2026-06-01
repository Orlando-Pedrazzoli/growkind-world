'use client';

import { motion } from 'framer-motion';
import { revealContainer, revealItem } from '@/lib/motion';

export default function QuandoAdulto() {
  return (
    <section
      className='w-full'
      style={{ backgroundColor: 'var(--color-gk-ocre)' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
        className='mx-auto flex items-center justify-center px-6 py-12 text-center md:px-[60px] md:py-20'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        <motion.p
          variants={revealItem}
          className='font-[family-name:var(--font-display)] text-2xl leading-relaxed italic text-white md:text-3xl'
        >
          Quando o adulto aprende a ver,
          <br />
          a criança deixa de estar sozinha
          <br />
          no processo.
        </motion.p>
      </motion.div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: 'white' | 'creme' | 'green-light';
  id?: string;
}

const bgMap = {
  white: 'bg-[var(--color-gk-white)]',
  creme: 'bg-[var(--color-gk-creme)]',
  'green-light': 'bg-[var(--color-gk-green-light)]',
} as const;

export default function AnimatedSection({
  children,
  className = '',
  bg = 'white',
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id={id}
      className={`section-padding ${bgMap[bg]} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

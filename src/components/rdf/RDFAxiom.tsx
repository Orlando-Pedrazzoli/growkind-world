'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { useRdfData } from '@/lib/data/rdf';

// ── Accordion component ──

interface AccordionItem {
  icon: string;
  title: string;
  content: React.ReactNode;
}

function AccordionSection({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid rgba(212,207,196,0.4)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className='flex w-full cursor-pointer items-center gap-4 px-7 py-5 text-left transition-colors hover:bg-[rgba(245,240,232,0.5)]'
      >
        <span className='text-xl'>{item.icon}</span>
        <span
          className='flex-1 text-[16px] font-medium'
          style={{ color: 'var(--color-gk-black)' }}
        >
          {item.title}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: 'var(--color-gk-cinza)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='overflow-hidden'
          >
            <div className='px-7 pb-7'>{item.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ──

export default function RDFAxiom() {
  const t = useTranslations('rdf.axiom');
  const { pillars, approaches, glossary } = useRdfData();

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const accordions: AccordionItem[] = [
    {
      icon: '🔬',
      title: t('pillarsTitle'),
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t('pillarsIntro')}
          </p>
          <div className='flex flex-col gap-4'>
            {pillars.map(pilar => (
              <div
                key={pilar.title}
                className='p-5 md:p-6'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.15)',
                  borderRadius: '10px',
                  border: '1px solid rgba(200,220,192,0.3)',
                }}
              >
                <span
                  className='text-[10px] font-semibold uppercase tracking-[0.12em]'
                  style={{ color: '#8b6914' }}
                >
                  {pilar.label}
                </span>
                <h4
                  className='mt-2 text-[16px] font-semibold'
                  style={{ color: 'var(--color-gk-black)' }}
                >
                  {pilar.title}
                </h4>
                <p
                  className='mt-1 font-[family-name:var(--font-display)] text-[13px] italic'
                  style={{ color: 'var(--color-gk-cinza)' }}
                >
                  {pilar.refs}
                </p>
                <p
                  className='mt-3 text-[14px] leading-[1.8]'
                  style={{ color: 'rgba(30,30,30,0.65)' }}
                >
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: '🔄',
      title: t('approachesTitle'),
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t('approachesIntro')}
          </p>

          {/* Desktop: tabela */}
          <div className='hidden md:block'>
            <table
              className='w-full text-left text-[14px]'
              style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}
            >
              <thead>
                <tr>
                  <th
                    className='px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]'
                    style={{
                      color: 'var(--color-gk-cinza)',
                      borderBottom: '1px solid rgba(212,207,196,0.4)',
                    }}
                  >
                    {t('tableApproach')}
                  </th>
                  <th
                    className='px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]'
                    style={{
                      color: 'var(--color-gk-cinza)',
                      borderBottom: '1px solid rgba(212,207,196,0.4)',
                    }}
                  >
                    {t('tableLevel')}
                  </th>
                  <th
                    className='px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]'
                    style={{
                      color: 'var(--color-gk-cinza)',
                      borderBottom: '1px solid rgba(212,207,196,0.4)',
                    }}
                  >
                    {t('tableRelation')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {approaches.map(ab => (
                  <tr
                    key={ab.name}
                    style={{ backgroundColor: 'rgba(200,220,192,0.08)' }}
                  >
                    <td
                      className='px-5 py-4 font-semibold'
                      style={{
                        color: 'var(--color-gk-black)',
                        borderRadius: '8px 0 0 8px',
                        minWidth: '140px',
                      }}
                    >
                      {ab.name}
                    </td>
                    <td
                      className='px-5 py-4 leading-relaxed'
                      style={{ color: 'rgba(30,30,30,0.6)' }}
                    >
                      {ab.level}
                    </td>
                    <td
                      className='px-5 py-4 leading-relaxed'
                      style={{
                        color: 'rgba(30,30,30,0.7)',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      {ab.relation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards empilhados */}
          <div className='flex flex-col gap-3 md:hidden'>
            {approaches.map(ab => (
              <div
                key={ab.name}
                className='p-5'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.1)',
                  borderRadius: '8px',
                  borderLeft: '3px solid rgba(200,220,192,0.5)',
                }}
              >
                <span
                  className='text-[14px] font-semibold'
                  style={{ color: 'var(--color-gk-black)' }}
                >
                  {ab.name}
                </span>
                <p
                  className='mt-1 text-[13px] leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.5)' }}
                >
                  {ab.level}
                </p>
                <p
                  className='mt-3 text-[14px] leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.7)' }}
                >
                  {ab.relation}
                </p>
              </div>
            ))}
          </div>

          <p
            className='mt-6 text-[15px] italic leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t.rich('canonical', {
              strong: chunks => (
                <strong style={{ fontStyle: 'normal' }}>{chunks}</strong>
              ),
            })}
          </p>
        </div>
      ),
    },
    {
      icon: '📋',
      title: t('glossaryTitle'),
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t('glossaryIntro')}
          </p>
          <div className='grid gap-4 sm:grid-cols-2'>
            {glossary.map(item => (
              <div
                key={item.term}
                className='p-5'
                style={{
                  backgroundColor: 'rgba(245,240,232,0.7)',
                  borderRadius: '10px',
                }}
              >
                <h4
                  className='text-[15px] font-semibold'
                  style={{ color: 'var(--color-gk-black)' }}
                >
                  {item.term}
                </h4>
                <span
                  className='text-[12px] italic'
                  style={{ color: 'var(--color-gk-cinza)' }}
                >
                  {item.alt}
                </span>
                <p
                  className='mt-2 text-[14px] leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.6)' }}
                >
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={ref}
      className='px-6 py-20 md:px-[60px] md:py-28'
      style={{ backgroundColor: '#f5f0e8' }}
    >
      <motion.div
        className='mx-auto max-w-[1100px]'
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className='max-w-2xl'>
          <span
            className='text-[11px] font-semibold uppercase tracking-[0.14em]'
            style={{ color: '#8b6914' }}
          >
            {t('eyebrow')}
          </span>
          <h2
            className='mt-6 font-[family-name:var(--font-display)]'
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-gk-black)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {t.rich('title', {
              em: chunks => <em style={{ color: '#c4a44a' }}>{chunks}</em>,
            })}
          </h2>
          <p
            className='mt-5 text-[16px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            {t('intro')}
          </p>
        </div>

        {/* Accordions */}
        <div className='mt-12 flex flex-col gap-4'>
          {accordions.map(item => (
            <AccordionSection key={item.title} item={item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ── Dados inline (específicos deste componente) ──

const PILARES = [
  {
    label: 'Pilar 1',
    title: 'Neurodiversidade',
    refs: 'DSM-5-TR · Happé · Baron-Cohen',
    desc: 'Diagnóstico como informação, não destino. O perfil informa a leitura — não a determina.',
  },
  {
    label: 'Pilar 2',
    title: 'Processamento Sensorial',
    refs: 'Winnie Dunn (1997, 2007)',
    desc: 'Perfis sensoriais como determinantes do campo ambiental. Base da leitura do Ambiente.',
  },
  {
    label: 'Pilar 3',
    title: 'Regulação do SNA',
    refs: 'Porges — Polyvagal Theory (2011)',
    desc: 'Segurança neurológica como pré-requisito de aprendizagem. Base do Movimento 1.',
  },
  {
    label: 'Pilar 4',
    title: 'Vinculação e Relação',
    refs: 'Bowlby · Ainsworth · Greenspan',
    desc: 'Adulto como base segura. Base do Movimento 3 e da relação no campo.',
  },
  {
    label: 'Pilar 5',
    title: 'Desenvolvimento Sociocognitivo',
    refs: 'Vygotsky · Tomasello · Siegel',
    desc: 'Adulto como condição do desenvolvimento. ZPD, atenção conjunta, co-regulação.',
  },
];

const ABORDAGENS = [
  {
    name: 'PBS / PBIS',
    desc: 'Resposta comportamental. O RDF opera antes — ao nível da leitura que informa a resposta.',
  },
  {
    name: 'DIR / Floortime',
    desc: 'Partilha a premissa relacional. O RDF é a leitura; DIR é a intervenção que pode emergir dela.',
  },
  {
    name: 'Teoria Polyvagal',
    desc: 'Base científica do Movimento 1 — regulação do SNA como pré-condição.',
  },
  {
    name: 'ABA',
    desc: 'Modificação comportamental. O RDF não substitui — precede a leitura que informa qualquer resposta.',
  },
  {
    name: 'Regulação Emocional',
    desc: 'O RDF opera um nível antes — lê o campo que produz o estado emocional.',
  },
];

const GLOSSARIO = [
  {
    term: 'Campo Relacional',
    def: 'Espaço que emerge quando criança, ambiente e adulto estão em relação simultânea. Onde o desenvolvimento acontece.',
  },
  {
    term: 'Leitura do Campo',
    def: 'Observar e interpretar o campo antes de qualquer decisão de resposta.',
  },
  {
    term: 'Ser Chão',
    def: 'Papel do adulto no M1. Presença reguladora antes de qualquer instrução.',
  },
  {
    term: 'Ser Estrutura',
    def: 'Papel do adulto no M2. Enquadramento que permite a acção — contenção que liberta.',
  },
  {
    term: 'Ser Mediador',
    def: 'Papel do adulto no M3. Mediar o encontro sem forçar nem substituir.',
  },
  {
    term: 'Ser Eixo',
    def: 'Papel do adulto no movimento transversal. Coerência entre adultos envolvidos.',
  },
  {
    term: 'Co-regulação',
    def: 'O sistema nervoso do adulto regula o da criança através da presença. Condição — não técnica.',
  },
  {
    term: 'Comportamento como efeito',
    def: 'O comportamento é sempre efeito do campo — nunca ponto de partida da intervenção.',
  },
];

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

export default function RDFAxiom() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const accordions: AccordionItem[] = [
    {
      icon: '🔬',
      title: 'Os cinco pilares científicos',
      content: (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          {PILARES.map(pilar => (
            <div
              key={pilar.title}
              className='p-5'
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
                className='mt-2 text-[15px] font-semibold'
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
                className='mt-3 text-[13px] leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.6)' }}
              >
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: '🔄',
      title: 'Relação com outras abordagens',
      content: (
        <div>
          <p
            className='mb-5 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            O RDF não compete com outras abordagens — opera um nível antes. A
            leitura do campo precede qualquer decisão de intervenção.
          </p>
          <div className='flex flex-col gap-2'>
            {ABORDAGENS.map(ab => (
              <div
                key={ab.name}
                className='flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6'
                style={{
                  backgroundColor: 'rgba(200,220,192,0.1)',
                  borderRadius: '8px',
                  borderLeft: '3px solid rgba(200,220,192,0.5)',
                }}
              >
                <span
                  className='shrink-0 text-[14px] font-semibold'
                  style={{ color: 'var(--color-gk-black)', minWidth: '160px' }}
                >
                  {ab.name}
                </span>
                <span
                  className='text-[14px] leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.6)' }}
                >
                  {ab.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: '📋',
      title: 'Glossário RDF',
      content: (
        <div className='grid gap-4 sm:grid-cols-2'>
          {GLOSSARIO.map(item => (
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
              <p
                className='mt-2 text-[14px] leading-relaxed'
                style={{ color: 'rgba(30,30,30,0.6)' }}
              >
                {item.def}
              </p>
            </div>
          ))}
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
            Para quem quer aprofundar
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
            A fundamentação <em style={{ color: '#c4a44a' }}>científica</em>
          </h2>
          <p
            className='mt-5 text-[16px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            O RDF não é uma intuição — tem base científica sólida em cinco
            pilares de investigação. Para quem quer saber mais.
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

'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ── Dados completos dos pilares (Secção 2 do doc) ──

const PILARES = [
  {
    label: 'Pilar 1',
    title: 'Neurodiversidade e Diagnóstico',
    refs: 'DSM-5-TR (APA, 2022) · Happé & Frith (2006) · Baron-Cohen (2002)',
    desc: 'O RDF parte da premissa de que o diagnóstico é informação — não destino. As investigações de Happé e Baron-Cohen sobre coerência central e cognição autística mostram que as diferenças de processamento não são défices a corrigir, mas perfis distintos de organização neurológica. O DSM-5-TR é usado como referência nosológica, não como mapa de resposta. O RDF opera depois do diagnóstico — e antes da intervenção.',
  },
  {
    label: 'Pilar 2',
    title: 'Processamento Sensorial',
    refs: 'Winnie Dunn (1997, 2007)',
    desc: 'O ambiente é um participante activo no campo relacional — não um pano de fundo. Os limiares sensoriais de cada criança (hiperresponsividade, hiporresponsividade, procura sensorial, evitamento) determinam o que o sistema nervoso processa antes de qualquer instrução verbal chegar. O trabalho de Winnie Dunn sobre perfis sensoriais fundamenta a leitura ambiental no RDF: ajustar o espaço é intervir.',
  },
  {
    label: 'Pilar 3',
    title: 'Regulação do Sistema Nervoso Autónomo',
    refs: 'Stephen W. Porges — The Polyvagal Theory (2011)',
    desc: 'A Teoria Polyvagal de Porges descreve como o sistema nervoso autónomo organiza os estados fisiológicos em três níveis: segurança (sistema ventrovagal), mobilização (sistema simpático) e imobilização (dorsal vagal). A aprendizagem, a atenção e a relação social só são possíveis a partir de um estado de segurança neurológica. Esta é a base científica do Movimento 1 do RDF — regulação antes de instrução, sempre.',
  },
  {
    label: 'Pilar 4',
    title: 'Vinculação e Desenvolvimento Relacional',
    refs: 'Bowlby (1969, 1973) · Ainsworth et al. (1978) · Greenspan & Wieder (2006)',
    desc: 'A teoria da vinculação de Bowlby e Ainsworth estabelece que o adulto funciona como base segura — condição do desenvolvimento relacional, não apenas apoio emocional. O adulto regulado regula o sistema nervoso da criança através da presença. Greenspan e Wieder (DIR/Floortime) aprofundam como os níveis de desenvolvimento relacional se constroem sequencialmente — base científica do Movimento 3 do RDF e dos três níveis de mediação.',
  },
  {
    label: 'Pilar 5',
    title: 'Desenvolvimento Sociocognitivo e Co-regulação',
    refs: 'Vygotsky (1978) · Tomasello (1999, 2014) · Siegel (1999, 2012) · Schore (2003)',
    desc: 'Vygotsky demonstrou que o desenvolvimento ocorre na zona de desenvolvimento proximal — entre o que a criança consegue sozinha e o que consegue com presença adulta. Tomasello aprofundou o papel da atenção conjunta como fundação da cognição social. Siegel e Schore mostraram que a co-regulação é um processo neurobiológico: o sistema nervoso do adulto organiza o sistema nervoso da criança. O adulto não é um mediador externo — é uma condição do desenvolvimento.',
  },
];

// ── Dados completos das abordagens (Secção 3 do doc) ──

const ABORDAGENS = [
  {
    name: 'PBS / PBIS',
    nivel: 'Resposta comportamental — suporte positivo ao comportamento',
    relacao:
      'O RDF opera antes: lê o campo que produz o comportamento antes de qualquer plano de suporte.',
  },
  {
    name: 'ABA',
    nivel:
      'Modificação comportamental — antecedente, comportamento, consequência',
    relacao:
      'O RDF não substitui nem compete: precede a leitura. Um campo bem lido informa melhores decisões de qualquer metodologia.',
  },
  {
    name: 'DIR / Floortime',
    nivel: 'Interacção afectiva — seguir a criança, construir relação',
    relacao:
      'Partilha a premissa relacional do RDF. O Movimento 3 (Ser Mediador) tem base directa na progressão DIR. Complementares.',
  },
  {
    name: 'Teoria Polyvagal',
    nivel: 'Regulação do sistema nervoso autónomo',
    relacao:
      'Base científica directa do Movimento 1. O RDF operacionaliza a Teoria Polyvagal em contexto educativo e familiar.',
  },
  {
    name: 'Processamento Sensorial',
    nivel: 'Perfis sensoriais e limiares de activação',
    relacao:
      'Base da leitura ambiental no RDF. Perfil sensorial informa o que o ambiente está a oferecer ao sistema nervoso.',
  },
  {
    name: 'Regulação Emocional',
    nivel: 'Estado emocional — estratégias de autorregulação',
    relacao:
      'O RDF opera um nível antes: regulação do campo (adulto + ambiente) cria as condições para que a regulação emocional seja possível.',
  },
];

// ── Glossário completo (Secção 4 do doc) ──

const GLOSSARIO = [
  {
    term: 'Campo Relacional',
    en: 'Relational Field',
    def: 'O espaço que emerge quando criança, ambiente e adulto estão em relação simultânea. Não é um lugar físico — é onde o desenvolvimento acontece. O campo é lido, não diagnosticado.',
  },
  {
    term: 'Leitura do Campo',
    en: 'Field Reading',
    def: 'Observar e interpretar o que está a acontecer entre os três elementos — criança, ambiente, adulto — antes de qualquer decisão de resposta. É o acto profissional central do RDF.',
  },
  {
    term: 'Movimentos do Campo',
    en: 'Field Movements',
    def: 'Tipos de necessidade que emergem no campo: regulação, estrutura, relação. São lentes de leitura — não etapas sequenciais, não categorias diagnósticas. A mesma criança pode precisar de movimentos diferentes ao longo do mesmo dia.',
  },
  {
    term: 'Ser Chão',
    en: 'Being Ground',
    def: 'O papel do adulto no Movimento 1. Tornar-se presença reguladora antes de qualquer instrução verbal. Regulação do campo antes de qualquer tarefa.',
  },
  {
    term: 'Ser Estrutura',
    en: 'Being Structure',
    def: 'O papel do adulto no Movimento 2. Oferecer enquadramento que permite a acção — não controlo, mas contenção que liberta. Emprestar o começo sem fazer pela criança.',
  },
  {
    term: 'Ser Mediador',
    en: 'Being Mediator',
    def: 'O papel do adulto no Movimento 3. Mediar o encontro entre a criança e o outro sem forçar nem substituir. Entrar no campo sem tomar o espaço da criança.',
  },
  {
    term: 'Ser Eixo',
    en: 'Being Axis',
    def: 'O papel do adulto no Movimento Transversal. Garantir coerência de leitura entre todos os adultos envolvidos — educadores, família, terapeutas. Não é liderança. É coerência ao longo do tempo.',
  },
  {
    term: 'Co-regulação',
    en: 'Co-regulation',
    def: 'O sistema nervoso do adulto organiza o sistema nervoso da criança através da presença. Não é uma técnica — é uma condição neurobiológica. A regulação do adulto é a intervenção.',
  },
  {
    term: 'Arquivo de Campo',
    en: 'Field Archive',
    def: 'Registo estruturado de observações feitas por pais e profissionais de apoio ao longo do tempo. Partilhável com terapeutas e equipas. O TA vê o dia real da criança que nenhum relatório clínico captura.',
  },
];

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
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const accordions: AccordionItem[] = [
    {
      icon: '🔬',
      title: 'Os cinco pilares científicos',
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            O RDF não é uma intuição estruturada. Cada movimento do campo e cada
            princípio operacional tem base em investigação publicada. Os cinco
            pilares abaixo são as fundações científicas do framework.
          </p>
          <div className='flex flex-col gap-4'>
            {PILARES.map(pilar => (
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
      title: 'Relação com outras abordagens',
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            O RDF não compete com as abordagens existentes. Opera um nível antes
            — a leitura do campo que precede qualquer decisão de resposta. Esta
            distinção elimina a necessidade de escolher entre frameworks.
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
                    Abordagem
                  </th>
                  <th
                    className='px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]'
                    style={{
                      color: 'var(--color-gk-cinza)',
                      borderBottom: '1px solid rgba(212,207,196,0.4)',
                    }}
                  >
                    Nível de operação
                  </th>
                  <th
                    className='px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em]'
                    style={{
                      color: 'var(--color-gk-cinza)',
                      borderBottom: '1px solid rgba(212,207,196,0.4)',
                    }}
                  >
                    Relação com o RDF
                  </th>
                </tr>
              </thead>
              <tbody>
                {ABORDAGENS.map(ab => (
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
                      {ab.nivel}
                    </td>
                    <td
                      className='px-5 py-4 leading-relaxed'
                      style={{
                        color: 'rgba(30,30,30,0.7)',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      {ab.relacao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards empilhados */}
          <div className='flex flex-col gap-3 md:hidden'>
            {ABORDAGENS.map(ab => (
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
                  {ab.nivel}
                </p>
                <p
                  className='mt-3 text-[14px] leading-relaxed'
                  style={{ color: 'rgba(30,30,30,0.7)' }}
                >
                  {ab.relacao}
                </p>
              </div>
            ))}
          </div>

          <p
            className='mt-6 text-[15px] italic leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            A formulação canónica:{' '}
            <strong style={{ fontStyle: 'normal' }}>
              o RDF é o nível anterior à decisão de resposta.
            </strong>{' '}
            Não substitui o que o profissional já sabe. Organiza a leitura que
            precede o que o profissional vai decidir fazer.
          </p>
        </div>
      ),
    },
    {
      icon: '📋',
      title: 'Glossário RDF',
      content: (
        <div>
          <p
            className='mb-6 text-[15px] leading-relaxed'
            style={{ color: 'var(--color-gk-cinza)' }}
          >
            O RDF tem uma linguagem própria — precisa e partilhável. Este
            glossário é o ponto de entrada. Nos cursos, a linguagem é
            aprofundada em contexto profissional e familiar.
          </p>
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
                <span
                  className='text-[12px] italic'
                  style={{ color: 'var(--color-gk-cinza)' }}
                >
                  {item.en}
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

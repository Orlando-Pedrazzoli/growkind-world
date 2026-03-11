import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RDF — Relational Development Framework',
  description:
    'O RDF é uma lente de leitura do campo relacional — uma forma de organizar como o adulto observa, lê e se posiciona no campo relacional da criança.',
};

/* ── Dados dos movimentos ── */
const movimentos = [
  {
    codigo: 'M1',
    titulo: 'Habitar o Mundo',
    sub: 'Regulação · Ser Chão',
    texto:
      'Quando o campo pede regulação, o adulto torna-se chão. O sistema nervoso da criança precisa de encontrar estabilidade antes de qualquer outra coisa. A presença é a intervenção.',
    key: 'm1',
  },
  {
    codigo: 'M2',
    titulo: 'Agir no Mundo',
    sub: 'Estrutura · Abrir Caminho',
    texto:
      'Quando o campo pede estrutura, o adulto torna-se estrutura. A criança precisa de previsibilidade para agir. O adulto oferece enquadramento — não como controlo, mas como contenção que liberta.',
    key: 'm2',
  },
  {
    codigo: 'M3',
    titulo: 'Encontrar o Outro',
    sub: 'Relação · Sustentar o Encontro',
    texto:
      'Quando o campo pede relação, o adulto torna-se mediador do encontro. Este movimento tem uma progressão interna pedagogicamente crítica — da interferência funcional à mente própria.',
    key: 'm3',
  },
];

const publicos = [
  {
    titulo: 'Pais e Famílias',
    texto:
      'Que querem compreender antes de agir. O pai que aprende a ler o campo — em vez de reagir ao comportamento — transforma o ambiente doméstico.',
    icon: 'family',
  },
  {
    titulo: 'Teaching Assistants',
    texto:
      'O adulto relacional por excelência no contexto escolar. Quem está nas transições, nas actividades, nos momentos de tensão — ao lado da criança ao longo do dia inteiro.',
    icon: 'school',
  },
  {
    titulo: 'Professores',
    texto:
      'Que ensinam sem apagar quem a criança é. O RDF oferece uma linguagem comum entre professor, TA e família — substituindo relatórios clínicos por leitura partilhada do campo.',
    icon: 'teach',
  },
  {
    titulo: 'Terapeutas',
    texto:
      'O terapeuta não precisa de aprender o RDF para beneficiar dele. Recebe um arquivo de campo que mostra o que está a acontecer fora da sessão — e trabalha em continuidade com a vida real da criança.',
    icon: 'therapy',
  },
];

export default function RDFPage() {
  return (
    <>
      {/* ═══════════════════════════════════
          HERO — min-height 100vh, grid 50/50
         ═══════════════════════════════════ */}
      <section className='-mt-20 grid min-h-screen grid-cols-1 pt-0 md:-mt-24 md:grid-cols-2'>
        {/* Lado esquerdo — imagem sobre fundo verde-escuro */}
        <div className='relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-[var(--color-gk-green-dark)] md:min-h-0'>
          {/* Gradiente subtil ocre */}
          <div
            className='absolute inset-0'
            style={{
              background:
                'radial-gradient(ellipse at 30% 60%, rgba(193,127,58,0.15) 0%, transparent 60%)',
            }}
          />
          <div className='relative z-10 w-full max-w-sm px-12 py-16 md:px-16'>
            <Image
              src='/images/rdf-principal.jpg'
              alt='RDF — Relational Development Framework'
              width={1200}
              height={1600}
              priority
              className='w-full'
              style={{
                border: '1.5px solid rgba(200,220,192,0.3)',
                aspectRatio: '3/4',
                objectFit: 'cover',
              }}
              sizes='(max-width: 768px) 80vw, 380px'
              quality={85}
            />
          </div>
        </div>

        {/* Lado direito — conteúdo editorial */}
        <div className='flex items-center bg-[var(--color-gk-creme)] px-8 py-16 md:px-16 md:py-24 lg:px-20'>
          <div style={{ maxWidth: '480px' }}>
            <span className='eyebrow mb-7 block'>
              Framework · GrowKind World
            </span>

            <h1
              className='text-[var(--color-gk-green-dark)]'
              style={{ lineHeight: 1.12 }}
            >
              Relational
              <br />
              Development
              <br />
              <em className='text-[var(--color-gk-ocre)]'>Framework</em>
            </h1>

            <p
              className='mt-3 font-[family-name:var(--font-display)] italic text-[var(--color-gk-cinza)]'
              style={{ fontSize: '16px', lineHeight: 1.6 }}
            >
              Uma forma de ler o que está a acontecer
              <br />
              antes de qualquer decisão de resposta.
            </p>

            <div
              className='mt-10 space-y-4 text-[var(--color-gk-black)]'
              style={{ fontSize: '15px', lineHeight: 1.8, opacity: 0.75 }}
            >
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

            {/* Dois CTAs — conforme mockup */}
            <div className='mt-12 flex flex-wrap gap-4'>
              <a href='#captura' className='btn-primary'>
                Entrar na lista de espera
              </a>
              <Link href='/rdf/diagrama' className='btn-ghost'>
                Ver o diagrama →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          INTRO — O que é o RDF
         ═══════════════════════════════════ */}
      <section className='bg-white' style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <span className='section-label'>O que é o RDF</span>

          <div className='grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20'>
            {/* Texto */}
            <div>
              <h2
                className='mb-10 text-[var(--color-gk-green-dark)]'
                style={{ maxWidth: '600px' }}
              >
                Uma lente de leitura do campo relacional
              </h2>

              <div
                className='space-y-5 text-[var(--color-gk-black)]'
                style={{ fontSize: '15px', lineHeight: 1.85, opacity: 0.78 }}
              >
                <p>
                  O RDF organiza a forma como o adulto observa e responde ao que
                  está a acontecer entre a criança e o ambiente — num campo que
                  inclui sempre três elementos em relação: a criança, o ambiente
                  e o adulto.
                </p>
                <p>
                  Parte de uma premissa central: o desenvolvimento não acontece
                  dentro da criança. Acontece no entre. No espaço que se cria
                  quando estes três elementos estão em relação.
                </p>
                <p>
                  O adulto não intervém sobre a criança — aprende a ler o campo
                  relacional e ajusta a sua presença de acordo com o que esse
                  campo está a pedir.
                </p>
              </div>
            </div>

            {/* Pullquote */}
            <div
              className='bg-[var(--color-gk-creme)]'
              style={{
                padding: '40px',
                borderLeft: '3px solid var(--color-gk-ocre)',
              }}
            >
              <blockquote
                className='font-[family-name:var(--font-display)] italic text-[var(--color-gk-green-dark)]'
                style={{
                  fontSize: '22px',
                  lineHeight: 1.55,
                  marginBottom: '20px',
                }}
              >
                «A pergunta não é qual a técnica certa. A pergunta é: o que está
                a acontecer com esta criança, agora?»
              </blockquote>
              <cite
                className='not-italic text-[var(--color-gk-cinza)]'
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Princípio central · RDF Framework
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Separador */}
      <div
        style={{
          height: '1px',
          background: 'rgba(26,92,42,0.08)',
        }}
      />

      {/* ═══════════════════════════════════
          OS TRÊS ELEMENTOS DO CAMPO
         ═══════════════════════════════════ */}
      <section
        className='bg-[var(--color-gk-green-dark)]'
        style={{ padding: '100px 60px' }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <span
            className='eyebrow mb-6 block'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            Os três elementos do campo
          </span>

          <h2 className='mb-4 text-white' style={{ maxWidth: '560px' }}>
            O desenvolvimento emerge no entre
          </h2>

          <p
            className='mb-16'
            style={{
              fontSize: '15px',
              color: 'rgba(200,220,192,0.7)',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}
          >
            A ordem não é neutra. A criança é sempre o ponto de partida da
            leitura.
          </p>

          <div className='grid grid-cols-1 gap-px md:grid-cols-3'>
            {/* Card 01 — Criança */}
            <div
              className='transition-colors duration-300 hover:bg-white/[0.08]'
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '48px 40px',
                border: '1px solid rgba(200,220,192,0.1)',
              }}
            >
              <div
                className='font-[family-name:var(--font-display)]'
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  color: 'rgba(193,127,58,0.25)',
                  lineHeight: 1,
                  marginBottom: '24px',
                }}
              >
                01
              </div>
              <h3 className='mb-3 text-white'>A Criança</h3>
              <span
                className='eyebrow mb-5 block'
                style={{ color: 'var(--color-gk-ocre)' }}
              >
                Ponto de partida
              </span>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(200,220,192,0.65)',
                }}
              >
                O comportamento é sempre lido como efeito — a expressão visível
                do que já está a acontecer no sistema nervoso em encontro com o
                ambiente. Nunca como ponto de partida da intervenção.
              </p>
            </div>

            {/* Card 02 — Ambiente */}
            <div
              className='transition-colors duration-300 hover:bg-white/[0.08]'
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '48px 40px',
                border: '1px solid rgba(200,220,192,0.1)',
              }}
            >
              <div
                className='font-[family-name:var(--font-display)]'
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  color: 'rgba(193,127,58,0.25)',
                  lineHeight: 1,
                  marginBottom: '24px',
                }}
              >
                02
              </div>
              <h3 className='mb-3 text-white'>O Ambiente</h3>
              <span
                className='eyebrow mb-5 block'
                style={{ color: 'var(--color-gk-ocre)' }}
              >
                Participante activo
              </span>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(200,220,192,0.65)',
                }}
              >
                O ambiente não é cenário — é participante activo do campo.
                Mudanças no espaço, na rotina e nos materiais reorganizam o
                sistema nervoso antes de qualquer instrução verbal.
              </p>
            </div>

            {/* Card 03 — Adulto */}
            <div
              className='transition-colors duration-300 hover:bg-white/[0.08]'
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '48px 40px',
                border: '1px solid rgba(200,220,192,0.1)',
              }}
            >
              <div
                className='font-[family-name:var(--font-display)]'
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  color: 'rgba(193,127,58,0.25)',
                  lineHeight: 1,
                  marginBottom: '24px',
                }}
              >
                03
              </div>
              <h3 className='mb-3 text-white'>O Adulto</h3>
              <span
                className='eyebrow mb-5 block'
                style={{ color: 'var(--color-gk-ocre)' }}
              >
                Leitor do campo
              </span>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'rgba(200,220,192,0.65)',
                }}
              >
                O adulto é o elemento que lê o campo e ajusta a presença. Não
                decide como entrar — ajusta de forma fluida e contínua,
                frequentemente corporal antes de ser consciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          OS MOVIMENTOS DO CAMPO
         ═══════════════════════════════════ */}
      <section
        className='bg-[var(--color-gk-creme)]'
        style={{ padding: '120px 60px' }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Header grid */}
          <div className='mb-16 grid grid-cols-1 items-end gap-12 md:grid-cols-2 md:gap-20'>
            <div>
              <span className='section-label'>Os movimentos do campo</span>
              <h2 className='text-[var(--color-gk-green-dark)]'>
                Não são etapas. São lentes de leitura em movimento.
              </h2>
            </div>
            <div className='flex flex-col items-start gap-6'>
              <p
                className='font-[family-name:var(--font-display)] italic text-[var(--color-gk-green-dark)]'
                style={{ fontSize: '26px', lineHeight: 1.4 }}
              >
                «A mesma criança pode precisar de movimentos diferentes ao longo
                do mesmo dia.»
              </p>
              <Link href='/rdf/diagrama' className='btn-ghost'>
                Explorar o diagrama interactivo →
              </Link>
            </div>
          </div>

          {/* Lista de movimentos M1-M3 */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {movimentos.map((m, i) => (
              <li
                key={m.key}
                className='group cursor-pointer'
                style={{
                  padding: '32px 0',
                  borderBottom: '1px solid rgba(26,92,42,0.1)',
                  borderTop: i === 0 ? '1px solid rgba(26,92,42,0.1)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                }}
              >
                <span
                  className='text-[var(--color-gk-cinza)]'
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    paddingTop: '4px',
                  }}
                >
                  {m.codigo}
                </span>
                <div>
                  <div className='mb-1.5 font-[family-name:var(--font-display)] text-[22px] font-semibold text-[var(--color-gk-green-dark)] transition-colors group-hover:text-[var(--color-gk-ocre)]'>
                    {m.titulo}
                  </div>
                  <span
                    className='eyebrow mb-3 block'
                    style={{ color: 'var(--color-gk-ocre)' }}
                  >
                    {m.sub}
                  </span>
                  <p
                    className='text-[var(--color-gk-cinza)]'
                    style={{ fontSize: '14px', lineHeight: 1.75 }}
                  >
                    {m.texto}
                  </p>
                </div>
              </li>
            ))}

            {/* MT — Transversal (estilo diferente) */}
            <li
              className='group mt-10 cursor-pointer'
              style={{
                padding: '36px 40px',
                background: 'rgba(193,127,58,0.08)',
                border: '1px solid rgba(193,127,58,0.2)',
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '24px',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  paddingTop: '4px',
                  color: 'var(--color-gk-ocre)',
                }}
              >
                MT
              </span>
              <div>
                <div className='mb-1.5 font-[family-name:var(--font-display)] text-[22px] font-semibold text-[var(--color-gk-green-dark)] transition-colors group-hover:text-[var(--color-gk-ocre)]'>
                  Coordenar o Campo
                </div>
                <span
                  className='eyebrow mb-3 block'
                  style={{ color: 'var(--color-gk-ocre)' }}
                >
                  Ser Eixo · Movimento Transversal
                </span>
                <p
                  className='text-[var(--color-gk-cinza)]'
                  style={{ fontSize: '14px', lineHeight: 1.75 }}
                >
                  Este movimento pertence ao campo do adulto — não ao
                  desenvolvimento da criança. É transversal a todos os
                  movimentos. O adulto mantém coerência entre o que observa,
                  decide e comunica.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PARA QUEM É
         ═══════════════════════════════════ */}
      <section style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <span className='section-label'>Para quem é</span>
          <h2 className='text-[var(--color-gk-green-dark)]'>
            O RDF é para todos os adultos que acompanham a criança
          </h2>

          <div
            className='mt-14 grid grid-cols-1 md:grid-cols-2'
            style={{ gap: '2px' }}
          >
            {publicos.map(p => (
              <div
                key={p.titulo}
                className='bg-[var(--color-gk-creme)] transition-colors duration-300 hover:bg-[var(--color-gk-green-light)]'
                style={{ padding: '48px 44px' }}
              >
                {/* Ícone */}
                <div
                  className='mb-6 flex items-center justify-center'
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1.5px solid var(--color-gk-ocre)',
                  }}
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='var(--color-gk-ocre)'
                    strokeWidth='1.5'
                  >
                    {p.icon === 'family' && (
                      <>
                        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                        <circle cx='9' cy='7' r='4' />
                      </>
                    )}
                    {p.icon === 'school' && (
                      <>
                        <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                        <path d='M6 12v5c3 3 9 3 12 0v-5' />
                      </>
                    )}
                    {p.icon === 'teach' && (
                      <>
                        <rect x='2' y='3' width='20' height='14' rx='2' />
                        <path d='M8 21h8M12 17v4' />
                      </>
                    )}
                    {p.icon === 'therapy' && (
                      <>
                        <path d='M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18' />
                      </>
                    )}
                  </svg>
                </div>

                <h3
                  className='mb-3 font-[family-name:var(--font-display)] text-[var(--color-gk-green-dark)]'
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  {p.titulo}
                </h3>
                <p
                  className='text-[var(--color-gk-cinza)]'
                  style={{ fontSize: '14px', lineHeight: 1.8 }}
                >
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CAPTURA EMAIL — Lista de Espera
         ═══════════════════════════════════ */}
      <CapturaRDF />
    </>
  );
}

/* ── Componente de captura inline (Server Component friendly) ── */
function CapturaRDF() {
  return (
    <section
      id='captura'
      className='bg-[var(--color-gk-green-light)]'
      style={{ padding: '120px 60px' }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <span className='eyebrow mb-6 block'>Formação GrowKind · Em breve</span>
        <h2 className='text-[var(--color-gk-green-dark)]'>
          Entra na lista de espera
        </h2>
        <p
          className='mx-auto mt-4 text-[var(--color-gk-green-dark)]'
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            opacity: 0.7,
            maxWidth: '480px',
          }}
        >
          Os cursos GrowKind — para famílias e para Teaching Assistants — estão
          em desenvolvimento. Quando abrirem inscrições, a lista de espera tem
          prioridade.
        </p>

        {/* Form client wrapper necessário — importar separadamente */}
        <CapturaFormPlaceholder />

        <p
          className='mt-4 text-[var(--color-gk-green-dark)]'
          style={{ fontSize: '12px', opacity: 0.5 }}
        >
          Sem pressão. Só o que importa — quando importar.
        </p>
      </div>
    </section>
  );
}

/* ── Placeholder que será substituído pelo componente client ── */
function CapturaFormPlaceholder() {
  return (
    <form
      className='mx-auto mt-12 flex flex-col gap-3'
      style={{ maxWidth: '460px' }}
      action='/api/leads'
      method='POST'
    >
      <input
        type='text'
        name='nome'
        required
        placeholder='O teu nome'
        className='input-editorial'
      />
      <input
        type='email'
        name='email'
        required
        placeholder='O teu email'
        className='input-editorial'
      />
      <select name='perfil' className='input-editorial' defaultValue=''>
        <option value='' disabled>
          Eu sou...
        </option>
        <option value='pai-mae'>Pai / Mãe</option>
        <option value='teaching-assistant'>Teaching Assistant</option>
        <option value='professor'>Professor(a)</option>
        <option value='psicologo-terapeuta'>Psicólogo(a) / Terapeuta</option>
        <option value='outro-profissional'>Outro profissional</option>
      </select>
      <button
        type='submit'
        className='btn-primary w-full'
        style={{ padding: '18px' }}
      >
        Entrar na lista de espera
      </button>
    </form>
  );
}

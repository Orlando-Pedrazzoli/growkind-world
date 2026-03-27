'use client';

const audiencias = [
  {
    titulo: 'Pais',
    descricao: 'Que querem compreender, não apenas aplicar.',
  },
  {
    titulo: 'Professores',
    descricao: 'Que sentem que há mais do que o currículo.',
  },
  {
    titulo: 'Profissionais',
    descricao: 'Que preferem trabalhar em parceria — não em hierarquia.',
  },
];

export default function SobreParaQuem() {
  return (
    <section className='sobre-paraquem section-padding'>
      <div className='sobre-paraquem__inner page-width'>
        {/* marcador lateral */}
        <aside className='sobre-paraquem__side' aria-hidden='true'>
          <div className='sobre-paraquem__side-line' />
          <span className='sobre-paraquem__side-num'>03</span>
        </aside>

        <div className='sobre-paraquem__body'>
          <p className='eyebrow' style={{ marginBottom: '14px' }}>
            Para quem é este trabalho
          </p>
          <h2 className='sobre-paraquem__headline'>
            Escrevo para quem está dentro do processo
          </h2>

          <p className='sobre-paraquem__intro'>
            Não escrevo para quem observa de fora. Escrevo para quem está dentro
            — e que muitas vezes sentem que falta algo além da técnica.
          </p>

          {/* lista de audiências */}
          <ul className='sobre-paraquem__list'>
            {audiencias.map(a => (
              <li key={a.titulo} className='sobre-paraquem__item'>
                <span
                  className='sobre-paraquem__item-marker'
                  aria-hidden='true'
                >
                  —
                </span>
                <div>
                  <strong className='sobre-paraquem__item-titulo'>
                    {a.titulo}
                  </strong>
                  <span className='sobre-paraquem__item-desc'>
                    {' '}
                    {a.descricao}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* frase de encerramento com destaque ocre */}
          <blockquote className='sobre-paraquem__closing'>
            <p className='sobre-paraquem__closing-text'>
              E escrevo porque acredito, de forma muito concreta, que quando o
              adulto passa a ver, a criança deixa de carregar sozinha o peso de
              se adaptar ao mundo.
            </p>
            <footer className='sobre-paraquem__tagline'>
              Desenvolvimento não se resolve. Desenvolvimento se acompanha.
            </footer>
          </blockquote>
        </div>
      </div>

      <style jsx>{`
        .sobre-paraquem {
          background: var(--color-gk-white);
        }

        .sobre-paraquem__inner {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 48px;
        }

        .sobre-paraquem__side {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 6px;
          gap: 12px;
        }

        .sobre-paraquem__side-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(
            to bottom,
            var(--color-gk-green-light),
            transparent
          );
          min-height: 48px;
        }

        .sobre-paraquem__side-num {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gk-green-light);
          writing-mode: vertical-rl;
          text-transform: uppercase;
        }

        .sobre-paraquem__body {
          max-width: 680px;
        }

        .sobre-paraquem__headline {
          color: var(--color-gk-black);
          margin: 0 0 24px;
        }

        .sobre-paraquem__intro {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--color-gk-cinza);
          margin: 0 0 36px;
        }

        /* lista */
        .sobre-paraquem__list {
          list-style: none;
          padding: 0;
          margin: 0 0 44px;
          border-top: 1px solid rgba(26, 92, 42, 0.1);
        }

        .sobre-paraquem__item {
          display: flex;
          gap: 20px;
          align-items: baseline;
          padding: 20px 0;
          border-bottom: 1px solid rgba(26, 92, 42, 0.1);
        }

        .sobre-paraquem__item-marker {
          color: var(--color-gk-ocre);
          font-weight: 700;
          flex-shrink: 0;
        }

        .sobre-paraquem__item-titulo {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-gk-black);
        }

        .sobre-paraquem__item-desc {
          font-size: 0.9375rem;
          color: var(--color-gk-cinza);
          line-height: 1.6;
        }

        /* closing — borda ocre como no mockup */
        .sobre-paraquem__closing {
          background: var(--color-gk-creme);
          border-left: 4px solid var(--color-gk-ocre);
          padding: 28px 32px;
          margin: 0;
        }

        .sobre-paraquem__closing-text {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--color-gk-cinza);
          margin: 0 0 14px;
        }

        .sobre-paraquem__tagline {
          font-family: var(--font-display);
          font-size: 1rem;
          font-style: italic;
          color: var(--color-gk-green-dark);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .sobre-paraquem__inner {
            grid-template-columns: 1fr;
          }
          .sobre-paraquem__side {
            display: none;
          }
          .sobre-paraquem__body {
            max-width: 100%;
          }
          .sobre-paraquem__closing {
            padding: 22px 24px;
          }
        }
      `}</style>
    </section>
  );
}

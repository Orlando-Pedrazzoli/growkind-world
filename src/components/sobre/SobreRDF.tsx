'use client';

const principios = [
  {
    num: '01',
    titulo: 'Regulação antes de instrução.',
    descricao:
      'O corpo precisa de estar organizado antes de qualquer aprendizagem.',
  },
  {
    num: '02',
    titulo: 'Relação antes de correcção.',
    descricao: 'O vínculo é o contexto, não o resultado.',
  },
  {
    num: '03',
    titulo: 'Processo antes de performance.',
    descricao: 'O desenvolvimento acompanha-se — não se resolve.',
  },
];

export default function SobreRDF() {
  return (
    <section className='sobre-rdf section-padding'>
      <div className='sobre-rdf__inner page-width'>
        {/* marcador lateral */}
        <aside className='sobre-rdf__side' aria-hidden='true'>
          <div className='sobre-rdf__side-line' />
          <span className='sobre-rdf__side-num'>02</span>
        </aside>

        <div className='sobre-rdf__body'>
          <p className='eyebrow' style={{ marginBottom: '14px' }}>
            O Relational Development Framework
          </p>
          <h2 className='sobre-rdf__headline'>Uma lente, não um método</h2>

          <div className='sobre-rdf__prose'>
            <p>
              O RDF não nasceu de uma teoria. Nasceu de anos de observação
              directa — do que funcionava, do que não funcionava, e de perceber
              que o problema raramente estava na técnica.
            </p>
            <p>
              A técnica existia. O que faltava era uma forma de ler o que estava
              a acontecer antes de qualquer decisão de resposta.
            </p>
            <p>
              O RDF é isso: uma lente. Uma forma de organizar como o adulto
              observa, lê e se posiciona no campo relacional da criança.
            </p>
          </div>

          {/* Princípios */}
          <div className='sobre-rdf__principios'>
            <p className='sobre-rdf__intro-principios'>
              Assenta em três princípios que atravessam todo o trabalho da
              GrowKind:
            </p>
            <div className='sobre-rdf__grid'>
              {principios.map(p => (
                <div key={p.num} className='sobre-rdf__card'>
                  <span className='sobre-rdf__card-num'>{p.num}</span>
                  <h3 className='sobre-rdf__card-titulo'>{p.titulo}</h3>
                  <p className='sobre-rdf__card-desc'>{p.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sobre-rdf {
          background: var(--color-gk-creme);
        }

        .sobre-rdf__inner {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 48px;
        }

        .sobre-rdf__side {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 6px;
          gap: 12px;
        }

        .sobre-rdf__side-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(
            to bottom,
            var(--color-gk-green-dark),
            transparent
          );
          min-height: 48px;
          opacity: 0.4;
        }

        .sobre-rdf__side-num {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gk-green-dark);
          writing-mode: vertical-rl;
          text-transform: uppercase;
          opacity: 0.5;
        }

        .sobre-rdf__body {
          max-width: 760px;
        }

        .sobre-rdf__headline {
          color: var(--color-gk-black);
          margin: 0 0 32px;
        }

        .sobre-rdf__prose p {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--color-gk-cinza);
          margin: 0 0 18px;
        }

        /* princípios */
        .sobre-rdf__principios {
          margin-top: 44px;
        }

        .sobre-rdf__intro-principios {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-gk-cinza);
          margin: 0 0 28px;
        }

        /* cards com background verde escuro — conforme nota do documento */
        .sobre-rdf__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .sobre-rdf__card {
          background: var(--color-gk-green-dark);
          padding: 32px 26px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: background 0.2s;
        }

        .sobre-rdf__card:hover {
          background: #0f3a19;
        }

        .sobre-rdf__card-num {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gk-green-light);
          text-transform: uppercase;
        }

        .sobre-rdf__card-titulo {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-gk-white);
          line-height: 1.4;
          margin: 0;
        }

        .sobre-rdf__card-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        @media (max-width: 900px) {
          .sobre-rdf__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sobre-rdf__inner {
            grid-template-columns: 1fr;
          }
          .sobre-rdf__side {
            display: none;
          }
          .sobre-rdf__body {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

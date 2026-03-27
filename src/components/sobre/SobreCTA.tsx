'use client';

import Link from 'next/link';

export default function SobreCTA() {
  return (
    <section className='sobre-cta section-padding'>
      <div className='sobre-cta__inner page-width'>
        <div className='sobre-cta__text'>
          <p className='eyebrow sobre-cta__eyebrow'>O trabalho continua aqui</p>
          <h2 className='sobre-cta__headline'>
            Se chegaste aqui,
            <br />
            já tens a pergunta certa.
          </h2>
          <p className='sobre-cta__body'>
            O livro, o RDF e os cursos da GrowKind são extensões do mesmo
            trabalho — adaptados para diferentes contextos e diferentes formas
            de acompanhar.
          </p>
          <p className='sobre-cta__body'>
            O próximo passo é escolher por onde entrar.
          </p>
        </div>

        <div className='sobre-cta__actions'>
          {/* CTA principal — email, destaque ocre conforme globals */}
          <Link href='/#captura' className='sobre-cta__email-btn'>
            Entrar na lista — receber em primeira mão
            <span aria-hidden='true'> →</span>
          </Link>
          <p className='sobre-cta__email-note'>
            Acesso antecipado ao livro e aos recursos GrowKind.
          </p>

          {/* CTAs secundários — usa classes btn-ghost do globals.css */}
          <div className='sobre-cta__secondary'>
            <Link href='/o-livro' className='btn-ghost'>
              Descobrir o livro
            </Link>
            <Link href='/rdf' className='btn-ghost'>
              Conhecer o RDF
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sobre-cta {
          background: #0d1f13;
          position: relative;
          overflow: hidden;
        }

        /* marca d'água tipográfica */
        .sobre-cta::after {
          content: 'GK';
          position: absolute;
          bottom: -40px;
          right: -10px;
          font-family: var(--font-display);
          font-size: 16rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .sobre-cta__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* ---- texto ---- */
        .sobre-cta__eyebrow {
          color: var(--color-gk-green-light) !important;
          margin-bottom: 14px;
        }

        .sobre-cta__headline {
          color: var(--color-gk-white);
          margin: 0 0 24px;
        }

        .sobre-cta__body {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 14px;
        }

        /* ---- acções ---- */
        .sobre-cta__actions {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 8px;
        }

        /* botão email — destaque ocre, padrão do projecto */
        .sobre-cta__email-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: var(--color-gk-ocre);
          color: var(--color-gk-white);
          padding: 20px 28px;
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition:
            background 0.25s,
            transform 0.2s;
          margin-bottom: 10px;
        }

        .sobre-cta__email-btn:hover {
          background: #a86b2e;
          color: var(--color-gk-white);
          transform: translateY(-2px);
        }

        .sobre-cta__email-note {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.35);
          margin: 0 0 28px;
          text-align: center;
        }

        /* btn-ghost sobrescrito para fundo escuro */
        .sobre-cta__secondary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .sobre-cta__secondary :global(.btn-ghost) {
          border-color: rgba(255, 255, 255, 0.25);
          color: rgba(255, 255, 255, 0.75);
          text-align: center;
        }

        .sobre-cta__secondary :global(.btn-ghost:hover) {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-gk-green-light);
          color: var(--color-gk-green-light);
        }

        @media (max-width: 900px) {
          .sobre-cta__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 540px) {
          .sobre-cta__secondary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

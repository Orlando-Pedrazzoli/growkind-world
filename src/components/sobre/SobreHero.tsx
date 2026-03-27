'use client';

import Image from 'next/image';

export default function SobreHero() {
  return (
    <section className='sobre-hero'>
      <div className='sobre-hero__inner page-width'>
        {/* Coluna imagem */}
        <div className='sobre-hero__image-col'>
          <div className='sobre-hero__image-wrapper'>
            <Image
              src='/images/joao-profile.jpeg'
              alt='João Pereira — Educador e terapeuta educacional'
              fill
              sizes='(max-width: 768px) 280px, 400px'
              className='sobre-hero__photo'
              priority
            />
            <span className='sobre-hero__image-border' aria-hidden='true' />
          </div>
          <div className='sobre-hero__badge'>
            <span className='sobre-hero__badge-number'>30+</span>
            <span className='sobre-hero__badge-label'>
              anos de trabalho
              <br />
              com crianças autistas
            </span>
          </div>
        </div>

        {/* Coluna texto */}
        <div className='sobre-hero__text-col'>
          <p className='eyebrow sobre-hero__eyebrow'>Sobre o autor</p>
          <h1 className='sobre-hero__name'>João Pereira</h1>
          <p className='sobre-hero__role'>
            Educador, terapeuta e fundador da GrowKind World.
          </p>
          <p className='sobre-hero__subtitle'>
            Três décadas de trabalho com crianças autistas, famílias e
            educadores — em Portugal, no Brasil e no Reino Unido. Uma pergunta
            constante: como é que os adultos podem acompanhar melhor o que está
            acontecendo?
          </p>
          <div className='sobre-hero__tags'>
            {['Portugal', 'Brasil', 'Reino Unido'].map(pais => (
              <span key={pais} className='sobre-hero__tag'>
                {pais}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sobre-hero {
          background-color: var(--color-gk-green-dark);
          /* cancelar o pt-20/pt-24 do layout para o hero encostar no topo */
          margin-top: calc(-5rem); /* -mt-20 mobile */
          padding-top: calc(5rem + 80px); /* compensa o header + respiro */
          padding-bottom: 96px;
          overflow: hidden;
          position: relative;
        }

        /* compensa pt-24 em desktop */
        @media (min-width: 768px) {
          .sobre-hero {
            margin-top: calc(-6rem); /* -mt-24 */
            padding-top: calc(6rem + 80px);
          }
        }

        .sobre-hero__inner {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ---- imagem ---- */
        .sobre-hero__image-col {
          position: relative;
        }

        .sobre-hero__image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }

        .sobre-hero__photo {
          object-fit: cover;
          object-position: center top;
        }

        .sobre-hero__image-border {
          position: absolute;
          inset: 0;
          border: 2px solid var(--color-gk-green-light);
          pointer-events: none;
          transform: translate(12px, 12px);
          z-index: -1;
          opacity: 0.5;
        }

        .sobre-hero__badge {
          position: absolute;
          bottom: -16px;
          right: -16px;
          background: var(--color-gk-ocre);
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sobre-hero__badge-number {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          color: var(--color-gk-white);
        }

        .sobre-hero__badge-label {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
        }

        /* ---- texto ---- */
        .sobre-hero__eyebrow {
          color: var(--color-gk-green-light) !important;
          margin-bottom: 14px;
        }

        .sobre-hero__name {
          color: var(--color-gk-white);
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }

        .sobre-hero__role {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-style: italic;
          color: var(--color-gk-green-light);
          margin: 0 0 22px;
        }

        .sobre-hero__subtitle {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
          margin: 0 0 32px;
          max-width: 520px;
        }

        .sobre-hero__tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .sobre-hero__tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gk-green-light);
          border: 1.5px solid var(--color-gk-green-light);
          padding: 5px 14px;
          border-radius: 100px;
          opacity: 0.8;
        }

        @media (max-width: 900px) {
          .sobre-hero__inner {
            grid-template-columns: 1fr;
            gap: 48px;
            max-width: 540px;
          }
          .sobre-hero__image-wrapper {
            max-width: 280px;
            margin: 0 auto;
          }
          .sobre-hero__badge {
            right: -8px;
            bottom: -10px;
          }
          .sobre-hero__name,
          .sobre-hero__role,
          .sobre-hero__subtitle {
            text-align: center;
          }
          .sobre-hero__subtitle {
            max-width: 100%;
          }
          .sobre-hero__tags {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

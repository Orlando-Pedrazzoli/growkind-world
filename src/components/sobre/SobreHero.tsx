'use client';

import Image from 'next/image';

export default function SobreHero() {
  return (
    <section className='sobre-hero'>
      <div className='sobre-hero__inner page-width'>
        {/* Imagem de perfil redonda */}
        <div className='sobre-hero__image-col'>
          <div className='sobre-hero__image-wrapper'>
            <Image
              src='/images/joao-profile.jpeg'
              alt='João Pereira — Educador e terapeuta educacional'
              fill
              sizes='(max-width: 768px) 180px, 220px'
              className='sobre-hero__photo'
              priority
            />
          </div>
        </div>

        {/* Texto centrado */}
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
          background-color: #0d1f13;
          margin-top: calc(-5rem);
          padding-top: calc(5rem + 80px);
          padding-bottom: 96px;
          overflow: hidden;
          position: relative;
        }

        @media (min-width: 768px) {
          .sobre-hero {
            margin-top: calc(-6rem);
            padding-top: calc(6rem + 80px);
          }
        }

        .sobre-hero__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 40px;
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin-inline: auto;
        }

        /* ---- imagem redonda estilo profile ---- */
        .sobre-hero__image-col {
          position: relative;
        }

        .sobre-hero__image-wrapper {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--color-gk-green-light);
          box-shadow: 0 0 0 8px rgba(200, 220, 192, 0.12);
        }

        .sobre-hero__image-wrapper :global(.sobre-hero__photo) {
          object-fit: cover;
          object-position: center top;
        }

        /* ---- texto ---- */
        .sobre-hero__text-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 680px;
        }

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
          max-width: 600px;
        }

        .sobre-hero__tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
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

        @media (max-width: 768px) {
          .sobre-hero__image-wrapper {
            width: 180px;
            height: 180px;
          }
          .sobre-hero__inner {
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}

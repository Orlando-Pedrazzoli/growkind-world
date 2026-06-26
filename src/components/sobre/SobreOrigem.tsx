'use client';

import { useTranslations } from 'next-intl';

export default function SobreOrigem() {
  const t = useTranslations('about.origin');
  const prose1 = t.raw('prose1') as string[];
  const prose2 = t.raw('prose2') as string[];

  return (
    <section className='sobre-origem section-padding'>
      <div className='sobre-origem__inner page-width'>
        {/* marcador lateral */}
        <aside className='sobre-origem__side' aria-hidden='true'>
          <div className='sobre-origem__side-line' />
          <span className='sobre-origem__side-num'>01</span>
        </aside>

        <div className='sobre-origem__body'>
          <p className='eyebrow' style={{ marginBottom: '14px' }}>
            {t('eyebrow')}
          </p>
          <h2 className='sobre-origem__headline'>{t('headline')}</h2>

          <div className='sobre-origem__prose'>
            {prose1.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className='sobre-origem__quote'>
            <span className='sobre-origem__quote-mark' aria-hidden='true'>
              &ldquo;
            </span>
            {t.rich('quote', {
              br: () => <br />,
            })}
          </blockquote>

          <div className='sobre-origem__prose'>
            {prose2.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              {t('prose3Lead')}
              <strong className='sobre-origem__emphasis'>
                {' '}
                {t('prose3Emphasis')}
              </strong>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sobre-origem {
          background: var(--color-gk-white);
        }

        .sobre-origem__inner {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 48px;
        }

        /* marcador lateral */
        .sobre-origem__side {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 6px;
          gap: 12px;
        }

        .sobre-origem__side-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(
            to bottom,
            var(--color-gk-green-light),
            transparent
          );
          min-height: 48px;
        }

        .sobre-origem__side-num {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gk-green-light);
          writing-mode: vertical-rl;
          text-transform: uppercase;
        }

        .sobre-origem__body {
          max-width: 680px;
        }

        .sobre-origem__headline {
          color: var(--color-gk-black);
          margin: 0 0 32px;
        }

        .sobre-origem__prose p {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--color-gk-cinza);
          margin: 0 0 18px;
        }

        .sobre-origem__emphasis {
          color: var(--color-gk-green-dark);
          font-style: italic;
        }

        /* pullquote alinhado com identidade editorial */
        .sobre-origem__quote {
          position: relative;
          background: var(--color-gk-creme);
          border-left: 4px solid var(--color-gk-green-dark);
          padding: 28px 32px 28px 44px;
          margin: 36px 0;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.65;
          color: var(--color-gk-green-dark);
        }

        .sobre-origem__quote-mark {
          position: absolute;
          top: 8px;
          left: 12px;
          font-size: 3rem;
          line-height: 1;
          color: var(--color-gk-green-light);
          font-family: var(--font-display);
        }

        @media (max-width: 768px) {
          .sobre-origem__inner {
            grid-template-columns: 1fr;
          }
          .sobre-origem__side {
            display: none;
          }
          .sobre-origem__body {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

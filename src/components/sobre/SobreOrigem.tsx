'use client';

export default function SobreOrigem() {
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
            De onde vem este trabalho
          </p>
          <h2 className='sobre-origem__headline'>
            Uma pergunta que nunca saiu do caminho
          </h2>

          <div className='sobre-origem__prose'>
            <p>
              Trabalhei em contextos muito diferentes ao longo da vida. Mudei de
              país, de língua, de sistema educacional.
            </p>
            <p>
              Trabalhei em escolas públicas e privadas. Com famílias com muitos
              recursos e com famílias sem nenhum. Em equipas multidisciplinares
              muito bem coordenadas — e em outras onde cada profissional
              trabalhava como se a criança fosse apenas sua.
            </p>
            <p>
              Mas havia algo que se repetia em todos esses contextos,
              independentemente do país ou do nível socioeconómico:
            </p>
          </div>

          <blockquote className='sobre-origem__quote'>
            <span className='sobre-origem__quote-mark' aria-hidden='true'>
              &ldquo;
            </span>
            O silêncio que se instala quando um diagnóstico chega —<br />e
            ninguém sabe, verdadeiramente, o que fazer com ele.
          </blockquote>

          <div className='sobre-origem__prose'>
            <p>
              Vi pais confusos diante de relatórios que não conversavam entre
              si. Vi professores sobrecarregados a tentar aplicar estratégias
              desconectadas da realidade da sala de aula. Vi profissionais
              competentes, mas fragmentados — cada um a olhar para uma parte da
              criança, raramente para o todo.
            </p>
            <p>
              E vi, principalmente, crianças a tentar existir no meio de tudo
              isso.
            </p>
            <p>
              Foi esta observação repetida que me levou a perceber que o maior
              abismo não estava entre a criança e o mundo — estava entre a
              experiência vivida e a linguagem usada para a explicar.
              <strong className='sobre-origem__emphasis'>
                {' '}
                Faltava tradução.
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

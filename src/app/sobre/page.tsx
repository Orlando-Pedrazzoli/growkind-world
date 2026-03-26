import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre João Pereira',
  description:
    'Educador, autor e fundador do GrowKind World. Mais de 20 anos dedicados à infância neurodivergente.',
};

export default function SobrePage() {
  return (
    <>
      <section className='section-padding'>
        <div className='content-width'>
          <h1 className='text-[var(--color-gk-green-dark)]'>
            Sobre João Pereira
          </h1>
          <p className='mt-4 text-lg text-[var(--color-gk-black)]/70'>
            Educador, terapeuta e fundador da GrowKind World.
          </p>
        </div>
      </section>

      <section className='section-padding bg-[var(--color-gk-creme)]'>
        <div className='content-width'>
          <h2 className='text-[var(--color-gk-green-dark)]'>Percurso</h2>
          <div className='mt-8 space-y-6 text-base leading-relaxed text-[var(--color-gk-black)]/80 md:text-lg'>
            <p>
              João Pereira trabalha há cerca de três décadas com educação
              especial e inclusiva — como professor e terapeuta educacional,
              acompanhando crianças autistas, famílias e educadores.
            </p>
            <p>
              Atuou em contextos muito diferentes: Brasil, Reino Unido e
              Portugal. A língua mudava. O sistema educacional mudava. As
              políticas públicas mudavam.
            </p>
            <p>
              O que nunca mudou foi o silêncio que se forma quando um
              diagnóstico chega — e ninguém sabe, de facto, o que fazer com ele.
            </p>
          </div>
          <p className='mt-8 text-center text-sm text-[var(--color-gk-black)]/40'>
            Conteudo completo em preparacao — Sprint 2
          </p>
        </div>
      </section>
    </>
  );
}

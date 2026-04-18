// src/components/legal/LegalPageLayout.tsx

import Link from 'next/link';
import type { LegalPolicy } from '@/lib/data/legal';

interface LegalPageLayoutProps {
  policy: LegalPolicy;
}

// Tom ocre escuro do hero. Contraste 4.42:1 com branco (WCAG AA para texto
// grande/UI). Preserva a identidade terrosa da paleta GrowKind.
const HERO_BG = '#9C6F3C';

export default function LegalPageLayout({ policy }: LegalPageLayoutProps) {
  return (
    <article>
      {/* =================================================================== */}
      {/* HERO OCRE ESCURO — estende-se para trás da navbar (margem negativa  */}
      {/* compensa o pt-20/md:pt-24 que o layout.tsx aplica ao <main>). Assim */}
      {/* a navbar transparente fica sempre sobre o fundo ocre, e os links    */}
      {/* brancos permanecem legíveis.                                        */}
      {/* =================================================================== */}
      <header
        className='relative -mt-20 overflow-hidden px-6 pt-40 pb-20 md:-mt-24 md:px-[60px] md:pt-48 md:pb-24'
        style={{ backgroundColor: HERO_BG }}
      >
        {/* Textura sutil — tons quentes do mesmo ocre */}
        <div
          aria-hidden='true'
          className='absolute inset-0 opacity-[0.08]'
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #F5D89B 0%, transparent 55%), radial-gradient(circle at 80% 70%, #FFD285 0%, transparent 55%)',
          }}
        />

        <div className='relative z-10 mx-auto max-w-4xl'>
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: '#F5D89B' }}
          >
            GrowKind World
          </p>

          <h1
            className='mb-5 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.1] md:text-5xl lg:text-6xl'
            style={{ color: '#ffffff' }}
          >
            {policy.title}
          </h1>

          <p
            className='max-w-2xl text-lg leading-relaxed md:text-xl'
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {policy.subtitle}
          </p>

          <p
            className='mt-6 text-[12px] uppercase tracking-wider'
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Última actualização: {policy.lastUpdated}
          </p>
        </div>
      </header>

      {/* ============== */}
      {/* CORPO DO TEXTO */}
      {/* ============== */}
      <div className='section-padding'>
        <div className='content-width'>
          {/* Sumário */}
          <nav
            aria-label='Sumário'
            className='mb-14 rounded-2xl border p-6 md:p-8'
            style={{
              backgroundColor: 'rgba(232, 148, 58, 0.04)',
              borderColor: 'rgba(232, 148, 58, 0.15)',
            }}
          >
            <h2
              className='mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]'
              style={{ color: 'var(--color-gk-green-dark)' }}
            >
              Neste documento
            </h2>
            <ol className='space-y-2'>
              {policy.sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='text-[15px] leading-relaxed transition-colors duration-200 hover:underline'
                    style={{ color: 'rgba(0,0,0,0.75)' }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Introdução */}
          <div className='mb-14 space-y-5 text-[17px] leading-[1.75] md:text-[18px]'>
            {policy.intro.map((paragraph, idx) => (
              <p key={idx} style={{ color: 'rgba(0,0,0,0.78)' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Secções */}
          <div className='space-y-14'>
            {policy.sections.map(section => (
              <section
                key={section.id}
                id={section.id}
                className='scroll-mt-28'
              >
                <h2
                  className='mb-5 font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl'
                  style={{ color: 'var(--color-gk-green-dark)' }}
                >
                  {section.title}
                </h2>

                <div className='space-y-4 text-[16px] leading-[1.75] md:text-[17px]'>
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx} style={{ color: 'rgba(0,0,0,0.72)' }}>
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className='mt-4 space-y-3 pl-0'>
                      {section.list.map((item, idx) => (
                        <li
                          key={idx}
                          className='relative flex gap-3 pl-1'
                          style={{ color: 'rgba(0,0,0,0.72)' }}
                        >
                          <span
                            className='mt-[0.6em] h-[5px] w-[5px] flex-shrink-0 rounded-full'
                            style={{
                              backgroundColor: 'var(--color-gk-ocre)',
                            }}
                          />
                          <span className='flex-1'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Rodapé — ver outras políticas */}
          <footer
            className='mt-20 border-t pt-10'
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            <h3
              className='mb-5 text-[11px] font-semibold uppercase tracking-[0.14em]'
              style={{ color: 'var(--color-gk-green-dark)' }}
            >
              Ver também
            </h3>
            <div className='flex flex-wrap gap-3'>
              {[
                { slug: 'privacidade', label: 'Privacidade' },
                { slug: 'termos', label: 'Termos' },
                { slug: 'cookies', label: 'Cookies' },
                { slug: 'devolucoes', label: 'Devoluções' },
              ]
                .filter(item => item.slug !== policy.slug)
                .map(item => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className='inline-flex items-center rounded-full border px-5 py-2 text-[13px] font-medium transition-all duration-200 hover:shadow-sm'
                    style={{
                      borderColor: 'rgba(0,0,0,0.12)',
                      color: 'var(--color-gk-green-dark)',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

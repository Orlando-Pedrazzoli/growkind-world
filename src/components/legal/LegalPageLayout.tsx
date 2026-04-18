// src/components/legal/LegalPageLayout.tsx

import Link from 'next/link';
import type { LegalPolicy } from '@/lib/data/legal';

interface LegalPageLayoutProps {
  policy: LegalPolicy;
}

export default function LegalPageLayout({ policy }: LegalPageLayoutProps) {
  return (
    <article className='section-padding'>
      <div className='content-width'>
        {/* Hero */}
        <header className='mb-12 md:mb-16'>
          <p
            className='mb-4 text-[11px] font-medium uppercase tracking-[0.16em]'
            style={{ color: 'var(--color-gk-ocre)' }}
          >
            GrowKind World
          </p>
          <h1
            className='mb-5 font-[family-name:var(--font-display)] text-4xl leading-[1.1] md:text-5xl lg:text-6xl'
            style={{ color: 'var(--color-gk-green-dark)' }}
          >
            {policy.title}
          </h1>
          <p
            className='max-w-2xl text-lg leading-relaxed md:text-xl'
            style={{ color: 'rgba(0,0,0,0.65)' }}
          >
            {policy.subtitle}
          </p>
          <p
            className='mt-6 text-[12px] uppercase tracking-wider'
            style={{ color: 'rgba(0,0,0,0.45)' }}
          >
            Última actualização: {policy.lastUpdated}
          </p>
        </header>

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
            <section key={section.id} id={section.id} className='scroll-mt-28'>
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

        {/* Rodapé das páginas legais — ver outras políticas */}
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
    </article>
  );
}

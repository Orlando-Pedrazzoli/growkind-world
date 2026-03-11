'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const legalLinks = [
  { key: 'privacidade', href: '/privacidade' },
  { key: 'termos', href: '/termos' },
  { key: 'cookies', href: '/cookies' },
  { key: 'devolucoes', href: '/devolucoes' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const ano = new Date().getFullYear();

  return (
    <footer className='bg-[var(--color-gk-black)]' style={{ padding: '60px' }}>
      {/* Linha principal — logo + info */}
      <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
        <p className='font-[family-name:var(--font-display)] text-base text-white/60'>
          GrowKind World
        </p>
        <p className='text-xs tracking-wider text-white/30'>
          @growkindworld · growkindworld.com · © {ano}
        </p>
      </div>

      {/* Links legais — subtil, abaixo */}
      <div className='mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6'>
        <nav
          className='flex flex-wrap gap-x-6 gap-y-2'
          aria-label='Links legais'
        >
          {legalLinks.map(link => (
            <Link
              key={link.key}
              href={link.href}
              className='text-[11px] font-medium uppercase tracking-wider text-white/30 transition-colors hover:text-white/60'
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <p className='ml-auto text-[11px] text-white/20'>{t('direitos')}</p>
      </div>
    </footer>
  );
}

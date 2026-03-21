'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const legalLinks = [
  { key: 'privacidade', href: '/privacidade' },
  { key: 'termos', href: '/termos' },
  { key: 'cookies', href: '/cookies' },
  { key: 'devolucoes', href: '/devolucoes' },
] as const;

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/growkindworld',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/growkindworld',
    icon: Facebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/growkindworld',
    icon: Linkedin,
  },
];

export default function Footer() {
  const t = useTranslations('footer');
  const ano = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: 'var(--color-gk-ocre)', padding: '60px' }}
    >
      {/* Linha principal — logo + redes sociais */}
      <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
        {/* Logo + Nome */}
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/images/logo-growkind.jpg'
            alt='GrowKind World Logo'
            width={40}
            height={40}
            className='rounded-full'
          />
          <span
            className='font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight'
            style={{ color: '#ffffff' }}
          >
            GrowKind
            <span
              className='font-light'
              style={{ color: 'var(--color-gk-green-dark)' }}
            >
              {' '}
              World
            </span>
          </span>
        </Link>

        {/* Redes sociais */}
        <div className='flex items-center gap-5'>
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={social.label}
              className='transition-opacity duration-300 hover:opacity-100'
              style={{ color: 'var(--color-gk-green-dark)', opacity: 0.7 }}
            >
              <social.icon size={22} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className='mt-6'>
        <p
          className='text-xs tracking-wider'
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          @growkindworld · growkindworld.com · © {ano}
        </p>
      </div>

      {/* Links legais */}
      <div
        className='mt-8 flex flex-wrap items-end gap-x-6 gap-y-2 border-t pt-6'
        style={{ borderColor: 'rgba(255,255,255,0.25)' }}
      >
        <nav
          className='flex flex-wrap gap-x-6 gap-y-2'
          aria-label='Links legais'
        >
          {legalLinks.map(link => (
            <Link
              key={link.key}
              href={link.href}
              className='text-[12px] font-medium uppercase tracking-wider transition-opacity duration-300 hover:opacity-100'
              style={{ color: 'var(--color-gk-green-dark)', opacity: 0.7 }}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <p
          className='ml-auto text-[11px]'
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {t('direitos')}
        </p>
      </div>

      {/* Credito desenvolvimento */}
      <div className='mt-6 text-center'>
        <p
          className='text-[11px] tracking-wide'
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Desenvolvido por{' '}
          <a
            href='https://pedrazzolidigital.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline transition-opacity duration-300 hover:opacity-100'
            style={{ color: '#ffffff', opacity: 0.7 }}
          >
            Pedrazzoli Digital
          </a>
        </p>
      </div>
    </footer>
  );
}

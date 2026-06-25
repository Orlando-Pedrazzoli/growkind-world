// src/components/layout/Header.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
// 👇 Link e usePathname vêm AGORA do i18n (aplicam o prefixo /en automaticamente).
import { Link, usePathname } from '@/i18n/navigation';
import UserMenu from '@/components/auth/UserMenu';
import LanguageToggle from './LanguageToggle';

// href fixo + chave de tradução (o texto deixa de estar hardcoded).
const navItems = [
  { key: 'home', href: '/' },
  { key: 'book', href: '/o-livro' },
  { key: 'rdf', href: '/rdf' },
  { key: 'courses', href: '/cursos' },
  { key: 'about', href: '/sobre' },
] as const;

/**
 * Rotas com fundo branco/claro no topo ("páginas de aplicação").
 * NOTA: o usePathname do i18n devolve o caminho SEM o prefixo de locale,
 * por isso estas comparações funcionam igual em PT e em /en.
 */
const APP_ROUTE_PREFIXES = ['/login', '/registar', '/a-minha-conta', '/admin'];
// 👇 /admin tem o seu próprio layout (sidebar) — esconde a navbar pública.
const HIDE_HEADER_PREFIXES = [
  '/livro/preview',
  '/a-minha-conta/livro',
  '/admin',
];

function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTE_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function shouldHideHeader(pathname: string | null): boolean {
  if (!pathname) return false;
  return HIDE_HEADER_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function MobileAccountLinks({ onNavigate }: { onNavigate: () => void }) {
  const { data: session, status } = useSession();
  const t = useTranslations('nav');

  if (status === 'loading') return null;

  if (!session) {
    return (
      <>
        <Link
          href='/login'
          onClick={onNavigate}
          className='flex cursor-pointer items-center gap-3 border-b border-[var(--color-gk-green-dark)]/5 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-[var(--color-gk-green-dark)]'
        >
          <User size={18} strokeWidth={1.8} />
          {t('login')}
        </Link>
        <Link
          href='/registar'
          onClick={onNavigate}
          className='flex cursor-pointer items-center gap-3 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-[var(--color-gk-green-dark)]'
        >
          {t('register')}
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href='/a-minha-conta'
        onClick={onNavigate}
        className='flex cursor-pointer items-center gap-3 border-b border-[var(--color-gk-green-dark)]/5 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-[var(--color-gk-green-dark)]'
      >
        <User size={18} strokeWidth={1.8} />
        {t('account')}
      </Link>
      <button
        onClick={() => {
          onNavigate();
          signOut({ callbackUrl: '/' });
        }}
        className='flex w-full cursor-pointer items-center gap-3 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-red-600'
      >
        <LogOut size={18} strokeWidth={1.8} />
        {t('logout')}
      </button>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hidden = useMemo(() => shouldHideHeader(pathname), [pathname]);
  const forcedOpaque = useMemo(() => isAppRoute(pathname), [pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (hidden) return null;

  const isTransparent = !forcedOpaque && !scrolled && !menuAberto;

  return (
    <header
      style={{
        backgroundColor: isTransparent
          ? 'transparent'
          : 'rgba(255,255,255,0.85)',
        borderBottom: isTransparent ? 'none' : '1px solid rgba(26,92,42,0.08)',
        backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: isTransparent ? 'none' : 'blur(12px)',
      }}
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-500'
    >
      <div
        style={{ padding: '20px 24px' }}
        className='flex items-center justify-between md:px-[60px]'
      >
        {/* Logo + Nome (esquerda) */}
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/images/logo-growkind3.png'
            alt='GrowKind World Logo'
            width={58}
            height={58}
            className='rounded-full'
          />
          <span
            style={{
              color: isTransparent ? '#FFFFFF' : '#1A5C2A',
              textShadow: isTransparent ? '0 1px 4px rgba(0,0,0,0.6)' : 'none',
            }}
            className='font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight transition-all duration-500'
          >
            GrowKind
            <span
              style={{
                color: isTransparent ? 'rgba(255,255,255,0.9)' : '#e8943a',
              }}
              className='font-light transition-all duration-500'
            >
              {' '}
              World
            </span>
          </span>
        </Link>

        {/* Navegação desktop (centro) */}
        <nav
          className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex lg:gap-12'
          aria-label='Navegação principal'
        >
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: isTransparent ? '#FFFFFF' : 'rgba(30,30,30,0.75)',
                textShadow: isTransparent
                  ? '0 1px 4px rgba(0,0,0,0.6)'
                  : 'none',
                fontSize: '14px',
                letterSpacing: '0.08em',
              }}
              className='cursor-pointer font-normal uppercase transition-all duration-500 hover:opacity-70'
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Direita: toggle de idioma + UserMenu (desktop) + hamburger (mobile) */}
        <div className='flex items-center gap-4'>
          {/* Toggle de idioma — desktop */}
          <div className='hidden md:block'>
            <LanguageToggle variant={isTransparent ? 'onDark' : 'onLight'} />
          </div>

          {/* UserMenu desktop */}
          <div className='hidden md:block'>
            <UserMenu
              iconColor={isTransparent ? '#FFFFFF' : '#1A5C2A'}
              iconFilter={
                isTransparent
                  ? 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))'
                  : 'none'
              }
            />
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className='flex flex-col items-center justify-center gap-1.5 p-2 md:hidden'
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={
                  menuAberto
                    ? i === 0
                      ? { rotate: 45, y: 6 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  backgroundColor: isTransparent ? '#FFFFFF' : '#1A5C2A',
                }}
                className='block h-0.5 w-6 transition-colors duration-500'
              />
            ))}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='overflow-hidden border-t border-[var(--color-gk-green-dark)]/8 bg-white md:hidden'
            aria-label='Navegação mobile'
          >
            <div
              className='flex flex-col gap-0 py-4'
              style={{ padding: '16px 24px' }}
            >
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className='cursor-pointer border-b border-[var(--color-gk-green-dark)]/5 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-[var(--color-gk-green-dark)]'
                >
                  {t(item.key)}
                </Link>
              ))}

              <MobileAccountLinks onNavigate={() => setMenuAberto(false)} />

              {/* Toggle de idioma — mobile (fundo branco => onLight) */}
              <div className='pt-5'>
                <LanguageToggle variant='onLight' />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

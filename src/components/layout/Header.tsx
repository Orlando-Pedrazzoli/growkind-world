'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'livro', href: '/o-livro' },
  { key: 'rdf', href: '/rdf' },
  { key: 'loja', href: '/loja' },
  { key: 'blog', href: '/blog' },
  { key: 'sobre', href: '/sobre' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !scrolled && !menuAberto;

  return (
    <header
      style={{
        backgroundColor: isTransparent
          ? 'transparent'
          : 'rgba(255,255,255,0.97)',
        borderBottom: isTransparent
          ? 'none'
          : '1px solid rgba(200,220,192,0.3)',
        backdropFilter: isTransparent ? 'none' : 'blur(8px)',
      }}
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-500'
    >
      <div className='page-width flex h-20 items-center justify-between md:h-24'>
        {/* Logo */}
        <Link
          href='/'
          style={{
            color: isTransparent ? '#FFFFFF' : '#1A5C2A',
            textShadow: isTransparent ? '0 1px 4px rgba(0,0,0,0.6)' : 'none',
          }}
          className='font-[family-name:var(--font-display)] text-xl font-bold tracking-tight transition-all duration-500 md:text-2xl'
        >
          GrowKind
          <span
            style={{
              color: isTransparent ? 'rgba(255,255,255,0.9)' : '#C17F3A',
            }}
            className='font-light transition-all duration-500'
          >
            {' '}
            World
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav
          className='hidden items-center gap-10 md:flex'
          aria-label='Navegação principal'
        >
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              style={{
                color: isTransparent ? '#FFFFFF' : 'rgba(30,30,30,0.7)',
                textShadow: isTransparent
                  ? '0 1px 4px rgba(0,0,0,0.6)'
                  : 'none',
              }}
              className='text-[15px] font-medium transition-all duration-500 hover:opacity-80'
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

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

      {/* Menu mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='overflow-hidden border-t border-[var(--color-gk-green-light)]/30 bg-white md:hidden'
            aria-label='Navegação mobile'
          >
            <div className='page-width flex flex-col gap-1 py-4'>
              {navItems.map(item => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className='rounded-lg px-4 py-3 text-base font-medium text-[var(--color-gk-black)]/70 transition-colors duration-200 hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuAberto
          ? 'border-b border-[var(--color-gk-green-light)]/30 bg-[var(--color-gk-white)]/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="page-width flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-lg font-bold tracking-tight transition-all duration-500 md:text-xl ${
            scrolled || menuAberto
              ? 'text-[var(--color-gk-green-dark)]'
              : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
          }`}
        >
          GrowKind
          <span
            className={`font-light transition-colors duration-500 ${
              scrolled || menuAberto
                ? 'text-[var(--color-gk-ocre)]'
                : 'text-white/90'
            }`}
          >
            {' '}
            World
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative text-sm font-medium transition-colors duration-500 ${
                scrolled
                  ? 'text-[var(--color-gk-black)]/70 hover:text-[var(--color-gk-green-dark)]'
                  : 'text-white hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Botão menu mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          <motion.span
            animate={menuAberto ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className={`block h-0.5 w-6 transition-colors duration-500 ${
              scrolled || menuAberto
                ? 'bg-[var(--color-gk-green-dark)]'
                : 'bg-white'
            }`}
          />
          <motion.span
            animate={menuAberto ? { opacity: 0 } : { opacity: 1 }}
            className={`block h-0.5 w-6 transition-colors duration-500 ${
              scrolled || menuAberto
                ? 'bg-[var(--color-gk-green-dark)]'
                : 'bg-white'
            }`}
          />
          <motion.span
            animate={
              menuAberto ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className={`block h-0.5 w-6 transition-colors duration-500 ${
              scrolled || menuAberto
                ? 'bg-[var(--color-gk-green-dark)]'
                : 'bg-white'
            }`}
          />
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
            className="overflow-hidden border-t border-[var(--color-gk-green-light)]/30 bg-[var(--color-gk-white)] md:hidden"
            aria-label="Navegação mobile"
          >
            <div className="page-width flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-[var(--color-gk-black)]/70 transition-colors duration-200 hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]"
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
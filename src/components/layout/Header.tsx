'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

const navItems = [
  { label: 'O PROJECTO', href: '#onde-comeca' },
  { label: 'O LIVRO', href: '#livro' },
  { label: 'RDF', href: '#rdf' },
];

export default function Header() {
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuAberto(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        backgroundColor: isTransparent
          ? 'transparent'
          : 'rgba(255,255,255,0.4)',
        borderBottom: isTransparent ? 'none' : '1px solid rgba(26,92,42,0.08)',
        backdropFilter: isTransparent ? 'none' : 'blur(8px)',
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
            src='/images/logo-growkind.jpg'
            alt='GrowKind World Logo'
            width={48}
            height={48}
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
                color: isTransparent ? 'rgba(255,255,255,0.9)' : '#C17F3A',
              }}
              className='font-light transition-all duration-500'
            >
              {' '}
              World
            </span>
          </span>
        </Link>

        {/* Navegacao desktop (centro) */}
        <nav
          className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 md:flex'
          aria-label='Navegação principal'
        >
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={e => handleNavClick(e, item.href)}
              style={{
                color: isTransparent ? '#FFFFFF' : 'rgba(30,30,30,0.65)',
                textShadow: isTransparent
                  ? '0 1px 4px rgba(0,0,0,0.6)'
                  : 'none',
                fontSize: '14px',
                letterSpacing: '0.08em',
              }}
              className='cursor-pointer font-normal uppercase transition-all duration-500 hover:opacity-100'
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Icone user (direita) + Hamburger mobile */}
        <div className='flex items-center gap-4'>
          {/* Icone user — visivel sempre */}
          <button
            aria-label='Conta de utilizador'
            className='cursor-pointer p-1'
          >
            <User
              size={22}
              style={{
                color: isTransparent ? '#FFFFFF' : '#1A5C2A',
                filter: isTransparent
                  ? 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))'
                  : 'none',
              }}
              className='transition-all duration-500'
              strokeWidth={1.8}
            />
          </button>

          {/* Botao menu mobile */}
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  className='cursor-pointer border-b border-[var(--color-gk-green-dark)]/5 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 last:border-b-0 hover:text-[var(--color-gk-green-dark)]'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

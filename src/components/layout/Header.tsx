// src/components/layout/Header.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import UserMenu from '@/components/auth/UserMenu';

const navItems = [
  { label: 'O PROJECTO', href: '/' },
  { label: 'O LIVRO', href: '/o-livro' },
  { label: 'RDF', href: '/rdf' },
  { label: 'CURSOS', href: '/cursos' },
  { label: 'O AUTOR', href: '/sobre' },
];

/**
 * Rotas com fundo branco/claro no topo ("páginas de aplicação").
 * Nestas rotas, a navbar deve estar SEMPRE opaca com links escuros,
 * independentemente do scroll — o modo transparente é reservado a páginas
 * com hero escuro a full-width no topo.
 */
const APP_ROUTE_PREFIXES = ['/login', '/registar', '/a-minha-conta', '/admin'];

function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTE_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function MobileAccountLinks({ onNavigate }: { onNavigate: () => void }) {
  const { data: session, status } = useSession();

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
          Entrar
        </Link>
        <Link
          href='/registar'
          onClick={onNavigate}
          className='flex cursor-pointer items-center gap-3 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-[var(--color-gk-green-dark)]'
        >
          Criar conta
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
        <User size={18} strokeWidth={1.8} />A minha conta
      </Link>
      <button
        onClick={() => {
          onNavigate();
          signOut({ callbackUrl: '/' });
        }}
        className='flex w-full cursor-pointer items-center gap-3 px-0 py-4 text-[14px] font-normal uppercase tracking-wider text-[var(--color-gk-black)]/65 transition-colors duration-200 hover:text-red-600'
      >
        <LogOut size={18} strokeWidth={1.8} />
        Sair
      </button>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Rotas de aplicação forçam sempre modo opaco/escuro (links legíveis sobre
  // fundo branco). Rotas de marketing mantêm o comportamento dinâmico:
  // transparente no topo, opaco ao fazer scroll.
  const forcedOpaque = useMemo(() => isAppRoute(pathname), [pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // "Transparent" agora exige três condições: não forçado opaco, não scrolled,
  // e menu mobile fechado.
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
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User icon (direita) + Hamburger mobile */}
        <div className='flex items-center gap-4'>
          {/* UserMenu desktop — ícone muda cor com scroll ou rota */}
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
                  {item.label}
                </Link>
              ))}
              {/* Links de conta — diretos, sem dropdown */}
              <MobileAccountLinks onNavigate={() => setMenuAberto(false)} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

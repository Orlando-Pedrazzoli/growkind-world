'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, BookOpen, GraduationCap, LogOut } from 'lucide-react';

interface UserMenuProps {
  /** Cor do ícone — muda com scroll no Header */
  iconColor?: string;
  /** Filtro CSS — sombra quando header transparente */
  iconFilter?: string;
}

export default function UserMenu({
  iconColor = '#1A5C2A',
  iconFilter = 'none',
}: UserMenuProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return (
      <div className='p-1'>
        <User
          size={22}
          strokeWidth={1.8}
          style={{ color: iconColor, filter: iconFilter, opacity: 0.4 }}
          className='animate-pulse transition-all duration-500'
        />
      </div>
    );
  }

  return (
    <div ref={menuRef} className='relative'>
      {/* Ícone User — sempre visível, igual ao original */}
      <button
        onClick={() => setOpen(!open)}
        className='cursor-pointer p-1'
        aria-label={session ? 'Menu da conta' : 'Entrar ou registar'}
        aria-expanded={open}
      >
        <User
          size={22}
          strokeWidth={1.8}
          style={{ color: iconColor, filter: iconFilter }}
          className='transition-all duration-500'
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className='absolute right-0 top-full mt-3 w-60 border border-[var(--color-gk-green-dark)]/10 bg-white shadow-lg'>
          {!session ? (
            /* ---- NÃO AUTENTICADO ---- */
            <div className='flex flex-col py-2'>
              <Link
                href='/login'
                onClick={() => setOpen(false)}
                className='px-5 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
              >
                Entrar
              </Link>
              <Link
                href='/registar'
                onClick={() => setOpen(false)}
                className='px-5 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
              >
                Criar conta
              </Link>
            </div>
          ) : (
            /* ---- AUTENTICADO ---- */
            <>
              {/* Info do utilizador */}
              <div className='border-b border-[var(--color-gk-green-dark)]/8 px-5 py-4'>
                <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                  {session.user.name}
                </p>
                <p className='mt-0.5 text-[12px] text-[var(--color-gk-cinza)]'>
                  {session.user.email}
                </p>
              </div>

              {/* Links do cliente */}
              <div className='flex flex-col py-2'>
                <Link
                  href='/a-minha-conta'
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-3 px-5 py-3 text-[13px] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
                >
                  <User size={16} strokeWidth={1.8} />A minha conta
                </Link>
                <Link
                  href='/a-minha-conta/cursos'
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-3 px-5 py-3 text-[13px] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
                >
                  <GraduationCap size={16} strokeWidth={1.8} />
                  Os meus cursos
                </Link>
                <Link
                  href='/a-minha-conta/livro'
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-3 px-5 py-3 text-[13px] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
                >
                  <BookOpen size={16} strokeWidth={1.8} />O meu livro
                </Link>

                {/* Separador + Sair */}
                <div className='mx-5 my-1 border-t border-[var(--color-gk-green-dark)]/8' />
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className='flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-[13px] text-[var(--color-gk-black)]/70 transition-colors hover:bg-[var(--color-gk-creme)] hover:text-red-600'
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

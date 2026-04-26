// src/components/auth/UserMenu.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  User,
  BookOpen,
  GraduationCap,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface UserMenuProps {
  /** Cor base — usada quando navbar transparente (branco) ou opaca (verde escuro) */
  iconColor?: string;
  /** Filtro CSS — sombra subtil quando header transparente */
  iconFilter?: string;
}

/**
 * Extrai a primeira palavra do nome (e capitaliza).
 * - "Andre Pedrazzoli" → "Andre"
 * - "maria silva santos" → "Maria"
 * - undefined / "" → null (faller deve cair para email)
 */
function getFirstName(name?: string | null): string | null {
  if (!name) return null;
  const trimmed = name.trim();
  if (trimmed.length === 0) return null;
  const first = trimmed.split(/\s+/)[0];
  if (!first) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/**
 * Devolve um label compacto para usar na navbar.
 * Prioridade: primeiro nome → username do email → "Conta"
 */
function getDisplayLabel(name?: string | null, email?: string | null): string {
  const first = getFirstName(name);
  if (first) return first;
  if (email) {
    const username = email.split('@')[0];
    if (username) {
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
  }
  return 'Conta';
}

/**
 * Devolve a inicial para o avatar fallback.
 * - "Andre" → "A"
 * - email "andre@..." → "A"
 * - vazio → "U"
 */
function getInitial(name?: string | null, email?: string | null): string {
  const first = getFirstName(name);
  if (first) return first.charAt(0).toUpperCase();
  if (email && email.length > 0) return email.charAt(0).toUpperCase();
  return 'U';
}

/**
 * Cor do avatar derivada de hash do nome/email.
 * Mantém-se sempre a mesma para o mesmo utilizador.
 * Usa tons da paleta GrowKind (verde, ocre, terracota).
 */
const AVATAR_COLORS = [
  '#1A5C2A', // verde GrowKind
  '#e8943a', // ocre GrowKind
  '#c4a44a', // dourado mostarda
  '#7aab96', // verde-salva
  '#8a6c1f', // dourado escuro
  '#4d7a64', // verde-salva escuro
];

function getAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function UserMenu({
  iconColor = '#1A5C2A',
  iconFilter = 'none',
}: UserMenuProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  // Fechar com Esc (acessibilidade)
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open]);

  // ============== LOADING ==============
  if (status === 'loading') {
    return (
      <div className='flex items-center gap-2 p-1'>
        <div
          className='h-7 w-7 animate-pulse rounded-full'
          style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
        />
      </div>
    );
  }

  // ============== ANÓNIMO ==============
  if (!session) {
    return (
      <div ref={menuRef} className='relative'>
        <button
          onClick={() => setOpen(!open)}
          className='cursor-pointer p-1'
          aria-label='Entrar ou criar conta'
          aria-expanded={open}
        >
          <User
            size={22}
            strokeWidth={1.8}
            style={{ color: iconColor, filter: iconFilter }}
            className='transition-all duration-500'
          />
        </button>

        {open && (
          <div className='absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-lg border border-[var(--color-gk-green-dark)]/10 bg-white shadow-lg'>
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
          </div>
        )}
      </div>
    );
  }

  // ============== AUTENTICADO ==============
  const userName = session.user?.name;
  const userEmail = session.user?.email;
  const userImage = session.user?.image;

  const displayLabel = getDisplayLabel(userName, userEmail);
  const initial = getInitial(userName, userEmail);
  const avatarColor = getAvatarColor(userEmail || userName || 'user');
  const showImage = !!userImage && !imageError;

  // Cor do texto do nome (acompanha a navbar)
  const nameColor = iconColor;

  return (
    <div ref={menuRef} className='relative'>
      {/* TRIGGER — Avatar + nome (desktop) ou só avatar (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className='flex cursor-pointer items-center gap-2 p-1 transition-opacity duration-200 hover:opacity-80'
        aria-label={`Menu da conta — ${displayLabel}`}
        aria-expanded={open}
      >
        {/* Avatar — foto Google ou inicial colorida */}
        <div
          className='relative flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full'
          style={{
            backgroundColor: showImage ? 'transparent' : avatarColor,
            filter: iconFilter,
            border: showImage ? 'none' : `1.5px solid ${avatarColor}`,
          }}
        >
          {showImage ? (
            <Image
              src={userImage!}
              alt={displayLabel}
              fill
              sizes='28px'
              className='object-cover'
              onError={() => setImageError(true)}
              referrerPolicy='no-referrer'
            />
          ) : (
            <span
              className='font-[family-name:var(--font-display)] text-[13px] font-medium leading-none'
              style={{ color: '#ffffff' }}
            >
              {initial}
            </span>
          )}
        </div>

        {/* Primeiro nome — só desktop (≥640px) */}
        <span
          className='hidden text-[13px] font-medium tracking-tight transition-colors duration-500 sm:inline'
          style={{
            color: nameColor,
            textShadow:
              iconFilter !== 'none' ? '0 1px 4px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {displayLabel}
        </span>

        {/* Chevron — só desktop, indica que abre menu */}
        <ChevronDown
          size={14}
          strokeWidth={2}
          className='hidden transition-transform duration-200 sm:block'
          style={{
            color: nameColor,
            filter: iconFilter,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className='absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-lg border border-[var(--color-gk-green-dark)]/10 bg-white shadow-lg'>
          {/* Cabeçalho — avatar + nome completo + email */}
          <div className='flex items-center gap-3 border-b border-[var(--color-gk-green-dark)]/8 bg-[var(--color-gk-creme)]/40 px-5 py-4'>
            <div
              className='relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full'
              style={{
                backgroundColor: showImage ? 'transparent' : avatarColor,
              }}
            >
              {showImage ? (
                <Image
                  src={userImage!}
                  alt={displayLabel}
                  fill
                  sizes='40px'
                  className='object-cover'
                  referrerPolicy='no-referrer'
                />
              ) : (
                <span className='font-[family-name:var(--font-display)] text-[16px] font-medium leading-none text-white'>
                  {initial}
                </span>
              )}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-[14px] font-medium text-[var(--color-gk-black)]'>
                {userName || displayLabel}
              </p>
              {userEmail && (
                <p className='mt-0.5 truncate text-[12px] text-[var(--color-gk-cinza)]'>
                  {userEmail}
                </p>
              )}
            </div>
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
        </div>
      )}
    </div>
  );
}

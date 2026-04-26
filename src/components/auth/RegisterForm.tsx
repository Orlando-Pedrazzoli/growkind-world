// src/components/auth/RegisterForm.tsx

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { safeNext } from '@/lib/safeRedirect';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Valida e captura o destino pretendido após registo
  const nextUrl = safeNext(searchParams.get('next'), '/');

  // Para Google OAuth
  const googleCallbackUrl = nextUrl;

  // Para o link "Entrar" — preserva o ?next=
  const loginHref =
    nextUrl === '/' ? '/login' : `/login?next=${encodeURIComponent(nextUrl)}`;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta');
        setLoading(false);
        return;
      }

      // Auto-login após registo
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Se auto-login falhar, manda para login mas preserva o destino
        router.push(loginHref);
      } else {
        router.push(nextUrl);
        router.refresh();
      }
    } catch {
      setError('Erro de conexão. Tenta novamente.');
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    await signIn('google', { callbackUrl: googleCallbackUrl });
  }

  return (
    <div className='mx-auto w-full max-w-[400px]'>
      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className='flex w-full cursor-pointer items-center justify-center gap-3 border-[1.5px] border-[var(--color-gk-green-dark)]/20 bg-white px-6 py-4 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--color-gk-black)] transition-all duration-200 hover:border-[var(--color-gk-green-dark)] hover:bg-[var(--color-gk-green-light)]/20 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <svg width='18' height='18' viewBox='0 0 24 24'>
          <path
            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'
            fill='#4285F4'
          />
          <path
            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            fill='#34A853'
          />
          <path
            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z'
            fill='#FBBC05'
          />
          <path
            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            fill='#EA4335'
          />
        </svg>
        Registar com Google
      </button>

      {/* Divisor */}
      <div className='my-8 flex items-center gap-4'>
        <div className='h-px flex-1 bg-[var(--color-gk-green-dark)]/10' />
        <span className='text-[11px] uppercase tracking-[0.14em] text-[var(--color-gk-cinza)]'>
          ou
        </span>
        <div className='h-px flex-1 bg-[var(--color-gk-green-dark)]/10' />
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Nome completo'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className='input-editorial'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className='input-editorial'
        />
        <input
          type='password'
          placeholder='Password (mínimo 8 caracteres)'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          className='input-editorial'
        />

        {error && <p className='text-[13px] text-red-600'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='btn-primary mt-2 w-full text-center'
        >
          {loading ? 'A criar...' : 'Criar conta'}
        </button>
      </form>

      {/* Link login */}
      <p className='mt-8 text-center text-[14px] text-[var(--color-gk-cinza)]'>
        Já tens conta?{' '}
        <Link
          href={loginHref}
          className='font-medium text-[var(--color-gk-green-dark)] underline underline-offset-2'
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}

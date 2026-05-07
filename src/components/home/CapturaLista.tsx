'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function CapturaLista() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação básica client-side
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setErrorMsg('Por favor introduz um email válido.');
      setState('error');
      return;
    }

    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'homepage' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Erro ao processar inscrição.');
        setState('error');
        return;
      }

      // Sucesso — limpar campo e mostrar mensagem
      setEmail('');
      setState('success');
    } catch {
      setErrorMsg(
        'Erro de ligação. Verifica a tua internet e tenta novamente.',
      );
      setState('error');
    }
  }

  return (
    <section
      ref={ref}
      id='lista'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className='mx-auto flex flex-col items-center px-6 py-12 text-center md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <span className='eyebrow'>Acompanha o processo</span>

        {/* Separador */}
        <div
          className='mx-auto mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Titulo */}
        <h2 className='mt-8 text-[var(--color-gk-white)] md:mt-12'>
          Entra na lista.
          <br />
          Recebe em primeira mão.
        </h2>

        {/* Subtitulo */}
        <p
          className='mx-auto mt-4 max-w-lg text-lg leading-relaxed md:mt-6'
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          O lançamento do livro e dos cursos acontece primeiro para quem está na
          lista.
          <br />
          Sem pressão. Só o que importa.
        </p>

        {/* Formulario funcional */}
        {state === 'success' ? (
          // ─── Estado: sucesso ─────────────────────────────────────────
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-8 flex w-full max-w-lg flex-col items-center gap-3 px-6 py-8 md:mt-10'
            style={{
              border: '1px solid rgba(122, 171, 150, 0.3)',
              backgroundColor: 'rgba(122, 171, 150, 0.08)',
            }}
          >
            <div
              className='flex h-12 w-12 items-center justify-center rounded-full'
              style={{ backgroundColor: 'rgba(122, 171, 150, 0.2)' }}
            >
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 13L9 17L19 7'
                  stroke='#7AAB96'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <p
              className='font-[family-name:var(--font-display)] text-xl'
              style={{ color: '#7AAB96' }}
            >
              Inscrição confirmada
            </p>
            <p className='text-sm' style={{ color: 'rgba(255,255,255,0.7)' }}>
              Bem-vindo à lista. Avisamos-te assim que houver novidades.
            </p>
          </motion.div>
        ) : (
          // ─── Estado: idle / submitting / error ────────────────────────
          <form
            onSubmit={handleSubmit}
            className='mt-8 w-full max-w-lg md:mt-10'
            noValidate
          >
            <div
              className='flex w-full flex-col overflow-hidden sm:flex-row'
              style={{
                border:
                  state === 'error'
                    ? '1px solid rgba(220, 100, 100, 0.4)'
                    : '1px solid rgba(255,255,255,0.15)',
                transition: 'border-color 0.3s',
              }}
            >
              <input
                type='email'
                placeholder='o teu email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
                disabled={state === 'submitting'}
                required
                className='flex-1 border-none bg-transparent px-6 py-4 text-sm outline-none disabled:opacity-50'
                style={{ color: 'rgba(255,255,255,0.85)' }}
                aria-label='Email'
                aria-invalid={state === 'error'}
              />
              <button
                type='submit'
                disabled={state === 'submitting'}
                className='cursor-pointer px-8 py-4 text-[14px] font-medium uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-60'
                style={{ backgroundColor: 'var(--color-gk-ocre)' }}
              >
                {state === 'submitting' ? 'A enviar...' : 'Quero entrar'}
              </button>
            </div>

            {/* Mensagem de erro */}
            {state === 'error' && errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-3 text-left text-[13px]'
                style={{ color: 'rgba(220, 130, 130, 0.9)' }}
                role='alert'
              >
                {errorMsg}
              </motion.p>
            )}

            {/* Nota privacidade */}
            <p
              className='mt-4 text-[12px] leading-relaxed'
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Ao inscrever-te concordas com a nossa{' '}
              <Link
                href='/privacidade'
                className='underline underline-offset-2 transition-colors hover:text-white'
              >
                Política de Privacidade
              </Link>
              . Podes cancelar a inscrição a qualquer momento.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}

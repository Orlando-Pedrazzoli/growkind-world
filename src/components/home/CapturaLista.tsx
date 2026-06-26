'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { revealContainer, revealItem } from '@/lib/motion';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function CapturaLista() {
  const t = useTranslations('home.newsletter');

  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação básica client-side
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setErrorMsg(t('invalidEmail'));
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
        setErrorMsg(data.error || t('error'));
        setState('error');
        return;
      }

      // Sucesso — limpar campo e mostrar mensagem
      setEmail('');
      setState('success');
    } catch {
      setErrorMsg(t('connectionError'));
      setState('error');
    }
  }

  return (
    <section
      id='lista'
      className='w-full'
      style={{ backgroundColor: '#0d1f13' }}
    >
      <motion.div
        variants={revealContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        className='mx-auto flex flex-col items-center px-6 py-12 text-center md:px-[60px] md:py-[var(--spacing-section)]'
        style={{ maxWidth: 'var(--width-content-wide)' }}
      >
        {/* Eyebrow */}
        <motion.span variants={revealItem} className='eyebrow'>
          {t('eyebrow')}
        </motion.span>

        {/* Separador */}
        <motion.div
          variants={revealItem}
          className='mx-auto mt-6 md:mt-8'
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />

        {/* Titulo — \n no JSON + whitespace-pre-line preserva a quebra */}
        <motion.h2
          variants={revealItem}
          className='mt-8 whitespace-pre-line text-[var(--color-gk-white)] md:mt-12'
        >
          {t('title')}
        </motion.h2>

        {/* Subtitulo */}
        <motion.p
          variants={revealItem}
          className='mx-auto mt-4 max-w-lg whitespace-pre-line text-lg leading-relaxed md:mt-6'
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {t('body')}
        </motion.p>

        {/* Botões de ação — acima do formulário */}
        <motion.div
          variants={revealItem}
          className='mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center md:mt-10'
        >
          <Link
            href='/o-livro'
            className='btn-ghost flex-1 text-center'
            style={{
              borderColor: 'rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {t('ctaBook')}
          </Link>
          <Link
            href='/cursos'
            className='flex-1 cursor-pointer px-7 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-all duration-300 hover:brightness-110'
            style={{
              backgroundColor: 'var(--color-gk-ocre)',
              borderRadius: '8px',
            }}
          >
            {t('ctaCourse')}
          </Link>
        </motion.div>

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
              {t('successTitle')}
            </p>
            <p className='text-sm' style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('successBody')}
            </p>
          </motion.div>
        ) : (
          // ─── Estado: idle / submitting / error ────────────────────────
          <motion.form
            variants={revealItem}
            onSubmit={handleSubmit}
            className='mt-8 w-full max-w-lg md:mt-10'
            noValidate
          >
            <div
              className='flex w-full flex-col overflow-hidden rounded-2xl sm:flex-row sm:rounded-full'
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
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
                disabled={state === 'submitting'}
                required
                className='flex-1 border-none bg-transparent px-6 py-4 text-sm outline-none disabled:opacity-50'
                style={{ color: 'rgba(255,255,255,0.85)' }}
                aria-label={t('emailPlaceholder')}
                aria-invalid={state === 'error'}
              />
              <button
                type='submit'
                disabled={state === 'submitting'}
                className='cursor-pointer px-8 py-4 text-[14px] font-medium uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-60'
                style={{ backgroundColor: 'var(--color-gk-ocre)' }}
              >
                {state === 'submitting' ? t('submitting') : t('cta')}
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

            {/* Nota privacidade — consent usa tags <privacy></privacy> no JSON */}
            <p
              className='mt-4 text-[12px] leading-relaxed'
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {t.rich('consent', {
                privacy: chunks => (
                  <Link
                    href='/privacidade'
                    className='underline underline-offset-2 transition-colors hover:text-white'
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}

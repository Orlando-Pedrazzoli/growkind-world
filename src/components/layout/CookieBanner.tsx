'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const COOKIE_KEY = 'gk-cookie-consent';

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const consentimento = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_KEY}=`));

    if (!consentimento) {
      const timer = setTimeout(() => setVisivel(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function guardarConsentimento(aceite: boolean) {
    const valor = aceite ? 'aceite' : 'recusado';
    const expira = new Date();
    expira.setFullYear(expira.getFullYear() + 1);
    document.cookie = `${COOKIE_KEY}=${valor}; expires=${expira.toUTCString()}; path=/; SameSite=Lax`;
    setVisivel(false);
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className='fixed bottom-6 left-4 right-4 z-[100] mx-auto max-w-4xl md:bottom-8 md:left-8 md:right-8'
          role='dialog'
          aria-label='Consentimento de cookies'
        >
          <div
            style={{
              backgroundColor: 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
            }}
            className='flex flex-col items-center gap-4 px-6 py-5 shadow-2xl sm:flex-row sm:gap-6 md:px-8'
          >
            {/* Ícone */}
            <div
              className='flex h-10 w-10 flex-shrink-0 items-center justify-center'
              style={{
                backgroundColor: 'rgba(232, 148, 58, 0.15)',
                borderRadius: '10px',
              }}
            >
              <Cookie
                size={20}
                strokeWidth={1.5}
                style={{ color: 'var(--color-gk-ocre)' }}
              />
            </div>

            {/* Texto */}
            <p
              className='flex-1 text-center text-[13px] leading-relaxed sm:text-left md:text-[14px]'
              style={{ color: 'rgba(255, 255, 255, 0.65)' }}
            >
              Utilizamos cookies para melhorar a tua experiência.{' '}
              <Link
                href='/cookies'
                className='text-[var(--color-gk-ocre)] underline underline-offset-2 transition-colors duration-200 hover:text-white'
              >
                Saber mais
              </Link>
            </p>

            {/* Botões */}
            <div className='flex flex-shrink-0 gap-3'>
              <button
                onClick={() => guardarConsentimento(false)}
                className='cursor-pointer px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-200 hover:text-white/70'
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor =
                    'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor =
                    'rgba(255, 255, 255, 0.12)';
                }}
              >
                Recusar
              </button>
              <button
                onClick={() => guardarConsentimento(true)}
                className='cursor-pointer px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-all duration-200 hover:brightness-110'
                style={{
                  backgroundColor: 'var(--color-gk-green-dark)',
                  borderRadius: '10px',
                }}
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

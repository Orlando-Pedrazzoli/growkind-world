'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

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
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className='fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-lg md:left-auto md:right-8 md:bottom-8'
          role='dialog'
          aria-label='Consentimento de cookies'
        >
          <div
            style={{
              backgroundColor: 'rgba(30, 30, 30, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            className='relative p-5 shadow-2xl md:p-6'
          >
            {/* Botão fechar */}
            <button
              onClick={() => guardarConsentimento(false)}
              className='absolute right-3 top-3 cursor-pointer p-1 text-white/30 transition-colors duration-200 hover:text-white/60'
              aria-label='Fechar'
            >
              <X size={14} strokeWidth={1.5} />
            </button>

            {/* Conteúdo */}
            <div className='flex items-start gap-4'>
              <div
                className='mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center'
                style={{ backgroundColor: 'rgba(232, 148, 58, 0.15)' }}
              >
                <Cookie
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-gk-ocre)' }}
                />
              </div>

              <div className='flex-1 pr-4'>
                <p
                  className='text-[13px] leading-relaxed'
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Utilizamos cookies para melhorar a experiência.{' '}
                  <Link
                    href='/cookies'
                    className='text-[var(--color-gk-ocre)] underline underline-offset-2 transition-colors duration-200 hover:text-white'
                  >
                    Política de cookies
                  </Link>
                </p>

                {/* Botões */}
                <div className='mt-4 flex gap-3'>
                  <button
                    onClick={() => guardarConsentimento(true)}
                    className='cursor-pointer px-5 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-all duration-200 hover:brightness-110'
                    style={{ backgroundColor: 'var(--color-gk-green-dark)' }}
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => guardarConsentimento(false)}
                    className='cursor-pointer px-5 py-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-all duration-200'
                    style={{
                      color: 'rgba(255, 255, 255, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.borderColor =
                        'rgba(255, 255, 255, 0.25)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
                      e.currentTarget.style.borderColor =
                        'rgba(255, 255, 255, 0.12)';
                    }}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

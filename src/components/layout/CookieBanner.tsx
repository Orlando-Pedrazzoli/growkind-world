'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'gk-cookie-consent';

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    // Verificar se já existe consentimento
    const consentimento = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));

    if (!consentimento) {
      // Pequeno delay para não competir com o carregamento inicial
      const timer = setTimeout(() => setVisivel(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function guardarConsentimento(aceite: boolean) {
    const valor = aceite ? 'aceite' : 'recusado';
    // Cookie válido por 365 dias
    const expira = new Date();
    expira.setFullYear(expira.getFullYear() + 1);
    document.cookie = `${COOKIE_KEY}=${valor}; expires=${expira.toUTCString()}; path=/; SameSite=Lax`;
    setVisivel(false);
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--color-gk-green-light)]/40 bg-[var(--color-gk-white)] p-4 shadow-lg md:p-6"
          role="dialog"
          aria-label="Consentimento de cookies"
        >
          <div className="page-width flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm text-[var(--color-gk-black)]/70">
              {t('mensagem')}{' '}
              <Link
                href="/cookies"
                className="underline underline-offset-2 hover:text-[var(--color-gk-green-dark)]"
              >
                {t('saberMais')}
              </Link>
            </p>

            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => guardarConsentimento(false)}
                className="rounded-lg border border-[var(--color-gk-black)]/20 px-5 py-2 text-sm font-medium text-[var(--color-gk-black)]/60 transition-colors hover:border-[var(--color-gk-black)]/40 hover:text-[var(--color-gk-black)]"
              >
                {t('recusar')}
              </button>
              <button
                onClick={() => guardarConsentimento(true)}
                className="rounded-lg bg-[var(--color-gk-green-dark)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-gk-green-dark)]/90"
              >
                {t('aceitar')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

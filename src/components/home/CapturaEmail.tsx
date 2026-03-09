'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { ContentBlock } from '@/types';

interface CapturaEmailProps {
  block: ContentBlock;
}

export default function CapturaEmail({ block }: CapturaEmailProps) {
  const t = useTranslations('formulario');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    perfil: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEstado('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          origem: 'home-formulario',
          consentimento: true,
        }),
      });

      if (!res.ok) throw new Error('Erro ao submeter');

      setEstado('success');
      setFormData({ nome: '', email: '', perfil: '' });
    } catch {
      setEstado('error');
    }
  }

  return (
    <section
      id="newsletter"
      className="section-padding bg-[var(--color-gk-green-light)]"
    >
      <div className="content-width text-center">
        {block.titulo && (
          <h2 className="text-[var(--color-gk-green-dark)]">
            {block.titulo}
          </h2>
        )}
        {block.subtitulo && (
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--color-gk-black)]/70">
            {block.subtitulo}
          </p>
        )}

        {estado === 'success' ? (
          <div className="mx-auto mt-10 max-w-md rounded-xl bg-white/60 p-8">
            <p className="text-lg font-medium text-[var(--color-gk-green-dark)]">
              {t('sucesso')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4"
          >
            {/* Nome */}
            <input
              type="text"
              required
              placeholder={t('nome')}
              value={formData.nome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nome: e.target.value }))
              }
              className="rounded-lg border border-[var(--color-gk-green-dark)]/20 bg-white px-4 py-3 text-sm text-[var(--color-gk-black)] outline-none transition-colors placeholder:text-[var(--color-gk-black)]/40 focus:border-[var(--color-gk-green-dark)]"
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder={t('email')}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="rounded-lg border border-[var(--color-gk-green-dark)]/20 bg-white px-4 py-3 text-sm text-[var(--color-gk-black)] outline-none transition-colors placeholder:text-[var(--color-gk-black)]/40 focus:border-[var(--color-gk-green-dark)]"
            />

            {/* Perfil (opcional) */}
            <select
              value={formData.perfil}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, perfil: e.target.value }))
              }
              className="rounded-lg border border-[var(--color-gk-green-dark)]/20 bg-white px-4 py-3 text-sm text-[var(--color-gk-black)]/70 outline-none transition-colors focus:border-[var(--color-gk-green-dark)]"
            >
              <option value="">{t('perfil')}</option>
              <option value="pai-mae">{t('perfilOpcoes.paiMae')}</option>
              <option value="educador">{t('perfilOpcoes.educador')}</option>
              <option value="psicologo">{t('perfilOpcoes.psicologo')}</option>
              <option value="terapeuta">{t('perfilOpcoes.terapeuta')}</option>
              <option value="outro-profissional">
                {t('perfilOpcoes.outroProfissional')}
              </option>
            </select>

            {/* Botão */}
            <button
              type="submit"
              disabled={estado === 'loading'}
              className="rounded-lg bg-[var(--color-gk-green-dark)] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-gk-green-dark)]/90 hover:shadow-lg disabled:opacity-60"
            >
              {estado === 'loading' ? '...' : (block.ctaTexto || t('subscrever'))}
            </button>

            {estado === 'error' && (
              <p className="text-sm text-red-600">{t('erro')}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

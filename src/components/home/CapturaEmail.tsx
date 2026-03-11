'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { ContentBlock } from '@/types';

interface CapturaEmailProps {
  block: ContentBlock;
  origem?: string;
}

export default function CapturaEmail({
  block,
  origem = 'home-formulario',
}: CapturaEmailProps) {
  const t = useTranslations('formulario');
  const [estado, setEstado] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
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
          origem,
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
      id='newsletter'
      className='bg-[var(--color-gk-green-light)]'
      style={{ padding: '120px 60px' }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        {/* Eyebrow */}
        <span className='eyebrow mb-6 block'>
          {block.titulo ? '' : 'Formação GrowKind · Em breve'}
        </span>

        {block.titulo && (
          <h2 className='text-[var(--color-gk-green-dark)]'>{block.titulo}</h2>
        )}

        {block.subtitulo && (
          <p
            className='mx-auto mt-4 text-[var(--color-gk-green-dark)]'
            style={{
              fontSize: '15px',
              lineHeight: '1.8',
              opacity: 0.7,
              maxWidth: '480px',
            }}
          >
            {block.subtitulo}
          </p>
        )}

        {estado === 'success' ? (
          <div
            className='mx-auto mt-10 bg-white/60 p-8'
            style={{ maxWidth: '460px' }}
          >
            <p className='text-lg font-medium text-[var(--color-gk-green-dark)]'>
              {t('sucesso')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='mx-auto mt-12 flex flex-col gap-3'
            style={{ maxWidth: '460px' }}
          >
            {/* Nome */}
            <input
              type='text'
              required
              placeholder={t('nome')}
              value={formData.nome}
              onChange={e =>
                setFormData(prev => ({ ...prev, nome: e.target.value }))
              }
              className='input-editorial'
            />

            {/* Email */}
            <input
              type='email'
              required
              placeholder={t('email')}
              value={formData.email}
              onChange={e =>
                setFormData(prev => ({ ...prev, email: e.target.value }))
              }
              className='input-editorial'
            />

            {/* Perfil — opções conforme mockup do João */}
            <select
              value={formData.perfil}
              onChange={e =>
                setFormData(prev => ({ ...prev, perfil: e.target.value }))
              }
              className='input-editorial'
            >
              <option value='' disabled>
                {t('perfil')}
              </option>
              <option value='pai-mae'>{t('perfilOpcoes.paiMae')}</option>
              <option value='teaching-assistant'>
                {t('perfilOpcoes.teachingAssistant')}
              </option>
              <option value='professor'>{t('perfilOpcoes.professor')}</option>
              <option value='psicologo-terapeuta'>
                {t('perfilOpcoes.psicologoTerapeuta')}
              </option>
              <option value='outro-profissional'>
                {t('perfilOpcoes.outroProfissional')}
              </option>
            </select>

            {/* Botão */}
            <button
              type='submit'
              disabled={estado === 'loading'}
              className='btn-primary w-full text-center'
              style={{ padding: '18px' }}
            >
              {estado === 'loading' ? '...' : block.ctaTexto || t('subscrever')}
            </button>

            {estado === 'error' && (
              <p className='text-sm text-red-600'>{t('erro')}</p>
            )}
          </form>
        )}

        <p
          className='mt-4 text-[var(--color-gk-green-dark)]'
          style={{ fontSize: '12px', opacity: 0.5 }}
        >
          Sem pressao. So o que importa — quando importar.
        </p>
      </div>
    </section>
  );
}

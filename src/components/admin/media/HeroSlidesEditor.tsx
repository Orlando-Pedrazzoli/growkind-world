// src/components/admin/media/HeroSlidesEditor.tsx
// Gestão do carrossel do Hero: adicionar, substituir imagens (desktop + mobile),
// texto alternativo PT/EN, link, activar/desactivar, reordenar e remover.
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Check,
  Download,
  Eye,
  EyeOff,
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import {
  Card,
  Label,
  TextInput,
  Hint,
  LocalizedField,
  Button,
  Feedback,
  SectionHeader,
  adminFetch,
} from '@/components/admin/ui/Form';
import { IMAGE_SPECS } from '@/lib/cms/registry';
import type { HeroSlideDoc, ImageAsset, LocalizedString } from '@/types/cms';

type Draft = {
  id: string | null; // null = ainda não guardado
  key: string; // chave estável para o React
  order: number;
  active: boolean;
  desktop: ImageAsset | null;
  mobile: ImageAsset | null;
  alt: LocalizedString;
  href: string;
  dirty: boolean;
};

type Fb = { type: 'ok' | 'err'; text: string } | null;

function fromDoc(d: HeroSlideDoc): Draft {
  return {
    id: d._id,
    key: d._id,
    order: d.order,
    active: d.active,
    desktop: d.desktop,
    mobile: d.mobile,
    alt: d.alt,
    href: d.href ?? '',
    dirty: false,
  };
}

export default function HeroSlidesEditor({
  initial,
}: {
  initial: HeroSlideDoc[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [slides, setSlides] = useState<Draft[]>(initial.map(fromDoc));
  const [busy, setBusy] = useState<string | null>(null); // key do slide ocupado
  const [globalFb, setGlobalFb] = useState<Fb>(null);
  const [fb, setFb] = useState<Record<string, Fb>>({});

  const refresh = () => startTransition(() => router.refresh());

  function update(key: string, patch: Partial<Draft>) {
    setSlides(s =>
      s.map(d => (d.key === key ? { ...d, ...patch, dirty: true } : d)),
    );
  }

  // ── Importar os 3 slides actuais do código ──────────────────────
  async function importDefaults() {
    setBusy('import');
    setGlobalFb(null);
    try {
      const data = await adminFetch<{ slides: HeroSlideDoc[] }>(
        '/api/admin/hero',
        {
          method: 'POST',
          body: JSON.stringify({ importDefaults: true }),
        },
      );
      setSlides(data.slides.map(fromDoc));
      setGlobalFb({ type: 'ok', text: 'Slides importados. Já podes editar.' });
      refresh();
    } catch (err) {
      setGlobalFb({ type: 'err', text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  // ── Adicionar slide vazio ───────────────────────────────────────
  function addSlide() {
    const key = `new-${Date.now()}`;
    setSlides(s => [
      ...s,
      {
        id: null,
        key,
        order: s.length,
        active: true,
        desktop: null,
        mobile: null,
        alt: { pt: '', en: '' },
        href: '',
        dirty: true,
      },
    ]);
  }

  // ── Guardar (POST ou PATCH) ─────────────────────────────────────
  async function save(d: Draft) {
    setFb(f => ({ ...f, [d.key]: null }));
    if (!d.desktop || !d.mobile) {
      setFb(f => ({
        ...f,
        [d.key]: {
          type: 'err',
          text: 'Carrega a imagem desktop e a imagem mobile.',
        },
      }));
      return;
    }
    if (!d.alt.pt.trim()) {
      setFb(f => ({
        ...f,
        [d.key]: {
          type: 'err',
          text: 'O texto alternativo em português é obrigatório.',
        },
      }));
      return;
    }

    setBusy(d.key);
    try {
      const payload = {
        desktop: d.desktop,
        mobile: d.mobile,
        alt: d.alt,
        href: d.href.trim() || null,
        active: d.active,
      };
      if (d.id) {
        await adminFetch(`/api/admin/hero/${d.id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setSlides(s =>
          s.map(x => (x.key === d.key ? { ...x, dirty: false } : x)),
        );
      } else {
        const res = await adminFetch<{ id: string }>('/api/admin/hero', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setSlides(s =>
          s.map(x =>
            x.key === d.key ? { ...x, id: res.id, dirty: false } : x,
          ),
        );
      }
      setFb(f => ({
        ...f,
        [d.key]: {
          type: 'ok',
          text: 'Slide guardado. O site já reflecte a alteração.',
        },
      }));
      refresh();
    } catch (err) {
      setFb(f => ({
        ...f,
        [d.key]: { type: 'err', text: (err as Error).message },
      }));
    } finally {
      setBusy(null);
    }
  }

  // ── Remover ─────────────────────────────────────────────────────
  async function remove(d: Draft) {
    if (
      d.id &&
      !window.confirm(
        'Remover este slide? As imagens serão apagadas do Cloudinary.',
      )
    ) {
      return;
    }
    if (!d.id) {
      setSlides(s => s.filter(x => x.key !== d.key));
      return;
    }
    setBusy(d.key);
    try {
      await adminFetch(`/api/admin/hero/${d.id}`, { method: 'DELETE' });
      setSlides(s => s.filter(x => x.key !== d.key));
      refresh();
    } catch (err) {
      setFb(f => ({
        ...f,
        [d.key]: { type: 'err', text: (err as Error).message },
      }));
    } finally {
      setBusy(null);
    }
  }

  // ── Reordenar ───────────────────────────────────────────────────
  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    setSlides(next);

    const ids = next.map(s => s.id).filter((id): id is string => !!id);
    if (ids.length < 2) return;
    setBusy('reorder');
    setGlobalFb(null);
    try {
      await adminFetch('/api/admin/hero/reorder', {
        method: 'PUT',
        body: JSON.stringify({ ids }),
      });
      refresh();
    } catch (err) {
      setGlobalFb({ type: 'err', text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  const unsaved = slides.filter(s => !s.id).length;

  return (
    <div>
      <SectionHeader
        eyebrow='Homepage'
        title='Carrossel do Hero'
        description='Cada slide precisa de duas imagens: uma para desktop (12:5) e outra para telemóvel (3:4). O carrossel roda automaticamente a cada 5 segundos.'
      />

      {/* Lembrete das medidas — visível antes de qualquer upload */}
      <div className='mb-5 grid gap-3 border border-[var(--color-gk-green-dark)]/10 bg-[var(--color-gk-creme)] p-4 text-[13px] sm:grid-cols-2'>
        <div>
          <p className='font-medium text-[var(--color-gk-black)]'>Desktop</p>
          <p className='text-[var(--color-gk-cinza)]'>
            {IMAGE_SPECS.heroDesktop.label}
          </p>
        </div>
        <div>
          <p className='font-medium text-[var(--color-gk-black)]'>Mobile</p>
          <p className='text-[var(--color-gk-cinza)]'>
            {IMAGE_SPECS.heroMobile.label}
          </p>
        </div>
      </div>

      {slides.length === 0 && (
        <Card className='mb-5'>
          <p className='text-[14px] text-[var(--color-gk-black)]'>
            Ainda não há slides guardados — o site está a mostrar os 3 slides
            originais do código.
          </p>
          <p className='mt-1 text-[13px] text-[var(--color-gk-cinza)]'>
            Importa-os para a base de dados para os poderes editar, ou cria
            slides de raiz.
          </p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button
              onClick={importDefaults}
              loading={busy === 'import'}
              icon={<Download size={14} />}
            >
              Importar slides actuais
            </Button>
            <Button
              variant='secondary'
              onClick={addSlide}
              icon={<Plus size={14} />}
            >
              Criar slide novo
            </Button>
          </div>
          <div className='mt-3'>
            <Feedback state={globalFb} />
          </div>
        </Card>
      )}

      <div className='space-y-5'>
        {slides.map((d, i) => (
          <Card key={d.key}>
            {/* Cabeçalho do slide */}
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <span className='flex h-8 w-8 items-center justify-center bg-[var(--color-gk-green-dark)] text-[13px] font-medium text-white'>
                  {i + 1}
                </span>
                <div>
                  <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                    {d.id ? `Slide ${i + 1}` : 'Novo slide (por guardar)'}
                  </p>
                  <p className='text-[12px] text-[var(--color-gk-cinza)]'>
                    {d.active ? 'Visível no site' : 'Oculto no site'}
                    {d.dirty && d.id ? ' · alterações por guardar' : ''}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <Button
                  variant='ghost'
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || busy !== null}
                  aria-label='Mover para cima'
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => move(i, 1)}
                  disabled={i === slides.length - 1 || busy !== null}
                  aria-label='Mover para baixo'
                >
                  <ArrowDown size={16} />
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => update(d.key, { active: !d.active })}
                  disabled={busy !== null}
                  icon={d.active ? <EyeOff size={14} /> : <Eye size={14} />}
                >
                  {d.active ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>
            </div>

            {/* Imagens */}
            <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
              <ImageUploader
                label='Imagem desktop'
                spec={IMAGE_SPECS.heroDesktop}
                value={d.desktop}
                folder='hero'
                previewAspect='12/5'
                disabled={busy !== null}
                onChange={asset => update(d.key, { desktop: asset })}
                note='Aparece em ecrãs a partir de 768 px (tablets em horizontal e computadores).'
              />
              <ImageUploader
                label='Imagem mobile'
                spec={IMAGE_SPECS.heroMobile}
                value={d.mobile}
                folder='hero'
                previewAspect='3/4'
                disabled={busy !== null}
                onChange={asset => update(d.key, { mobile: asset })}
                note='Aparece em telemóveis (menos de 768 px).'
              />
            </div>

            {/* Textos */}
            <div className='mt-6 grid gap-4'>
              <LocalizedField
                label='Texto alternativo (acessibilidade e SEO)'
                value={d.alt}
                onChange={alt => update(d.key, { alt })}
                disabled={busy !== null}
                hint='Descreve a imagem em poucas palavras. Não aparece no ecrã, mas é lido por leitores de ecrã e pelo Google.'
              />
              <div className='sm:max-w-md'>
                <Label>Link ao clicar (opcional)</Label>
                <TextInput
                  value={d.href}
                  placeholder='/o-livro  ou  https://…'
                  disabled={busy !== null}
                  onChange={e => update(d.key, { href: e.target.value })}
                />
                <Hint>
                  Caminho interno (ex.: /o-livro, /cursos, /rdf) ou URL
                  completo. Vazio = sem link.
                </Hint>
              </div>
            </div>

            {/* Acções */}
            <div className='mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-gk-green-dark)]/8 pt-4'>
              <Button
                onClick={() => save(d)}
                loading={busy === d.key}
                disabled={busy !== null && busy !== d.key}
                icon={<Check size={14} />}
              >
                {d.id ? 'Guardar alterações' : 'Guardar slide'}
              </Button>
              <Button
                variant='danger'
                onClick={() => remove(d)}
                disabled={busy !== null}
                icon={<Trash2 size={14} />}
              >
                Remover
              </Button>
              <Feedback state={fb[d.key] ?? null} />
            </div>
          </Card>
        ))}
      </div>

      {slides.length > 0 && (
        <div className='mt-5 flex flex-wrap items-center gap-3'>
          <Button
            variant='secondary'
            onClick={addSlide}
            disabled={busy !== null || slides.length >= 8}
            icon={<Plus size={14} />}
          >
            Adicionar slide
          </Button>
          {unsaved > 0 && (
            <span className='text-[12px] text-amber-700'>
              {unsaved} slide{unsaved > 1 ? 's' : ''} por guardar
            </span>
          )}
          <Feedback state={globalFb} />
        </div>
      )}
    </div>
  );
}

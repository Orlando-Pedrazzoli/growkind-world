// src/components/admin/media/SectionEditor.tsx
// Editor de uma secção da homepage: imagem (slot) + textos PT/EN.
// Campo vazio → o site usa o texto original de messages/{pt,en}.json
// (mostrado como placeholder para o João ver o que está em vigor).
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, RotateCcw } from 'lucide-react';
import ImageUploader from './ImageUploader';
import {
  Card,
  LocalizedField,
  Button,
  Feedback,
  SectionHeader,
  adminFetch,
} from '@/components/admin/ui/Form';
import { IMAGE_SPECS, getSlotDef, type SectionDef } from '@/lib/cms/registry';
import type { ImageAsset, LocalizedString } from '@/types/cms';

type Fb = { type: 'ok' | 'err'; text: string } | null;

interface Props {
  def: SectionDef;
  initialTexts: Record<string, LocalizedString>;
  /** Textos originais do JSON — placeholders. */
  defaults: { pt: Record<string, string>; en: Record<string, string> };
  initialImage: ImageAsset | null; // null = a usar o ficheiro original
}

export default function SectionEditor({
  def,
  initialTexts,
  defaults,
  initialImage,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const slot = def.imageSlot ? getSlotDef(def.imageSlot) : undefined;

  const [texts, setTexts] = useState<Record<string, LocalizedString>>(() =>
    Object.fromEntries(
      def.fields.map(f => [f.key, initialTexts[f.key] ?? { pt: '', en: '' }]),
    ),
  );
  const [image, setImage] = useState<ImageAsset | null>(initialImage);
  const [imageDirty, setImageDirty] = useState(false);
  const [textsDirty, setTextsDirty] = useState(false);
  const [busy, setBusy] = useState<'texts' | 'image' | 'reset' | null>(null);
  const [fbTexts, setFbTexts] = useState<Fb>(null);
  const [fbImage, setFbImage] = useState<Fb>(null);

  const refresh = () => startTransition(() => router.refresh());

  async function saveTexts() {
    setBusy('texts');
    setFbTexts(null);
    try {
      await adminFetch('/api/admin/sections', {
        method: 'PUT',
        body: JSON.stringify({ key: def.key, texts }),
      });
      setTextsDirty(false);
      setFbTexts({
        type: 'ok',
        text: 'Textos guardados. O site já reflecte a alteração.',
      });
      refresh();
    } catch (err) {
      setFbTexts({ type: 'err', text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  async function saveImage() {
    if (!slot || !image) return;
    setBusy('image');
    setFbImage(null);
    try {
      await adminFetch('/api/admin/site-images', {
        method: 'PUT',
        body: JSON.stringify({ key: slot.key, image }),
      });
      setImageDirty(false);
      setFbImage({
        type: 'ok',
        text: 'Imagem guardada. O site já reflecte a alteração.',
      });
      refresh();
    } catch (err) {
      setFbImage({ type: 'err', text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  async function resetImage() {
    if (!slot) return;
    if (
      !window.confirm(
        'Repor a imagem original? A imagem carregada será apagada do Cloudinary.',
      )
    )
      return;
    setBusy('reset');
    setFbImage(null);
    try {
      await adminFetch('/api/admin/site-images', {
        method: 'DELETE',
        body: JSON.stringify({ key: slot.key }),
      });
      setImage(null);
      setImageDirty(false);
      setFbImage({ type: 'ok', text: 'Imagem original reposta.' });
      refresh();
    } catch (err) {
      setFbImage({ type: 'err', text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow='Homepage'
        title={def.label}
        description={def.description}
      />

      <div className={`grid gap-5 ${slot ? 'lg:grid-cols-[2fr_3fr]' : ''}`}>
        {/* Imagem */}
        {slot && (
          <Card>
            <ImageUploader
              label={slot.label}
              spec={IMAGE_SPECS[slot.spec]}
              value={image ?? { url: slot.fallback }}
              folder='home'
              disabled={busy !== null}
              onChange={asset => {
                setImage(asset);
                setImageDirty(true);
              }}
              note={slot.description}
            />
            <div className='mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--color-gk-green-dark)]/8 pt-4'>
              <Button
                onClick={saveImage}
                loading={busy === 'image'}
                disabled={!imageDirty || busy !== null}
                icon={<Check size={14} />}
              >
                Guardar imagem
              </Button>
              {initialImage && (
                <Button
                  variant='ghost'
                  onClick={resetImage}
                  loading={busy === 'reset'}
                  disabled={busy !== null}
                  icon={<RotateCcw size={14} />}
                >
                  Repor original
                </Button>
              )}
              <Feedback state={fbImage} />
            </div>
          </Card>
        )}

        {/* Textos */}
        <Card>
          <p className='mb-4 text-[12px] text-[var(--color-gk-cinza)]'>
            Os textos a cinzento são os que estão actualmente no site. Escreve
            por cima para os substituir; apaga o campo para voltar ao original.
            O EN vazio usa o PT.
          </p>
          <div className='space-y-4'>
            {def.fields.map(f => (
              <LocalizedField
                key={f.key}
                label={f.label}
                kind={f.kind}
                hint={f.hint}
                value={texts[f.key]}
                disabled={busy !== null}
                placeholder={{
                  pt: defaults.pt[f.key] ?? '',
                  en: defaults.en[f.key] ?? '',
                }}
                onChange={v => {
                  setTexts(t => ({ ...t, [f.key]: v }));
                  setTextsDirty(true);
                }}
              />
            ))}
          </div>
          <div className='mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-gk-green-dark)]/8 pt-4'>
            <Button
              onClick={saveTexts}
              loading={busy === 'texts'}
              disabled={!textsDirty || busy !== null}
              icon={<Check size={14} />}
            >
              Guardar textos
            </Button>
            <Feedback state={fbTexts} />
          </div>
        </Card>
      </div>
    </div>
  );
}

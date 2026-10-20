// src/components/admin/media/SiteImagesEditor.tsx
// Grelha de slots de imagem fora da homepage (foto do João, logótipos, …).
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, RotateCcw } from 'lucide-react';
import ImageUploader from './ImageUploader';
import {
  Card,
  Button,
  Feedback,
  SectionHeader,
  adminFetch,
} from '@/components/admin/ui/Form';
import { IMAGE_SPECS, type ImageSlotDef } from '@/lib/cms/registry';
import type { ImageAsset } from '@/types/cms';

type Fb = { type: 'ok' | 'err'; text: string } | null;

export default function SiteImagesEditor({
  slots,
  initial,
}: {
  slots: ImageSlotDef[];
  initial: Record<string, ImageAsset | null>;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [images, setImages] = useState(initial);
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [fb, setFb] = useState<Record<string, Fb>>({});

  const refresh = () => startTransition(() => router.refresh());

  async function save(key: string) {
    const image = images[key];
    if (!image) return;
    setBusy(key);
    setFb(f => ({ ...f, [key]: null }));
    try {
      await adminFetch('/api/admin/site-images', {
        method: 'PUT',
        body: JSON.stringify({ key, image }),
      });
      setDirty(d => ({ ...d, [key]: false }));
      setFb(f => ({ ...f, [key]: { type: 'ok', text: 'Imagem guardada.' } }));
      refresh();
    } catch (err) {
      setFb(f => ({
        ...f,
        [key]: { type: 'err', text: (err as Error).message },
      }));
    } finally {
      setBusy(null);
    }
  }

  async function reset(key: string) {
    if (!window.confirm('Repor a imagem original?')) return;
    setBusy(key);
    setFb(f => ({ ...f, [key]: null }));
    try {
      await adminFetch('/api/admin/site-images', {
        method: 'DELETE',
        body: JSON.stringify({ key }),
      });
      setImages(i => ({ ...i, [key]: null }));
      setDirty(d => ({ ...d, [key]: false }));
      setFb(f => ({
        ...f,
        [key]: { type: 'ok', text: 'Imagem original reposta.' },
      }));
      refresh();
    } catch (err) {
      setFb(f => ({
        ...f,
        [key]: { type: 'err', text: (err as Error).message },
      }));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow='Site'
        title='Outras imagens'
        description='Imagens usadas fora da homepage. "Repor original" volta ao ficheiro que está no código.'
      />
      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {slots.map(slot => {
          const current = images[slot.key];
          return (
            <Card key={slot.key}>
              <ImageUploader
                label={slot.label}
                spec={IMAGE_SPECS[slot.spec]}
                value={current ?? { url: slot.fallback }}
                folder='site'
                previewAspect={
                  slot.spec === 'logo' || slot.spec === 'profilePhoto'
                    ? '1/1'
                    : undefined
                }
                disabled={busy !== null}
                onChange={asset => {
                  setImages(i => ({ ...i, [slot.key]: asset }));
                  setDirty(d => ({ ...d, [slot.key]: true }));
                }}
                note={slot.description}
              />
              <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--color-gk-green-dark)]/8 pt-4'>
                <Button
                  onClick={() => save(slot.key)}
                  loading={busy === slot.key}
                  disabled={!dirty[slot.key] || busy !== null}
                  icon={<Check size={14} />}
                >
                  Guardar
                </Button>
                {current && !dirty[slot.key] && (
                  <Button
                    variant='ghost'
                    onClick={() => reset(slot.key)}
                    disabled={busy !== null}
                    icon={<RotateCcw size={14} />}
                  >
                    Repor original
                  </Button>
                )}
              </div>
              <div className='mt-2'>
                <Feedback state={fb[slot.key] ?? null} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

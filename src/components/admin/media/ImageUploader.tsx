// src/components/admin/media/ImageUploader.tsx
// Upload de imagem com pré-visualização e barra de progresso.
// O ficheiro vai DIRECTO do browser para o Cloudinary (upload assinado) —
// não passa pelo servidor Next, por isso não há limite de 4,5 MB da Vercel.
'use client';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, AlertTriangle, X } from 'lucide-react';
import type { ImageAsset, ImageSpec } from '@/types/cms';

const MAX_BYTES_DEFAULT = 8 * 1024 * 1024;

interface Props {
  label: string;
  spec: ImageSpec;
  value: ImageAsset | null;
  folder: 'hero' | 'site' | 'home';
  onChange: (asset: ImageAsset) => void;
  /** Mostra o botão "Remover" (só limpa o estado local — guardar é à parte). */
  onClear?: () => void;
  disabled?: boolean;
  /** Proporção da pré-visualização (ex.: '12/5'). Por omissão usa a do spec. */
  previewAspect?: string;
  maxBytes?: number;
  /** Nota curta de onde a imagem é usada. */
  note?: string;
}

interface SignResponse {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  uploadUrl: string;
  error?: string;
}

export default function ImageUploader({
  label,
  spec,
  value,
  folder,
  onChange,
  onClear,
  disabled,
  previewAspect,
  maxBytes = MAX_BYTES_DEFAULT,
  note,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const aspect = previewAspect ?? `${spec.width}/${spec.height}`;
  const previewSrc = localPreview ?? value?.url ?? null;
  const uploading = progress !== null;

  function readDimensions(file: File): Promise<{ w: number; h: number }> {
    return new Promise(resolve => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        resolve({ w: img.naturalWidth, h: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => resolve({ w: 0, h: 0 });
      img.src = url;
    });
  }

  async function handleFile(file: File) {
    setError(null);
    setWarning(null);

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!spec.formats.includes(ext)) {
      setError(
        `Formato não suportado (.${ext}). Usa: ${spec.formats.join(', ')}.`,
      );
      return;
    }
    if (file.size > maxBytes) {
      setError(
        `Ficheiro demasiado grande (${(file.size / 1024 / 1024).toFixed(1)} MB). Máximo ${Math.round(maxBytes / 1024 / 1024)} MB.`,
      );
      return;
    }

    // Aviso de proporção (não bloqueia — a imagem é recortada com object-cover)
    if (ext !== 'svg') {
      const { w, h } = await readDimensions(file);
      if (w && h) {
        const expected = spec.width / spec.height;
        const got = w / h;
        const diff = Math.abs(got - expected) / expected;
        if (diff > 0.05) {
          setWarning(
            `Esta imagem tem ${w} × ${h} px. O recomendado é ${spec.width} × ${spec.height} px — fora desta proporção vai ser recortada no site.`,
          );
        } else if (w < spec.width * 0.75) {
          setWarning(
            `Resolução baixa (${w} × ${h} px). Para ficar nítida, usa pelo menos ${spec.width} × ${spec.height} px.`,
          );
        }
      }
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setProgress(0);

    try {
      // 1) assinatura
      const signRes = await fetch('/api/admin/upload/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      });
      const sign = (await signRes.json()) as SignResponse;
      if (!signRes.ok)
        throw new Error(sign.error || 'Não foi possível assinar o upload.');

      // 2) upload directo com progresso (XHR — fetch não expõe progresso de envio)
      const asset = await new Promise<ImageAsset>((resolve, reject) => {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('api_key', sign.apiKey);
        fd.append('timestamp', String(sign.timestamp));
        fd.append('signature', sign.signature);
        fd.append('folder', sign.folder);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', sign.uploadUrl);
        xhr.upload.onprogress = e => {
          if (e.lengthComputable)
            setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText) as {
              secure_url?: string;
              public_id?: string;
              width?: number;
              height?: number;
              error?: { message?: string };
            };
            if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
              resolve({
                url: data.secure_url,
                publicId: data.public_id ?? null,
                width: data.width ?? null,
                height: data.height ?? null,
              });
            } else {
              reject(
                new Error(
                  data.error?.message || 'O Cloudinary rejeitou o ficheiro.',
                ),
              );
            }
          } catch {
            reject(new Error('Resposta inválida do Cloudinary.'));
          }
        };
        xhr.onerror = () => reject(new Error('Erro de rede durante o upload.'));
        xhr.send(fd);
      });

      onChange(asset);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload.');
      setLocalPreview(null);
      URL.revokeObjectURL(objectUrl);
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <div className='mb-1 flex items-center justify-between gap-2'>
        <label
          htmlFor={inputId}
          className='block text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'
        >
          {label}
        </label>
        {value?.width && value?.height ? (
          <span className='text-[11px] text-[var(--color-gk-cinza)]/80'>
            actual: {value.width} × {value.height} px
          </span>
        ) : null}
      </div>

      {/* Pré-visualização */}
      <div
        className='relative w-full overflow-hidden border border-[var(--color-gk-green-dark)]/10 bg-[var(--color-gk-creme)]'
        style={{ aspectRatio: aspect }}
      >
        {previewSrc ? (
          <Image
            src={previewSrc}
            alt=''
            fill
            unoptimized={previewSrc.startsWith('blob:')}
            sizes='(max-width: 768px) 100vw, 480px'
            className='object-cover object-center'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-[12px] text-[var(--color-gk-cinza)]'>
            Sem imagem
          </div>
        )}

        {uploading && (
          <div className='absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-[11px] text-white'>
            <div className='mb-1 flex justify-between'>
              <span>A enviar…</span>
              <span>{progress}%</span>
            </div>
            <div className='h-1 w-full bg-white/25'>
              <div
                className='h-1 bg-[var(--color-gk-ocre)] transition-[width]'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Medidas recomendadas — sempre visíveis */}
      <p className='mt-2 text-[12px] text-[var(--color-gk-cinza)]'>
        <span className='font-medium text-[var(--color-gk-black)]'>
          Medidas:
        </span>{' '}
        {spec.label}
      </p>
      {note && (
        <p className='mt-0.5 text-[12px] text-[var(--color-gk-cinza)]'>
          {note}
        </p>
      )}

      <div className='mt-3 flex flex-wrap items-center gap-2'>
        <input
          ref={inputRef}
          id={inputId}
          type='file'
          accept={spec.formats.map(f => `.${f}`).join(',')}
          className='sr-only'
          disabled={disabled || uploading}
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
          }}
        />
        <label
          htmlFor={inputId}
          className={`inline-flex cursor-pointer items-center gap-2 border border-[var(--color-gk-green-dark)]/25 bg-white px-4 py-2 text-[13px] font-medium text-[var(--color-gk-green-dark)] transition-opacity hover:opacity-90 ${
            disabled || uploading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <Upload size={14} />
          {value ? 'Substituir imagem' : 'Escolher imagem'}
        </label>
        {onClear && value && !uploading && (
          <button
            type='button'
            onClick={onClear}
            disabled={disabled}
            className='inline-flex items-center gap-1 text-[12px] text-[var(--color-gk-cinza)] hover:text-red-600'
          >
            <X size={12} /> Remover
          </button>
        )}
      </div>

      {warning && (
        <p className='mt-2 flex items-start gap-1.5 text-[12px] text-amber-700'>
          <AlertTriangle size={14} className='mt-0.5 shrink-0' />
          {warning}
        </p>
      )}
      {error && <p className='mt-2 text-[12px] text-red-600'>{error}</p>}
    </div>
  );
}

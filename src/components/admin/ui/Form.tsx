// src/components/admin/ui/Form.tsx
// Primitivas de formulário do admin — mesmo estilo do PriceEditor
// (creme + verde GrowKind, cantos rectos, bordas suaves).
'use client';

import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { Loader2 } from 'lucide-react';
import type { LocalizedString } from '@/types/cms';

const INPUT_CLS =
  'w-full border border-[var(--color-gk-green-dark)]/15 bg-white px-3 py-2 text-[14px] text-[var(--color-gk-black)] outline-none transition-colors placeholder:text-[var(--color-gk-cinza)]/60 focus:border-[var(--color-gk-green-dark)]/40 disabled:opacity-60';

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className='mb-1 block text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
      {children}
    </label>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <p className='mt-1 text-[12px] text-[var(--color-gk-cinza)]'>{children}</p>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`${INPUT_CLS} ${props.className ?? ''}`} />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`${INPUT_CLS} resize-y ${props.className ?? ''}`}
    />
  );
}

/** Dois campos lado a lado — PT (obrigatório) e EN (opcional, cai para PT). */
export function LocalizedField({
  label,
  value,
  onChange,
  kind = 'text',
  hint,
  placeholder,
  disabled,
}: {
  label: string;
  value: LocalizedString;
  onChange: (v: LocalizedString) => void;
  kind?: 'text' | 'textarea';
  hint?: string;
  placeholder?: Partial<LocalizedString>;
  disabled?: boolean;
}) {
  const Comp = kind === 'textarea' ? TextArea : TextInput;
  return (
    <div>
      <Label>{label}</Label>
      <div className='grid gap-3 sm:grid-cols-2'>
        <div>
          <Comp
            value={value.pt}
            placeholder={placeholder?.pt ?? 'Português'}
            disabled={disabled}
            onChange={e => onChange({ ...value, pt: e.target.value })}
          />
          <span className='mt-1 block text-[10px] uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]/70'>
            PT
          </span>
        </div>
        <div>
          <Comp
            value={value.en}
            placeholder={placeholder?.en ?? 'English (opcional)'}
            disabled={disabled}
            onChange={e => onChange({ ...value, en: e.target.value })}
          />
          <span className='mt-1 block text-[10px] uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]/70'>
            EN
          </span>
        </div>
      </div>
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  loading,
  icon,
  ...rest
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
  icon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50';
  const styles: Record<typeof variant, string> = {
    primary: 'bg-[var(--color-gk-green-dark)] text-white',
    secondary:
      'border border-[var(--color-gk-green-dark)]/25 bg-white text-[var(--color-gk-green-dark)]',
    danger: 'border border-red-200 bg-white text-red-700',
    ghost:
      'text-[var(--color-gk-cinza)] hover:text-[var(--color-gk-green-dark)]',
  };
  return (
    <button
      type='button'
      {...rest}
      disabled={rest.disabled || loading}
      className={`${base} ${styles[variant]} ${rest.className ?? ''}`}
    >
      {loading ? <Loader2 size={14} className='animate-spin' /> : icon}
      {children}
    </button>
  );
}

export function Feedback({
  state,
}: {
  state: { type: 'ok' | 'err'; text: string } | null;
}) {
  if (!state) return null;
  return (
    <p
      role='status'
      className={`text-[12px] ${
        state.type === 'ok'
          ? 'text-[var(--color-gk-green-dark)]'
          : 'text-red-600'
      }`}
    >
      {state.text}
    </p>
  );
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-[var(--color-gk-green-dark)]/8 bg-white p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className='mb-5'>
      <span className='eyebrow'>{eyebrow}</span>
      <h2 className='mt-2 text-[clamp(1.2rem,2vw,1.5rem)]'>{title}</h2>
      {description && (
        <p className='mt-1 text-[14px] text-[var(--color-gk-cinza)]'>
          {description}
        </p>
      )}
    </div>
  );
}

/** Helper comum: fetch JSON com erro legível. */
export async function adminFetch<T = Record<string, unknown>>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || `Erro (${res.status}).`);
  return data;
}

'use client';

import { useLocale, type Locale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
] as const;

type Variant = 'onLight' | 'onDark';

// onLight  -> navbar opaca (fundo branco): pílula verde, texto branco.
// onDark   -> navbar transparente (sobre a imagem do hero): pílula branca, texto verde.
export default function LanguageToggle({
  variant = 'onLight',
}: {
  variant?: Variant;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const activeIndex = LOCALES.findIndex(l => l.code === locale);
  const onDark = variant === 'onDark';

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    // Mantém a mesma rota, só troca o locale (e o prefixo /en).
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role='group'
      aria-label='Selecionar idioma / Select language'
      data-pending={isPending ? '' : undefined}
      className={[
        'relative inline-flex items-center rounded-full border p-0.5',
        'text-xs font-semibold tracking-wide select-none',
        'transition-colors duration-500 data-[pending]:opacity-60',
        onDark
          ? 'border-white/30 bg-white/10 backdrop-blur-sm'
          : 'border-black/10 bg-black/[0.04]',
      ].join(' ')}
    >
      {/* Pílula deslizante */}
      <span
        aria-hidden
        className={[
          'absolute top-0.5 bottom-0.5 left-0.5 rounded-full shadow-sm',
          'transition-transform duration-300 ease-out motion-reduce:transition-none',
          onDark ? 'bg-white' : 'bg-[#1a5c2a]',
        ].join(' ')}
        style={{
          width: `calc((100% - 0.25rem) / ${LOCALES.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {LOCALES.map(l => {
        const isActive = l.code === locale;
        const textClass = isActive
          ? onDark
            ? 'text-[#1a5c2a]'
            : 'text-white'
          : onDark
            ? 'text-white/80 hover:text-white'
            : 'text-black/55 hover:text-black/80';

        return (
          <button
            key={l.code}
            type='button'
            onClick={() => switchTo(l.code)}
            aria-pressed={isActive}
            lang={l.code}
            className={[
              'relative z-10 w-9 rounded-full py-1 text-center',
              'outline-offset-2 transition-colors duration-300',
              'focus-visible:outline-2 focus-visible:outline-[#1a5c2a]',
              textClass,
            ].join(' ')}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}

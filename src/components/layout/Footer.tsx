import Link from 'next/link';
import { useTranslations } from 'next-intl';

const legalLinks = [
  { key: 'privacidade', href: '/privacidade' },
  { key: 'termos', href: '/termos' },
  { key: 'cookies', href: '/cookies' },
  { key: 'devolucoes', href: '/devolucoes' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-gk-green-light)]/30 bg-[var(--color-gk-creme)]">
      <div className="page-width py-12 md:py-16">
        {/* Logo e descrição */}
        <div className="mb-8">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-gk-green-dark)]">
            GrowKind
            <span className="font-light text-[var(--color-gk-ocre)]">
              {' '}
              World
            </span>
          </p>
          <p className="mt-2 max-w-md text-sm text-[var(--color-gk-black)]/60">
            Projecto educativo e editorial dedicado à infância
            neurodivergente.
          </p>
        </div>

        {/* Linha separadora */}
        <div className="mb-6 h-px bg-[var(--color-gk-green-dark)]/10" />

        {/* Legal + Copyright */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links legais">
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-[var(--color-gk-black)]/50 transition-colors hover:text-[var(--color-gk-green-dark)]"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-[var(--color-gk-black)]/40">
            © {ano} GrowKind World. {t('direitos')}
          </p>
        </div>
      </div>
    </footer>
  );
}

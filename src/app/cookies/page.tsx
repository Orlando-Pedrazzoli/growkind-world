import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return (
    <section className="section-padding">
      <div className="content-width">
        <h1 className="text-[var(--color-gk-green-dark)]">Política de Cookies</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--color-gk-black)]/70">
          <p>Conteúdo em preparação. O texto final será fornecido pelo João.</p>
        </div>
      </div>
    </section>
  );
}

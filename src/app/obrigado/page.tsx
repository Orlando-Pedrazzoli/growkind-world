import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Obrigado',
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">Obrigado!</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[var(--color-gk-black)]/70">
          O seu guia está a caminho. Verifique a sua caixa de email — incluindo
          a pasta de spam, por precaução.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm font-medium text-[var(--color-gk-green-dark)] underline underline-offset-4"
        >
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compra Confirmada',
  robots: { index: false, follow: false },
};

export default function ObrigadoCompraPage() {
  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">Obrigado pela sua compra!</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[var(--color-gk-black)]/70">
          A sua encomenda foi registada e será processada em breve.
          Receberá um email com os detalhes e o tracking do envio.
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

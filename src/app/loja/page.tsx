import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loja',
  description: 'Produtos GrowKind — t-shirts, sweaters e acessórios com identidade.',
};

export default function LojaPage() {
  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">Loja GrowKind</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-[var(--color-gk-black)]/70">
          Produtos com identidade. T-shirts, sweaters e acessórios que
          comunicam uma visão diferente sobre infância e neurodiversidade.
        </p>
        <p className="mt-12 text-sm text-[var(--color-gk-black)]/40">
          Integração Printful + Stripe em preparação — Sprint 4
        </p>
      </div>
    </section>
  );
}

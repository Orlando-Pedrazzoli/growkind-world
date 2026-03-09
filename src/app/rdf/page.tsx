import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RDF & Cursos',
  description: 'Relational Development Framework — o framework pedagógico da GrowKind. Cursos para famílias e profissionais.',
};

export default function RDFPage() {
  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">
          Relational Development Framework
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base italic text-[var(--color-gk-ocre)]">
          O framework pedagógico da GrowKind
        </p>
        <p className="mt-12 text-sm text-[var(--color-gk-black)]/40">
          Diagrama interactivo e cursos em preparação — Sprint 3
        </p>
      </div>
    </section>
  );
}

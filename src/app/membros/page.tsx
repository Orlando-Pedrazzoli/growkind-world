import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Área de Membros',
  robots: { index: false, follow: false },
};

export default function MembrosPage() {
  return (
    <section className="section-padding">
      <div className="content-width text-center">
        <h1 className="text-[var(--color-gk-green-dark)]">Área de Membros</h1>
        <p className="mt-6 text-lg text-[var(--color-gk-black)]/70">
          Em breve. A área de membros será activada com o lançamento dos cursos.
        </p>
      </div>
    </section>
  );
}

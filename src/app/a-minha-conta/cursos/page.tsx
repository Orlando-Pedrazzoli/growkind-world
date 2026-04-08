import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Os meus cursos',
  robots: { index: false, follow: false },
};

export default function MyCoursesPage() {
  // TODO: Quando o sistema de cursos estiver implementado,
  // buscar cursos do utilizador via session.user.id

  return (
    <section className='section-padding'>
      <div className='content-width-wide'>
        {/* Voltar */}
        <Link
          href='/a-minha-conta'
          className='inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          <ArrowLeft size={16} strokeWidth={1.5} />A minha conta
        </Link>

        {/* Header */}
        <div className='mb-12 mt-6'>
          <span className='eyebrow'>Formação</span>
          <h1 className='mt-4'>Os meus cursos</h1>
        </div>

        {/* Empty state */}
        <div className='flex flex-col items-center border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center md:py-24'>
          <div
            className='flex h-16 w-16 items-center justify-center'
            style={{ backgroundColor: 'rgba(78,126,167,0.1)' }}
          >
            <GraduationCap
              size={32}
              strokeWidth={1.5}
              style={{ color: 'var(--color-rdf-m2)' }}
            />
          </div>

          <h2 className='mt-8 text-[clamp(1.25rem,2.5vw,1.75rem)]'>
            Ainda não tens cursos
          </h2>

          <p className='mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-gk-cinza)]'>
            Quando os cursos estiverem disponíveis, vais poder acompanhar o teu
            progresso e aceder ao conteúdo aqui.
          </p>

          <Link href='/rdf' className='btn-primary mt-8'>
            Conhecer o RDF
          </Link>
        </div>
      </div>
    </section>
  );
}

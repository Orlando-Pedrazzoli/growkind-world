import { GraduationCap, Upload, Users, Award } from 'lucide-react';

export default function AdminCoursesPage() {
  // TODO: Quando os cursos forem carregados via contratos de dados,
  // listar cursos com estatísticas de inscrições e progresso

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Formação</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Cursos</h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          Gestão dos cursos, inscrições e certificados.
        </p>
      </div>

      {/* Status cards */}
      <div className='mb-8 grid gap-4 sm:grid-cols-4'>
        {[
          {
            label: 'Cursos',
            value: '—',
            sub: 'Por criar',
            icon: GraduationCap,
          },
          {
            label: 'Inscritos',
            value: '—',
            sub: 'Por implementar',
            icon: Users,
          },
          {
            label: 'Certificados',
            value: '—',
            sub: 'Por implementar',
            icon: Award,
          },
          {
            label: 'Receita',
            value: '—',
            sub: 'Stripe por ligar',
            icon: Upload,
          },
        ].map(card => (
          <div
            key={card.label}
            className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  {card.label}
                </p>
                <p className='mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-gk-green-dark)]'>
                  {card.value}
                </p>
                <p className='mt-1 text-[12px] text-[var(--color-gk-cinza)]'>
                  {card.sub}
                </p>
              </div>
              <card.icon
                size={22}
                strokeWidth={1.5}
                className='text-[var(--color-rdf-m2)] opacity-30'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Curso Zero */}
      <div className='mb-6 border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='eyebrow'>Prioridade 1</span>
            <h2 className='mt-2 text-[clamp(1.125rem,2vw,1.5rem)]'>
              Curso Zero — Instalar a Lente RDF
            </h2>
            <p className='mt-2 text-[14px] text-[var(--color-gk-cinza)]'>
              Experiência imersiva gratuita · SPA · Onboarding + conversão
            </p>
          </div>
          <span className='inline-block bg-[var(--color-gk-ocre)]/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--color-gk-ocre)]'>
            Pendente
          </span>
        </div>
      </div>

      {/* Cursos pagos */}
      <div className='border border-dashed border-[var(--color-gk-green-dark)]/15 bg-white p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='eyebrow'>Fase seguinte</span>
            <h2 className='mt-2 text-[clamp(1.125rem,2vw,1.5rem)]'>
              Cursos Pagos
            </h2>
            <p className='mt-2 text-[14px] text-[var(--color-gk-cinza)]'>
              Estrutura modular · Equivalência CPD UK · Stripe
            </p>
          </div>
          <span className='inline-block bg-[var(--color-gk-cinza)]/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--color-gk-cinza)]'>
            Futuro
          </span>
        </div>
      </div>

      {/* Próximos passos */}
      <div className='mt-8 border-l-2 border-[var(--color-gk-ocre)] pl-5'>
        <p className='text-[13px] font-medium text-[var(--color-gk-green-dark)]'>
          Próximos passos:
        </p>
        <ol className='mt-3 space-y-2 text-[13px] text-[var(--color-gk-cinza)]'>
          <li>1. João entrega o fluxo do Curso Zero no formato CourseStep</li>
          <li>2. Orlando implementa a SPA com quiz engine e progresso</li>
          <li>3. Testar feedback AI (opcional) e geração de certificado</li>
          <li>4. Integrar Stripe para cursos pagos</li>
        </ol>
      </div>
    </div>
  );
}

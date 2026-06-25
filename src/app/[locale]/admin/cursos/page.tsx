// src/app/[locale]/admin/cursos/page.tsx
import { GraduationCap, Layers, Users, TrendingUp } from 'lucide-react';
import { todosOsCursos } from '@/lib/data/cursos';
import { getPricesMap } from '@/lib/prices';
import { formatMoney } from '@/lib/products';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

export default async function AdminCursosPage() {
  await connectDB();

  // Inscritos (compras concluídas) por curso
  const [profCount, famCount] = await Promise.all([
    Purchase.countDocuments({ product: 'curso-prof', status: 'completed' }),
    Purchase.countDocuments({ product: 'curso-fam', status: 'completed' }),
  ]);
  const enrolledByKey: Record<'curso-prof' | 'curso-fam', number> = {
    'curso-prof': profCount,
    'curso-fam': famCount,
  };
  const totalEnrolled = profCount + famCount;

  // Receita real dos cursos (soma dos valores efetivamente pagos)
  const receitaAgg = await Purchase.aggregate([
    {
      $match: {
        product: { $in: ['curso-prof', 'curso-fam'] },
        status: 'completed',
      },
    },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  const receita = receitaAgg[0]?.total || 0;

  // Preços ao vivo (BD)
  const prices = await getPricesMap();

  const totalCursos = todosOsCursos.length;
  const totalModulos = todosOsCursos.reduce((s, c) => s + c.modulos.length, 0);

  const cards = [
    {
      label: 'Cursos',
      value: String(totalCursos),
      sub: 'publicados',
      icon: GraduationCap,
    },
    {
      label: 'Módulos',
      value: String(totalModulos),
      sub: 'no total',
      icon: Layers,
    },
    {
      label: 'Inscritos',
      value: String(totalEnrolled),
      sub: 'compras concluídas',
      icon: Users,
    },
    {
      label: 'Receita',
      value: formatMoney(receita),
      sub: 'cursos',
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Formação</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Cursos</h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          Gestão dos cursos, módulos e inscrições.
        </p>
      </div>

      {/* Status cards */}
      <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {cards.map(card => (
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
                className='text-[var(--color-gk-ocre)] opacity-30'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Por curso */}
      <div className='space-y-6'>
        {todosOsCursos.map(curso => {
          const inscritos = enrolledByKey[curso.productKey];
          const precoFmt = formatMoney(prices[curso.productKey]);
          const gratuitos = curso.modulos.filter(m => m.gratuito).length;

          return (
            <div
              key={curso.slug}
              className='border border-[var(--color-gk-green-dark)]/8 bg-white'
            >
              {/* Cabeçalho do curso */}
              <div className='flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-gk-green-dark)]/8 p-6'>
                <div>
                  <p
                    className='text-[11px] font-medium uppercase tracking-[0.14em]'
                    style={{ color: curso.accentColor }}
                  >
                    {curso.subtitulo}
                  </p>
                  <h2 className='mt-1 text-[clamp(1.1rem,1.8vw,1.4rem)]'>
                    {curso.nome}
                  </h2>
                </div>
                <div className='flex items-center gap-6 text-right'>
                  <div>
                    <p className='text-[11px] uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                      Preço
                    </p>
                    <p className='mt-0.5 text-[15px] font-semibold text-[var(--color-gk-green-dark)]'>
                      {precoFmt}
                    </p>
                  </div>
                  <div>
                    <p className='text-[11px] uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                      Inscritos
                    </p>
                    <p className='mt-0.5 text-[15px] font-semibold text-[var(--color-gk-green-dark)]'>
                      {inscritos}
                    </p>
                  </div>
                  <div>
                    <p className='text-[11px] uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                      Módulos
                    </p>
                    <p className='mt-0.5 text-[15px] font-semibold text-[var(--color-gk-green-dark)]'>
                      {curso.modulos.length}{' '}
                      <span className='text-[12px] font-normal text-[var(--color-gk-cinza)]'>
                        ({gratuitos} grátis)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulos */}
              <div className='divide-y divide-[var(--color-gk-green-dark)]/5'>
                {curso.modulos.map(modulo => (
                  <div
                    key={modulo.slug}
                    className='flex items-center justify-between gap-4 px-6 py-4'
                  >
                    <div className='flex items-center gap-4'>
                      <span className='flex h-7 w-7 flex-shrink-0 items-center justify-center bg-[var(--color-gk-creme)] text-[12px] font-semibold text-[var(--color-gk-green-dark)]'>
                        {modulo.numero}
                      </span>
                      <div>
                        <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                          {modulo.titulo}
                        </p>
                        <p className='text-[12px] text-[var(--color-gk-cinza)]'>
                          {modulo.duracao}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${
                        modulo.gratuito
                          ? 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                          : 'bg-[var(--color-gk-ocre)]/10 text-[var(--color-gk-ocre)]'
                      }`}
                    >
                      {modulo.gratuito ? 'Grátis' : 'Pago'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nota de gestão */}
      <p className='mt-4 text-[12px] leading-relaxed text-[var(--color-gk-cinza)]'>
        O conteúdo dos cursos é gerido em código (
        <code className='text-[var(--color-gk-green-dark)]'>
          src/lib/data/cursos.ts
        </code>
        ). Os preços são editáveis na página{' '}
        <strong className='text-[var(--color-gk-green-dark)]'>Preços</strong>.
      </p>
    </div>
  );
}

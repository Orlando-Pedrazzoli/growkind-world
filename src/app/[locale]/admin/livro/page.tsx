// src/app/[locale]/admin/livro/page.tsx
import { BookOpen, Eye, Clock, Lock } from 'lucide-react';
import {
  bookIndex,
  chaptersMap,
  previewChapterIds,
  bookMeta,
} from '@/lib/book-data';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

type Row = { id: string; label: string; part: string | null };

// Achata o índice: cada entrada do bookIndex é uma Part (com capítulos)
// ou um capítulo solto (ex.: introdução). Usa type guard, sem casts.
function buildRows(): Row[] {
  const rows: Row[] = [];

  for (const section of bookIndex) {
    if ('chapters' in section && Array.isArray(section.chapters)) {
      const partLabel = section.label ?? null;
      for (const ch of section.chapters) {
        rows.push({
          id: ch.id,
          label: ch.label ?? ch.id,
          part: partLabel,
        });
      }
    } else {
      rows.push({
        id: section.id,
        label: section.label ?? section.id,
        part: null,
      });
    }
  }

  return rows;
}

function formatMinutes(total: number): string {
  if (total <= 0) return '—';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h}h ${m}min` : `${m} min`;
}

export default async function AdminBookPage() {
  await connectDB();

  // Leitores com acesso pago ao ebook (compras concluídas)
  const ebookReaders = await Purchase.countDocuments({
    product: 'ebook',
    status: 'completed',
  });

  const rows = buildRows();
  const total = rows.length;
  const freeCount = previewChapterIds.length;

  const totalMinutes = rows.reduce((sum, r) => {
    const mins = chaptersMap[r.id]?.estimatedMinutes ?? 0;
    return sum + (Number.isFinite(mins) ? mins : 0);
  }, 0);

  const cards = [
    {
      label: 'Capítulos',
      value: String(total),
      sub: 'no livro',
      icon: BookOpen,
    },
    {
      label: 'Gratuitos',
      value: String(freeCount),
      sub: 'em pré-visualização',
      icon: Eye,
    },
    {
      label: 'Tempo de leitura',
      value: formatMinutes(totalMinutes),
      sub: 'total estimado',
      icon: Clock,
    },
    {
      label: 'Leitores',
      value: String(ebookReaders),
      sub: 'com acesso comprado',
      icon: Lock,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Conteúdo</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Livro</h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          {bookMeta.title} · {total} capítulos
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

      {/* Lista de capítulos */}
      <div className='overflow-x-auto border border-[var(--color-gk-green-dark)]/8 bg-white'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-[var(--color-gk-green-dark)]/10'>
              {['#', 'Capítulo', 'Parte', 'Tempo', 'Acesso'].map(h => (
                <th
                  key={h}
                  className='px-5 py-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const chapter = chaptersMap[row.id];
              const isFree = previewChapterIds.includes(row.id);
              const minutes = chapter?.estimatedMinutes ?? 0;
              const titulo = chapter?.title ?? row.label;

              return (
                <tr
                  key={row.id}
                  className='border-b border-[var(--color-gk-green-dark)]/5 transition-colors hover:bg-[var(--color-gk-creme)]/30'
                >
                  <td className='px-5 py-4 text-[13px] text-[var(--color-gk-cinza)]'>
                    {i + 1}
                  </td>
                  <td className='px-5 py-4'>
                    <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                      {titulo}
                    </p>
                  </td>
                  <td className='px-5 py-4 text-[13px] text-[var(--color-gk-cinza)]'>
                    {row.part || '—'}
                  </td>
                  <td className='px-5 py-4 text-[13px] text-[var(--color-gk-cinza)]'>
                    {minutes ? `${minutes} min` : '—'}
                  </td>
                  <td className='px-5 py-4'>
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${
                        isFree
                          ? 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                          : 'bg-[var(--color-gk-ocre)]/10 text-[var(--color-gk-ocre)]'
                      }`}
                    >
                      {isFree ? 'Grátis' : 'Pago'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Nota de gestão */}
      <p className='mt-4 text-[12px] leading-relaxed text-[var(--color-gk-cinza)]'>
        O conteúdo dos capítulos é gerido em código (
        <code className='text-[var(--color-gk-green-dark)]'>
          src/lib/book-data/
        </code>
        ). Esta página reflete o estado atual do livro publicado na área do
        cliente.
      </p>
    </div>
  );
}

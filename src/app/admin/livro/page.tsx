import { BookOpen, Upload, Eye } from 'lucide-react';

export default function AdminBookPage() {
  // TODO: Quando o livro for carregado via contratos de dados,
  // listar capítulos com estatísticas de leitura

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Conteúdo</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Livro</h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          Gestão dos capítulos e acesso ao livro web.
        </p>
      </div>

      {/* Status cards */}
      <div className='mb-8 grid gap-4 sm:grid-cols-3'>
        {[
          {
            label: 'Capítulos',
            value: '—',
            sub: 'Por carregar',
            icon: BookOpen,
          },
          {
            label: 'Leitores activos',
            value: '—',
            sub: 'Por implementar',
            icon: Eye,
          },
          {
            label: 'Último upload',
            value: '—',
            sub: 'Nenhum',
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
                className='text-[var(--color-gk-ocre)] opacity-30'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className='flex flex-col items-center border border-dashed border-[var(--color-gk-green-dark)]/15 bg-white px-6 py-16 text-center'>
        <div
          className='flex h-16 w-16 items-center justify-center'
          style={{ backgroundColor: 'rgba(232,148,58,0.08)' }}
        >
          <Upload
            size={28}
            strokeWidth={1.5}
            style={{ color: 'var(--color-gk-ocre)' }}
          />
        </div>

        <h2 className='mt-6 text-[clamp(1.125rem,2vw,1.5rem)]'>
          Conteúdo do livro por carregar
        </h2>

        <p className='mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[var(--color-gk-cinza)]'>
          O João precisa de entregar o conteúdo dos capítulos usando o contrato
          de dados (
          <code className='text-[13px] text-[var(--color-gk-green-dark)]'>
            book.ts
          </code>
          ). Após recebido, os capítulos aparecerão aqui para gestão.
        </p>

        <div className='mt-8 flex flex-col gap-3 text-left'>
          <p className='text-[13px] text-[var(--color-gk-cinza)]'>
            <span className='font-medium text-[var(--color-gk-green-dark)]'>
              Próximos passos:
            </span>
          </p>
          <ol className='space-y-2 text-[13px] text-[var(--color-gk-cinza)]'>
            <li>1. João entrega os capítulos no formato BookChapter</li>
            <li>
              2. Orlando integra em{' '}
              <code className='text-[var(--color-gk-green-dark)]'>
                src/lib/data/book-chapters.ts
              </code>
            </li>
            <li>3. Capítulos ficam acessíveis na área do cliente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

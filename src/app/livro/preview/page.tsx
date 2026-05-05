// src/app/livro/preview/page.tsx

import type { Metadata } from 'next';
import { previewChapterIds } from '@/lib/book-data';
import BookReader from '@/components/book/BookReader';

export const metadata: Metadata = {
  title: 'Onde o Mundo Nasce Entre Nós — Preview',
  description:
    'Leia os primeiros capítulos do livro de João Pereira sobre desenvolvimento e autismo. Acesso gratuito à Introdução, Abertura da Parte I e Capítulo 1.',
  // Indexável: queremos que o Google encontre o preview
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Onde o Mundo Nasce Entre Nós — Preview',
    description:
      'Os primeiros capítulos do livro de João Pereira sobre o desenvolvimento da criança autista.',
    type: 'book',
  },
};

interface PageProps {
  searchParams: Promise<{ capitulo?: string }>;
}

export default async function BookPreviewPage({ searchParams }: PageProps) {
  const { capitulo } = await searchParams;

  // Capítulo inicial: o que vem da URL (se for um dos preview), senão introducao
  const initialChapterId =
    capitulo && previewChapterIds.includes(capitulo) ? capitulo : 'introducao';

  return (
    <BookReader
      initialChapterId={initialChapterId}
      hasFullAccess={false}
      previewChapterIds={previewChapterIds}
    />
  );
}

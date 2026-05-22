// src/app/a-minha-conta/livro/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { hasAccess } from '@/lib/access';
import { chaptersMap, previewChapterIds } from '@/lib/book-data';
import BookReader from '@/components/book/BookReader';

export const metadata: Metadata = {
  title: 'O meu livro',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ capitulo?: string }>;
}

export default async function MyBookPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login?next=/a-minha-conta/livro');
  }

  // Verifica acesso (admin OU compra do ebook)
  const allowed = await hasAccess(session.user.email, 'ebook');

  const { capitulo } = await searchParams;

  // Determinar capítulo inicial
  // - Se URL tem ?capitulo=X e existe → usa esse
  // - Senão → primeiro capítulo (introdução)
  const initialChapterId =
    capitulo && chaptersMap[capitulo] ? capitulo : 'introducao';

  // Se não tem acesso, redirecionar para preview público (3 primeiros capítulos)
  if (!allowed) {
    redirect('/livro/preview');
  }

  return (
    <BookReader
      initialChapterId={initialChapterId}
      hasFullAccess={true}
      previewChapterIds={previewChapterIds}
    />
  );
}

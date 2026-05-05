// src/app/a-minha-conta/livro/page.tsx

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import { chaptersMap, previewChapterIds } from '@/lib/book-data';
import BookReader from '@/components/book/BookReader';

export const metadata: Metadata = {
  title: 'O meu livro',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ capitulo?: string }>;
}

async function hasBookAccess(email: string): Promise<boolean> {
  await connectDB();
  const purchase = await Purchase.findOne({
    userEmail: email.toLowerCase(),
    product: 'ebook',
    status: 'completed',
  });
  return !!purchase;
}

export default async function MyBookPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login?next=/a-minha-conta/livro');
  }

  const hasAccess = await hasBookAccess(session.user.email);
  const { capitulo } = await searchParams;

  // Determinar capítulo inicial
  // - Se URL tem ?capitulo=X e existe → usa esse
  // - Senão → primeiro capítulo (introdução)
  const initialChapterId =
    capitulo && chaptersMap[capitulo] ? capitulo : 'introducao';

  // Se não tem acesso, redirecionar para preview
  // (preview público mostra os 3 primeiros capítulos)
  if (!hasAccess) {
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

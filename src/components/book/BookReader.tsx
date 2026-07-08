// src/components/book/BookReader.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReadingView from './ReadingView';
import { getBook } from '@/lib/book-data/i18n';
import './reading.css';

interface BookReaderProps {
  initialChapterId: string;
  hasFullAccess: boolean;
  previewChapterIds: string[];
  locale: string;
}

export default function BookReader({
  initialChapterId,
  hasFullAccess,
  previewChapterIds,
  locale,
}: BookReaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mapa de capítulos resolvido para o idioma actual (EN cai no PT se faltar).
  const { chaptersMap } = useMemo(() => getBook(locale), [locale]);

  const [currentChapterId, setCurrentChapterId] = useState(initialChapterId);

  // Quando a URL muda (ex.: navegação back/forward), reflete na UI
  useEffect(() => {
    const urlChapter = searchParams.get('capitulo');
    if (
      urlChapter &&
      chaptersMap[urlChapter] &&
      urlChapter !== currentChapterId
    ) {
      setCurrentChapterId(urlChapter);
    }
  }, [searchParams, currentChapterId]);

  function handleChapterChange(chapterId: string) {
    if (!chaptersMap[chapterId]) return;

    const chapter = chaptersMap[chapterId];

    // Se o utilizador é só preview e o capítulo é 'full' — redireciona para compra
    if (!hasFullAccess && chapter.access === 'full') {
      router.push('/comprar/ebook');
      return;
    }

    setCurrentChapterId(chapterId);

    // Atualizar URL sem recarregar a página (shallow)
    const url = new URL(window.location.href);
    url.searchParams.set('capitulo', chapterId);
    window.history.replaceState({}, '', url.toString());
  }

  const chapter = chaptersMap[currentChapterId] || chaptersMap['introducao'];

  return (
    <ReadingView
      chapter={chapter}
      hasFullAccess={hasFullAccess}
      onChapterChange={handleChapterChange}
      locale={locale}
    />
  );
}

// src/app/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import Hero from '@/components/home/Hero';
import Aterrissagem from '@/components/home/Aterrissagem';
import SeccaoLivro from '@/components/home/SeccaoLivro';
import OQueVimos from '@/components/home/OQueVimos';
import OQueAcreditamos from '@/components/home/OQueAcreditamos';
import OQueFazemos from '@/components/home/OQueFazemos';
import ParaQuem from '@/components/home/ParaQuem';
import QuandoAdulto from '@/components/home/QuandoAdulto';
import OLivro from '@/components/home/OLivro';
import FrameworkRDF from '@/components/home/FrameworkRDF';
import CapturaLista from '@/components/home/CapturaLista';
import { getLocale } from 'next-intl/server';
import {
  getHeroSlides,
  getSiteImages,
  getSectionTexts,
} from '@/lib/cms/content';
import type { Locale } from '@/types/cms';

export const metadata: Metadata = buildPageMetadata({
  title: 'GrowKind World — Educação que cresce com a criança',
  description:
    'Projecto educativo e editorial dedicado à infância neurodivergente. Livro, cursos e recursos para famílias e profissionais que valorizam compreensão antes da intervenção.',
  path: '/',
  keywords: [
    'neurodivergência',
    'autismo',
    'desenvolvimento infantil',
    'educação inclusiva',
    'João Pereira',
    'Relational Development Framework',
    'RDF',
    'cursos para pais',
    'cursos teaching assistants',
  ],
});

export default async function HomePage() {
  // Conteúdo editável no admin (Homepage). Com a BD vazia devolve os
  // valores originais — a página é SSG e é revalidada a cada gravação.
  const locale = (await getLocale()) as Locale;
  const [slides, images, bookTexts, rdfTexts] = await Promise.all([
    getHeroSlides(locale),
    getSiteImages(),
    getSectionTexts('home.bookSection', locale),
    getSectionTexts('home.rdfSection', locale),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <Aterrissagem />
      <SeccaoLivro />
      <OQueVimos />
      <OQueAcreditamos />
      <OQueFazemos />
      <ParaQuem />
      <QuandoAdulto />
      <OLivro coverUrl={images['book.cover']} texts={bookTexts} />
      <FrameworkRDF imageUrl={images['home.rdf']} texts={rdfTexts} />
      <CapturaLista />
    </>
  );
}

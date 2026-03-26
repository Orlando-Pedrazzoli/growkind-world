import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'GrowKind World — Educação que cresce com a criança',
  description:
    'Projecto educativo e editorial dedicado à infância neurodivergente. Livro, cursos e recursos para famílias e profissionais.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Aterrissagem />
      <SeccaoLivro />
      <OQueVimos />
      <OQueAcreditamos />
      <OQueFazemos />
      <ParaQuem />
      <QuandoAdulto />
      <OLivro />
      <FrameworkRDF />
      <CapturaLista />
    </>
  );
}

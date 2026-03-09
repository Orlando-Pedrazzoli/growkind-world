import type { Metadata } from 'next';
import { getPageBlocks, blocksToMap } from '@/lib/content';
import Hero from '@/components/home/Hero';
import Aterrissagem from '@/components/home/Aterrissagem';
import SeccaoLivro from '@/components/home/SeccaoLivro';
import SeccaoRDF from '@/components/home/SeccaoRDF';
import SeccaoLoja from '@/components/home/SeccaoLoja';
import CapturaEmail from '@/components/home/CapturaEmail';
import Fechamento from '@/components/home/Fechamento';

export const metadata: Metadata = {
  title: 'GrowKind World — Educação que cresce com a criança',
  description:
    'Projecto educativo e editorial dedicado à infância neurodivergente. Livro, cursos e recursos para famílias e profissionais.',
};

// Fallback content para quando a DB não tem dados (ou seed não correu)
const fallbackBlocks: Record<string, { titulo?: string; subtitulo?: string; corpo?: string; ctaTexto?: string; ctaLink?: string; imagemId?: string }> = {
  hero: {
    titulo: 'Educação que cresce com a criança',
    subtitulo: 'Um projecto para quem acredita que cada criança merece ser compreendida antes de ser corrigida.',
    imagemId: 'growkind/hero-forest-sprout',
  },
  aterrissagem: {
    titulo: 'Bem-vindo ao GrowKind World',
    corpo: 'O GrowKind World é um universo educativo dedicado à infância neurodivergente. Aqui, não vendemos fórmulas — oferecemos um olhar diferente.\n\nCriado por João Pereira, educador com mais de 20 anos de experiência com crianças autistas e neurodivergentes, o GrowKind nasce da convicção de que a educação precisa de mais silêncio, mais observação e menos pressa.\n\nEste é um espaço para famílias e profissionais que querem compreender antes de intervir.',
  },
  'seccao-livro': {
    titulo: 'O Livro',
    corpo: 'O primeiro livro do universo GrowKind. Uma obra que convida pais e profissionais a olhar para o comportamento da criança como linguagem — não como problema.\n\nEscrito com a profundidade de quem trabalha no terreno e a clareza de quem quer ser compreendido por todos.',
    ctaTexto: 'Saber mais sobre o livro',
    ctaLink: '/o-livro',
    imagemId: 'growkind/book-cover',
  },
  'seccao-rdf': {
    titulo: 'Relational Development Framework',
    subtitulo: 'O framework pedagógico da GrowKind',
    corpo: 'O RDF é uma abordagem prática para compreender e acompanhar o desenvolvimento relacional da criança. Estruturado em três movimentos — Ler o Campo, Sustentar o Processo e Coordenar sem Controlar — oferece um mapa para profissionais e famílias.\n\nOs cursos RDF estão em preparação. Entre na lista de espera para ser o primeiro a saber.',
    ctaTexto: 'Conhecer o RDF',
    ctaLink: '/rdf',
  },
  'seccao-loja': {
    titulo: 'Loja GrowKind',
    corpo: 'Produtos com identidade. T-shirts, sweaters e acessórios que comunicam uma visão diferente sobre infância e neurodiversidade.\n\nCada peça é produzida sob encomenda, com impressão de qualidade e envio para toda a Europa.',
    ctaTexto: 'Visitar a loja',
    ctaLink: '/loja',
  },
  'captura-email': {
    titulo: 'Receba o guia gratuito',
    subtitulo: '5 Formas de Ler o Comportamento do Seu Filho de Outra Forma — um PDF prático, directo ao ponto.',
    ctaTexto: 'Quero receber o guia',
  },
  fechamento: {
    titulo: 'Cada criança é um mundo. Cabe-nos aprender a sua língua.',
    subtitulo: 'João Pereira',
  },
};

export default async function HomePage() {
  let blocks: Record<string, any>;

  try {
    const dbBlocks = await getPageBlocks('home');
    blocks = dbBlocks.length > 0 ? blocksToMap(dbBlocks) : fallbackBlocks;
  } catch {
    // Se a DB não estiver acessível, usar fallback
    blocks = fallbackBlocks;
  }

  // Helper para montar um bloco com defaults
  const b = (id: string) => ({
    pageSlug: 'home',
    blockId: id,
    lang: 'pt' as const,
    ordem: 0,
    activo: true,
    ...fallbackBlocks[id],
    ...(blocks[id] || {}),
  });

  return (
    <>
      <Hero block={b('hero')} />
      <Aterrissagem block={b('aterrissagem')} />
      <SeccaoLivro block={b('seccao-livro')} />
      <SeccaoRDF block={b('seccao-rdf')} />
      <SeccaoLoja block={b('seccao-loja')} />
      <CapturaEmail block={b('captura-email')} />
      <Fechamento block={b('fechamento')} />
    </>
  );
}

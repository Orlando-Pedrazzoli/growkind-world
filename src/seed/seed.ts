/**
 * GROWKIND WORLD — SEED SCRIPT
 *
 * Popula a base de dados com conteúdo inicial.
 * Executar: npm run seed
 *
 * NOTA: Requer MONGODB_URI no .env.local
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import ContentBlockModel from '../models/ContentBlock';
import CourseModel from '../models/Course';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI não definida no .env.local');
  process.exit(1);
}

// ---- Blocos da Home ----

const homeBlocks = [
  {
    pageSlug: 'home',
    blockId: 'hero',
    lang: 'pt',
    titulo: 'Educação que cresce com a criança',
    subtitulo:
      'Um projecto para quem acredita que cada criança merece ser compreendida antes de ser corrigida.',
    imagemId: 'growkind/hero-forest-sprout',
    ordem: 0,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'aterrissagem',
    lang: 'pt',
    titulo: 'Bem-vindo ao GrowKind World',
    corpo: `O GrowKind World é um universo educativo dedicado à infância neurodivergente. Aqui, não vendemos fórmulas — oferecemos um olhar diferente.

Criado por João Pereira, educador com mais de 20 anos de experiência com crianças autistas e neurodivergentes, o GrowKind nasce da convicção de que a educação precisa de mais silêncio, mais observação e menos pressa.

Este é um espaço para famílias e profissionais que querem compreender antes de intervir.`,
    ordem: 1,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'seccao-livro',
    lang: 'pt',
    titulo: 'O Livro',
    corpo: `O primeiro livro do universo GrowKind. Uma obra que convida pais e profissionais a olhar para o comportamento da criança como linguagem — não como problema.

Escrito com a profundidade de quem trabalha no terreno e a clareza de quem quer ser compreendido por todos.`,
    ctaTexto: 'Saber mais sobre o livro',
    ctaLink: '/o-livro',
    imagemId: 'growkind/book-cover',
    ordem: 2,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'seccao-rdf',
    lang: 'pt',
    titulo: 'Relational Development Framework',
    subtitulo: 'O framework pedagógico da GrowKind',
    corpo: `O RDF é uma abordagem prática para compreender e acompanhar o desenvolvimento relacional da criança. Estruturado em três movimentos — Ler o Campo, Sustentar o Processo e Coordenar sem Controlar — oferece um mapa para profissionais e famílias.

Os cursos RDF estão em preparação. Entre na lista de espera para ser o primeiro a saber.`,
    ctaTexto: 'Conhecer o RDF',
    ctaLink: '/rdf',
    ordem: 3,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'seccao-loja',
    lang: 'pt',
    titulo: 'Loja GrowKind',
    corpo: `Produtos com identidade. T-shirts, sweaters e acessórios que comunicam uma visão diferente sobre infância e neurodiversidade.

Cada peça é produzida sob encomenda, com impressão de qualidade e envio para toda a Europa.`,
    ctaTexto: 'Visitar a loja',
    ctaLink: '/loja',
    ordem: 4,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'captura-email',
    lang: 'pt',
    titulo: 'Receba o guia gratuito',
    subtitulo:
      '5 Formas de Ler o Comportamento do Seu Filho de Outra Forma — um PDF prático, directo ao ponto.',
    ctaTexto: 'Quero receber o guia',
    ordem: 5,
    activo: true,
  },
  {
    pageSlug: 'home',
    blockId: 'fechamento',
    lang: 'pt',
    titulo: 'Cada criança é um mundo. Cabe-nos aprender a sua língua.',
    subtitulo: 'João Pereira',
    ordem: 6,
    activo: true,
  },
];

// ---- Cursos RDF (estado: em-breve) ----

const courses = [
  {
    slug: 'curso-movimento-1',
    titulo: 'Ler o Campo',
    movimento: 'M1',
    publico: ['familias', 'profissionais'],
    duracao: '6 módulos',
    formato: 'online',
    estado: 'em-breve',
    descricao:
      'Aprender a observar antes de intervir. Este curso ensina a ler os sinais relacionais, sensoriais e emocionais que a criança comunica — antes de qualquer diagnóstico ou rótulo.',
    ctaTexto: 'Entrar na lista de espera',
    ctaLink: '#lista-espera',
    lang: 'pt',
    ordem: 1,
    activo: true,
  },
  {
    slug: 'curso-movimento-2',
    titulo: 'Sustentar o Processo',
    movimento: 'M2',
    publico: ['familias', 'profissionais'],
    duracao: '6 módulos',
    formato: 'online',
    estado: 'em-breve',
    descricao:
      'Estar presente sem dirigir. Este curso aborda como manter a presença adulta como suporte — sem invadir, sem abandonar, sem apressar o ritmo da criança.',
    ctaTexto: 'Entrar na lista de espera',
    ctaLink: '#lista-espera',
    lang: 'pt',
    ordem: 2,
    activo: true,
  },
  {
    slug: 'curso-movimento-3',
    titulo: 'Coordenar sem Controlar',
    movimento: 'M3',
    publico: ['profissionais'],
    duracao: '6 módulos',
    formato: 'online',
    estado: 'em-breve',
    descricao:
      'Liderar com leveza. Para profissionais que coordenam equipas, espaços e intervenções — e precisam de um modelo relacional de liderança educativa.',
    ctaTexto: 'Entrar na lista de espera',
    ctaLink: '#lista-espera',
    lang: 'pt',
    ordem: 3,
    activo: true,
  },
];

// ---- Blocos de outras páginas ----

const otherPageBlocks = [
  // Página: O Livro
  {
    pageSlug: 'o-livro',
    blockId: 'hero',
    lang: 'pt',
    titulo: 'O Livro',
    subtitulo:
      'Uma obra que convida a olhar para o comportamento da criança como linguagem.',
    imagemId: 'growkind/book-cover',
    ordem: 0,
    activo: true,
  },
  // Página: Sobre
  {
    pageSlug: 'sobre',
    blockId: 'hero',
    lang: 'pt',
    titulo: 'Sobre João Pereira',
    subtitulo:
      'Educador, autor e fundador do GrowKind World. Mais de 20 anos dedicados à infância neurodivergente.',
    ordem: 0,
    activo: true,
  },
  {
    pageSlug: 'sobre',
    blockId: 'bio',
    lang: 'pt',
    titulo: 'Percurso',
    corpo: `João Pereira é educador com mais de duas décadas de experiência no acompanhamento de crianças e jovens neurodivergentes. O seu percurso passou pelo Brasil, pelo Reino Unido e por Portugal — três contextos que moldaram uma visão singular sobre educação, autismo e desenvolvimento relacional.

Fundou o GrowKind World como resposta a uma convicção simples: antes de corrigir, precisamos de compreender. Antes de intervir, precisamos de observar. Antes de ensinar, precisamos de aprender a língua da criança.

O RDF — Relational Development Framework — é o resultado desse percurso. Um modelo prático, acessível e profundo, dirigido a famílias e profissionais que recusam as fórmulas fáceis.`,
    ordem: 1,
    activo: true,
  },
];

// ---- Execução ----

async function seed() {
  console.log('🌱 A iniciar seed do GrowKind World...\n');

  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Ligado ao MongoDB\n');

    // ContentBlocks
    console.log('📄 A popular blocos de conteúdo...');
    await ContentBlockModel.deleteMany({});
    const allBlocks = [...homeBlocks, ...otherPageBlocks];
    await ContentBlockModel.insertMany(allBlocks);
    console.log(`   → ${allBlocks.length} blocos inseridos\n`);

    // Courses
    console.log('🎓 A popular cursos RDF...');
    await CourseModel.deleteMany({});
    await CourseModel.insertMany(courses);
    console.log(`   → ${courses.length} cursos inseridos\n`);

    console.log('🌿 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

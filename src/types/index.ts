/* ============================================
   GROWKIND WORLD — TIPOS GLOBAIS
   Fonte de verdade para toda a aplicação
   Alinhado com mockup RDF do João Pereira
   ============================================ */

// ---- Blocos de conteúdo (páginas dinâmicas) ----

export interface ContentBlock {
  _id?: string;
  pageSlug: string;
  blockId: string;
  lang: 'pt' | 'en';
  titulo?: string;
  subtitulo?: string;
  corpo?: string;
  ctaTexto?: string;
  ctaLink?: string;
  imagemId?: string;
  ordem: number;
  activo: boolean;
}

// ---- Cursos RDF ----

export type MovimentoRDF = 'M1' | 'M2' | 'M3' | 'MT';
export type EstadoCurso =
  | 'em-breve'
  | 'inscricoes-abertas'
  | 'a-decorrer'
  | 'concluido';
export type PublicoCurso =
  | 'familias'
  | 'teaching-assistants'
  | 'professores'
  | 'terapeutas';

export interface Course {
  _id?: string;
  slug: string;
  titulo: string;
  movimento: MovimentoRDF;
  publico: PublicoCurso[];
  duracao: string;
  formato: 'online' | 'presencial' | 'hibrido';
  estado: EstadoCurso;
  descricao: string;
  descricaoLonga?: string;
  ctaTexto: string;
  ctaLink: string;
  imagemId?: string;
  preco?: number;
  moeda?: string;
  lang: 'pt' | 'en';
  ordem: number;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---- Produtos (Loja POD) ----

export type CategoriaLoja = 'vestuario' | 'acessorios';
export type EstadoProduto = 'activo' | 'inactivo' | 'esgotado';

export interface ProductVariant {
  tamanho: string;
  cor?: string;
  printfulVariantId: string;
  preco: number;
  disponivel: boolean;
}

export interface Product {
  _id?: string;
  slug: string;
  nome: string;
  descricao: string;
  categoria: CategoriaLoja;
  variantes: ProductVariant[];
  imagens: string[];
  printfulProductId: string;
  preco: number;
  moeda: string;
  estado: EstadoProduto;
  destaque: boolean;
  ordem: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---- Ordens ----

export type EstadoOrdem =
  | 'pendente'
  | 'pago'
  | 'em-producao'
  | 'enviado'
  | 'entregue'
  | 'cancelado';

export interface OrderItem {
  productId: string;
  nome: string;
  variante: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Order {
  _id?: string;
  stripeSessionId: string;
  printfulOrderId?: string;
  email: string;
  nome: string;
  itens: OrderItem[];
  subtotal: number;
  envio: number;
  total: number;
  moeda: string;
  estado: EstadoOrdem;
  morada: {
    linha1: string;
    linha2?: string;
    cidade: string;
    codigoPostal: string;
    pais: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// ---- Blog ----

export type EstadoArtigo = 'publicado' | 'rascunho';

export interface BlogPost {
  _id?: string;
  slug: string;
  titulo: string;
  resumo: string;
  corpo: string;
  autor: string;
  dataPublicacao: Date;
  categoria?: string;
  tags: string[];
  imagemDestaque?: string;
  estado: EstadoArtigo;
  lang: 'pt' | 'en';
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---- Leads (Email) ----

export type PerfilLead =
  | 'pai-mae'
  | 'teaching-assistant'
  | 'professor'
  | 'psicologo-terapeuta'
  | 'outro-profissional';

export interface Lead {
  _id?: string;
  nome: string;
  email: string;
  perfil?: PerfilLead;
  origem: string;
  brevoContactId?: string;
  consentimento: boolean;
  createdAt?: Date;
}

// ---- Utilizadores (preparação fase 2) ----

export type PlanoUtilizador = 'gratuito' | 'basico' | 'premium';

export interface User {
  _id?: string;
  email: string;
  nome: string;
  cursosInscritos: string[];
  plano: PlanoUtilizador;
  authProvider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---- RDF Movimentos (para diagrama interactivo) ----

export interface MovimentoRDFData {
  key: 'm1' | 'm2' | 'm3' | 'mt';
  codigo: string;
  titulo: string;
  subtitulo: string;
  cor: string;
  descricao: string[];
  publico: string[];
}

// ---- Navegação ----

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ---- SEO ----

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

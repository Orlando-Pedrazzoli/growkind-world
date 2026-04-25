// src/lib/data/cursos.ts

export interface Modulo {
  numero: 1 | 2 | 3 | 4;
  slug: string;
  titulo: string;
  tituloLinhas?: {
    primeira: string;
    segunda?: string;
    emphasis?: 'primeira' | 'segunda';
  };
  lead: string;
  duracao: string;
  gratuito: boolean;
  htmlPath: string;
  capaPath: string;
}

export interface Curso {
  slug: 'profissionais' | 'familias';
  nome: string;
  subtitulo: string;
  publico: string;
  descricao: string;
  intro: string[];
  accentColor: string;
  capaPrincipal: string;
  modulos: Modulo[];
  // Compra
  productKey: 'curso-prof' | 'curso-fam'; // chave em Purchase.product
  preco: number; // em cêntimos (€)
  precoEur: string; // string formatada para UI ("€49")
}

// =============================================================================
// CURSO: PROFISSIONAIS (GrowKind TA)
// =============================================================================
export const cursoProfissionais: Curso = {
  slug: 'profissionais',
  nome: 'GrowKind TA',
  subtitulo: 'Para Profissionais',
  publico: 'Educadores, teaching assistants e profissionais de apoio educativo',
  descricao:
    'Compreender o Relational Development Framework — a lente, os princípios, os movimentos — com profundidade teórica e aplicação guiada no contexto da sala de aula e do apoio educativo.',
  intro: [
    'Um percurso em quatro módulos para quem acompanha crianças neurodivergentes em contexto educativo. Não é uma formação sobre técnicas — é um deslocamento de olhar.',
    'Cada módulo instala uma lente de observação nova, construída sobre a anterior. No fim, o adulto não se torna especialista. Torna-se eixo.',
  ],
  accentColor: '#c4a44a',
  capaPrincipal: '/cursos/capas/cz-m1-prof.svg',
  productKey: 'curso-prof',
  preco: 4900, // €49
  precoEur: '€49',
  modulos: [
    {
      numero: 1,
      slug: 'm1',
      titulo: 'Antes de qualquer técnica',
      tituloLinhas: {
        primeira: 'Antes de qualquer',
        segunda: 'técnica',
        emphasis: 'primeira',
      },
      lead: 'A lente antes de qualquer intervenção. Três situações reais de sala de aula — responda com o que faria de verdade.',
      duracao: '1h30',
      gratuito: true,
      htmlPath: '/cursos/profissionais/cz-m1-prof.html',
      capaPath: '/cursos/capas/cz-m1-prof.svg',
    },
    {
      numero: 2,
      slug: 'm2',
      titulo: 'O que você está vendo, exactamente',
      tituloLinhas: {
        primeira: 'O que você está',
        segunda: 'vendo, exactamente',
        emphasis: 'segunda',
      },
      lead: 'Ver vs. observar — no corpo. O instrumento para registar a resposta, de forma transferível entre todos os adultos em torno da criança.',
      duracao: '1h20',
      gratuito: false,
      htmlPath: '/api/curso/profissionais/m2', // rota protegida
      capaPath: '/cursos/capas/cz-m2-prof.svg',
    },
    {
      numero: 3,
      slug: 'm3',
      titulo: 'A sua presença já é a intervenção',
      tituloLinhas: {
        primeira: 'A sua presença',
        segunda: 'já é a intervenção',
        emphasis: 'primeira',
      },
      lead: 'Não começa com teoria. Começa com o que já sabe fazer — mas ainda não sabe que é co-regulação.',
      duracao: '1h30',
      gratuito: false,
      htmlPath: '/api/curso/profissionais/m3',
      capaPath: '/cursos/capas/cz-m3-prof.svg',
    },
    {
      numero: 4,
      slug: 'm4',
      titulo: 'O adulto não se torna especialista. Torna-se eixo.',
      tituloLinhas: {
        primeira: 'O adulto não se torna',
        segunda: 'especialista. Torna-se eixo.',
        emphasis: 'segunda',
      },
      lead: 'Integração dos três módulos anteriores. Antes de ver como se articulam — teste o que já ficou automático.',
      duracao: '1h30',
      gratuito: false,
      htmlPath: '/api/curso/profissionais/m4',
      capaPath: '/cursos/capas/cz-m4-prof.svg',
    },
  ],
};

// =============================================================================
// CURSO: FAMÍLIAS (GrowKind Famílias)
// =============================================================================
export const cursoFamilias: Curso = {
  slug: 'familias',
  nome: 'GrowKind Famílias',
  subtitulo: 'Para famílias',
  publico: 'Pais, mães e cuidadores de crianças neurodivergentes',
  descricao:
    'Acompanhar uma criança neurodivergente no dia-a-dia. Ferramentas práticas, casos reais e espaço para perguntas. Um percurso pensado para quem vive o desenvolvimento de dentro.',
  intro: [
    'Um percurso em quatro módulos para quem acompanha, todos os dias, uma criança neurodivergente. Não é um manual. É um deslocamento de olhar.',
    'Cada módulo parte do que já sente — porque o seu corpo já sabe o que a teoria vai confirmar.',
  ],
  accentColor: '#7aab96',
  capaPrincipal: '/cursos/capas/cz-m1-fam.svg',
  productKey: 'curso-fam',
  preco: 2900, // €29
  precoEur: '€29',
  modulos: [
    {
      numero: 1,
      slug: 'm1',
      titulo: 'Você não estava fazendo errado',
      tituloLinhas: {
        primeira: 'Você não estava',
        segunda: 'fazendo errado',
        emphasis: 'segunda',
      },
      lead: 'Três situações reais. Responda com o que faria de verdade — não com o que acha que devia fazer.',
      duracao: '1h',
      gratuito: true,
      htmlPath: '/cursos/familias/cz-m1-fam.html',
      capaPath: '/cursos/capas/cz-m1-fam.svg',
    },
    {
      numero: 2,
      slug: 'm2',
      titulo: 'Os três elementos — a criança, o ambiente e você',
      tituloLinhas: {
        primeira: 'Os três elementos —',
        segunda: 'a criança, o ambiente e você',
        emphasis: 'segunda',
      },
      lead: 'Uma forma de ver o que acontece à volta do comportamento — sem o reduzir a culpa, a falha ou a diagnóstico.',
      duracao: '1h30',
      gratuito: false,
      htmlPath: '/api/curso/familias/m2',
      capaPath: '/cursos/capas/cz-m2-fam.svg',
    },
    {
      numero: 3,
      slug: 'm3',
      titulo: 'Quando o seu filho perde o chão',
      tituloLinhas: {
        primeira: 'Quando o seu filho',
        segunda: 'perde o chão',
        emphasis: 'segunda',
      },
      lead: 'Não começa com teoria. Começa com o que já sente — porque o seu corpo já sabe o que o módulo vai confirmar.',
      duracao: '1h15',
      gratuito: false,
      htmlPath: '/api/curso/familias/m3',
      capaPath: '/cursos/capas/cz-m3-fam.svg',
    },
    {
      numero: 4,
      slug: 'm4',
      titulo: 'Não é uma técnica nova. É um modo diferente de permanecer.',
      tituloLinhas: {
        primeira: 'Não é uma técnica nova.',
        segunda: 'É um modo diferente de permanecer.',
        emphasis: 'segunda',
      },
      lead: 'Antes de continuar — uma situação real. Para verificar o que os três módulos anteriores já instalaram no seu olhar.',
      duracao: '1h30',
      gratuito: false,
      htmlPath: '/api/curso/familias/m4',
      capaPath: '/cursos/capas/cz-m4-fam.svg',
    },
  ],
};

export const cursos = {
  profissionais: cursoProfissionais,
  familias: cursoFamilias,
} as const;

export const todosOsCursos: Curso[] = [cursoProfissionais, cursoFamilias];

// Mapa productKey → curso (útil em /api/checkout)
export const cursosPorProductKey: Record<'curso-prof' | 'curso-fam', Curso> = {
  'curso-prof': cursoProfissionais,
  'curso-fam': cursoFamilias,
};

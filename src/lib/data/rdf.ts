// ============================================
// GrowKind World — Dados da página /rdf
// Textos aprovados pelo João Pereira
// ============================================

export const RDF_QUESTION =
  'O que está a acontecer entre esta criança e o ambiente — e onde o adulto se encaixa agora?';

export const RDF_AXIOM =
  'Desenvolvimento não se resolve. Desenvolvimento acompanha-se.';

export interface RDFElement {
  key: string;
  icon: string;
  title: string;
  subtitle: string;
  role: string;
  desc: string;
  reads: string[];
  quote: string;
}

export const RDF_ELEMENTS: RDFElement[] = [
  {
    key: 'child',
    icon: '🧒',
    title: 'A Criança',
    subtitle: 'partida',
    role: 'O comportamento é sempre efeito — nunca ponto de partida',
    desc:
      'O RDF começa pela criança — mas não pelo comportamento que mostra.' +
      ' Começa pelo estado interno que produz esse comportamento.',
    reads: [
      'Estado regulatório — regulado, mobilizado, sobrecarregado, hipoactivado',
      'Perfil sensorial — o que chega forte, o que chega suave',
      'Capacidade disponível — o que o campo consegue processar agora',
      'Energia — não é preguiça, é capacidade real disponível',
    ],
    quote:
      '"O que se vê do lado de fora costuma ser chamado de comportamento.' +
      ' O que não se vê é o esforço imenso para manter alguma continuidade por dentro."',
  },
  {
    key: 'environment',
    icon: '🏠',
    title: 'O Ambiente',
    subtitle: 'participa',
    role: 'O espaço modula o campo antes de qualquer instrução',
    desc:
      'O ambiente não é o pano de fundo — é um participante activo que' +
      ' facilita ou sobrecarrega o sistema nervoso antes de qualquer palavra.',
    reads: [
      'Estimulação sensorial — luz, som, densidade, temperatura',
      'Organização espacial — bordas, previsibilidade, pontos de apoio',
      'Previsibilidade da rotina — o que o corpo já sabe que vem a seguir',
      'Exigências do momento — o que está a ser pedido agora',
    ],
    quote:
      '"Ao entrar em um espaço, permita que o olhar percorra o ambiente devagar.' +
      ' Às vezes, ajustar um único detalhe já devolve conforto."',
  },
  {
    key: 'adult',
    icon: '🧑',
    title: 'O Adulto',
    subtitle: 'lê e ajusta',
    role: 'Presença é a intervenção — antes de qualquer técnica',
    desc: 'O adulto lê-se a si próprio por último — porque é o mais fácil de ignorar.',
    reads: [
      'Presença corporal e ritmo — o que o corpo comunica antes das palavras',
      'Tom de voz e velocidade — o SN da criança lê isto directamente',
      'Expectativas transmitidas — o que está implícito na minha presença',
      'Estado emocional próprio — a minha regulação é a minha intervenção',
    ],
    quote:
      '"A regulação do próprio adulto é a intervenção.' +
      ' Um sistema nervoso maduro que empresta organização."',
  },
];

export interface RDFMovement {
  number: number;
  color: string;
  title: string;
  role: string;
  when: string;
  desc: string;
  items: string[];
  quote: string;
}

export const RDF_MOVEMENTS: RDFMovement[] = [
  {
    number: 1,
    color: '#4a7c59',
    title: 'Habitar o Mundo',
    role: 'Ser Chão',
    when: 'Quando o campo pede regulação',
    desc:
      'O adulto torna-se presença reguladora antes de qualquer instrução.' +
      ' Regulação ANTES de instrução — sempre. Nunca insistir em tarefa com campo desregulado.',
    items: [
      'Reduzir estimulação antes de qualquer instrução verbal',
      'Ajustar o ritmo e a proximidade do próprio corpo',
      'Oferecer previsibilidade — não explicação',
      'Permanecer quando tudo acelera — presença é a intervenção',
    ],
    quote:
      '"Ser chão é tudo o que o outro precisa para voltar a existir no espaço."',
  },
  {
    number: 2,
    color: '#3a5f8a',
    title: 'Agir no Mundo',
    role: 'Ser Estrutura',
    when: 'Quando o campo pede estrutura',
    desc:
      'Oferece enquadramento que permite a acção. Empresta o começo sem fazer pela criança.' +
      ' Três momentos: iniciar, sustentar, terminar.',
    items: [
      'Iniciar — emprestar o primeiro passo sem fazer o caminho inteiro',
      'Sustentar — tornar-se presença âncora quando a acção se dissolve',
      'Terminar — sinalizar transições antes de chegarem',
      'Estrutura que liberta ≠ rigidez que prende',
    ],
    quote:
      '"Emprestar o começo não é fazer pela criança. É entrar exactamente onde o peso está maior."',
  },
  {
    number: 3,
    color: '#8b6914',
    title: 'Encontrar o Outro',
    role: 'Ser Mediador',
    when: 'Quando o campo pede relação',
    desc:
      'Medeia o encontro sem forçar nem substituir. Três níveis:' +
      ' outro como obstáculo → referência → mente própria.',
    items: [
      'Nível 1: outro como obstáculo funcional — não forçar interacção',
      'Nível 2: outro como referência responsiva — dar tempo à observação',
      'Nível 3: outro como mente própria — mediar o encontro',
      'Nunca aplicar mediação de Nível 3 a uma criança no Nível 1',
    ],
    quote:
      '"O outro não começa a existir quando é compreendido. Começa a existir quando interfere."',
  },
  {
    number: 4,
    color: '#a07828',
    title: 'Coordenar o Campo',
    role: 'Ser Eixo',
    when: 'Movimento transversal — pertence ao adulto',
    desc: 'Garante coerência entre todos os adultos. Não é liderança — é coerência de leitura.',
    items: [
      'Eixo entre educadores, família e terapeutas',
      'Tem autoridade de observação que nenhum relatório clínico tem',
      'Vê o dia real da criança — o entre que os outros não vêem',
      'Não é o mais qualificado — é o que tem os dados que os outros não têm',
    ],
    quote: '"O adulto não se torna especialista. Torna-se eixo."',
  },
];

export const RDF_DEFINITION = {
  isNot: [
    'uma terapia',
    'um protocolo de intervenção',
    'um método de modificação comportamental',
    'um sistema de avaliação ou diagnóstico',
    'um substituto das abordagens existentes (PBS, ABA, DIR...)',
    'uma sequência de etapas a percorrer',
  ],
  is: [
    'uma lente de leitura do campo relacional',
    'uma linguagem comum entre adultos',
    'o nível anterior à decisão de resposta',
    'uma metodologia aprofundável via formação',
    'o que precede qualquer intervenção — não o que a substitui',
    'uma forma de ler que muda o que se oferece',
  ],
};

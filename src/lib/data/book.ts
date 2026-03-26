// ============================================
// GrowKind World — Dados da página /o-livro
// Textos aprovados pelo João Pereira
// ============================================

export interface BookEdition {
  format: 'ebook' | 'kindle' | 'physical';
  label: string;
  sublabel: string;
  price: string;
  icon: string;
  href: string;
  style: 'primary' | 'secondary' | 'ghost';
}

export const BOOK_EDITIONS: BookEdition[] = [
  {
    format: 'ebook',
    label: 'eBook · PDF + ePub',
    sublabel: 'Acesso imediato — no site',
    price: '€12',
    icon: '📱',
    href: '/comprar/ebook',
    style: 'primary',
  },
  {
    format: 'kindle',
    label: 'Kindle · Amazon',
    sublabel: 'Leitura no Kindle ou app Amazon',
    price: '€9.99',
    icon: '📖',
    href: 'https://amazon.com/dp/XXXXXXXXX',
    style: 'secondary',
  },
  {
    format: 'physical',
    label: 'Livro Físico · Amazon',
    sublabel: 'Envio para PT, BR e resto do mundo',
    price: '€19.99',
    icon: '📗',
    href: 'https://amazon.com/dp/XXXXXXXXX',
    style: 'ghost',
  },
];

export interface BookPart {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  chapters: string[];
}

export const BOOK_PARTS: BookPart[] = [
  {
    number: 'I',
    label: 'PARTE I',
    title: 'Quando o mundo começa por dentro',
    subtitle: 'A experiência antes da ação',
    chapters: [
      'Quando o mundo muda de lugar',
      'Quando o mundo se sente primeiro',
      'Quando o corpo aprende onde está',
      'Quando o mundo perde direção',
      'Quando o mundo não faz sentido',
    ],
  },
  {
    number: 'II',
    label: 'PARTE II',
    title: 'Quando sentir não é o bastante',
    subtitle: 'Organizar para agir',
    chapters: [
      'Quando compreender não basta',
      'Quando o começo não se sustenta',
      'Quando a ação precisa de bordas',
      'Quando a palavra dá direção',
      'Quando o ritmo organiza o dia',
      'Quando o interesse dá direção',
    ],
  },
  {
    number: 'III',
    label: 'PARTE III',
    title: 'Quando o mundo deixa de responder do mesmo jeito',
    subtitle: 'A construção da relação',
    chapters: [
      'Quando a palavra cria ponte',
      'Quando o sentir ganha nome',
      'Quando a autonomia emerge',
      'Quando a identidade pode existir',
      'Quando o outro começa a ser referência',
      'Quando o outro ganha mente',
    ],
  },
];

export interface BookAudience {
  icon: string;
  title: string;
  description: string;
}

export const BOOK_AUDIENCES: BookAudience[] = [
  {
    icon: '👨‍👩‍👧',
    title: 'Para pais e famílias',
    description:
      'Que querem compreender antes de agir — e acompanhar antes de corrigir.',
  },
  {
    icon: '🏫',
    title: 'Para educadores',
    description:
      'Que ensinam sem apagar quem a criança é — e que buscam uma lente profissional sólida.',
  },
  {
    icon: '🩺',
    title: 'Para profissionais',
    description:
      'Que sabem que o desenvolvimento começa antes da técnica — e que querem coordenar em vez de fragmentar.',
  },
];

export const BOOK_EXCERPT = [
  'Há uma pergunta que atravessa este livro inteiro — não como tema a resolver, mas como orientação para o olhar.',
  'O que está acontecendo quando a criança age como age?',
  'Não "como faço isso parar?" — mas "o que isso está contando?"',
  'É uma distinção simples. Mas muda tudo.',
  'Quando a pergunta é "como faço isso parar?", o comportamento vira problema. O adulto vira solucionador. E a criança vira alguém que precisa ser corrigida.',
  'Quando a pergunta é "o que isso está contando?", o comportamento vira mensagem. O adulto vira leitor. E a criança vira alguém que está tentando, com os recursos que tem, manter algo organizado por dentro.',
  'Este livro se constrói a partir dessa segunda pergunta.',
  'Não é um manual. Não oferece protocolos nem listas de estratégias. Não promete transformar a criança em alguém mais fácil de acompanhar. O que propõe é mais exigente — e, na minha experiência, mais duradouro: um deslocamento de olhar.',
  'Ao longo de quase três décadas acompanhando crianças autistas, famílias e educadores — no Brasil, em Portugal, no Reino Unido — aprendi que o maior obstáculo raramente está na criança. Está na distância entre o que ela vive e a linguagem que os adultos ao redor usam para explicar o que veem.',
  'Essa distância produz mal-entendidos. Intervenções que chegam no momento errado. Exigências que chegam antes de o campo estar pronto para recebê-las. Adultos exaustos que tentam resolver o que precisaria ser acompanhado.',
  'Este livro é uma tentativa de reduzir essa distância.',
  'Cada capítulo acompanha um momento do desenvolvimento — não como etapa a cumprir, mas como território a reconhecer. Há coisas que o corpo da criança comunica antes de qualquer palavra. Há coisas que o ambiente oferece ou retira antes de qualquer instrução. Há coisas que a presença do adulto transmite antes de qualquer técnica.',
  'É nesse "antes" que este livro se instala.',
];

export const BOOK_QUOTE = 'O desenvolvimento não se resolve. Ele se acompanha.';

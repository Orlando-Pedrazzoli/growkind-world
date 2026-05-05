// ============================================================
// GrowKind — Dados do Livro · Onde o Mundo Nasce Entre Nós
// TEXTO SAGRADO — não modificar, reescrever ou simplificar
// ============================================================

import type { BookMeta, Part, Chapter } from './types';

export const bookMeta: BookMeta = {
  title: 'Onde o Mundo Nasce Entre Nós',
  subtitle: 'Um caminho partilhado no autismo infantil',
  author: 'João Pereira',
  year: 2026,
  isbn: 'a definir',
  edition: 'GrowKind · Lisboa, 2026',
  coverTagline:
    'Nem todo comportamento pede correção. Alguns pedem leitura, tempo e presença.',
};

// ── Estrutura de índice (para sidebar e acesso) ──────────
export const bookIndex = [
  { id: 'introducao', label: 'Introdução', access: 'preview' as const },
  {
    id: 'parte-1',
    label: 'Parte I — Quando o Mundo Começa por Dentro',
    chapters: [
      { id: 'abertura-1', label: 'Abertura', access: 'preview' as const },
      {
        id: 'cap-1',
        label: 'Cap. 1 — Quando o Mundo Muda de Lugar',
        access: 'preview' as const,
      },
      {
        id: 'cap-2',
        label: 'Cap. 2 — O Mundo que se Sente Primeiro',
        access: 'full' as const,
      },
      {
        id: 'cap-3',
        label: 'Cap. 3 — Quando o Corpo Aprende onde Está',
        access: 'full' as const,
      },
      {
        id: 'cap-4',
        label: 'Cap. 4 — Quando o Mundo Perde Direção',
        access: 'full' as const,
      },
      {
        id: 'cap-5',
        label: 'Cap. 5 — Quando o Mundo Não Faz Sentido',
        access: 'full' as const,
      },
      {
        id: 'enc-1',
        label: 'Encerramento da Parte I',
        access: 'full' as const,
      },
    ],
  },
  {
    id: 'parte-2',
    label: 'Parte II — Quando Sentir Não É o Bastante',
    chapters: [
      { id: 'abertura-2', label: 'Abertura', access: 'full' as const },
      {
        id: 'cap-6',
        label: 'Cap. 6 — Quando Compreender Não Basta',
        access: 'full' as const,
      },
      {
        id: 'cap-7',
        label: 'Cap. 7 — Quando o Começo Não se Sustenta',
        access: 'full' as const,
      },
      {
        id: 'cap-8',
        label: 'Cap. 8 — Quando a Ação Precisa de Bordas',
        access: 'full' as const,
      },
      {
        id: 'cap-9',
        label: 'Cap. 9 — Quando a Palavra Dá Direção',
        access: 'full' as const,
      },
      {
        id: 'cap-10',
        label: 'Cap. 10 — Quando o Ritmo Organiza o Dia',
        access: 'full' as const,
      },
      {
        id: 'cap-11',
        label: 'Cap. 11 — Quando o Interesse Dá Direção',
        access: 'full' as const,
      },
      {
        id: 'enc-2',
        label: 'Encerramento da Parte II',
        access: 'full' as const,
      },
    ],
  },
  {
    id: 'parte-3',
    label: 'Parte III — Quando o Mundo Deixa de Responder do Mesmo Jeito',
    chapters: [
      { id: 'abertura-3', label: 'Abertura', access: 'full' as const },
      {
        id: 'cap-12',
        label: 'Cap. 12 — Quando a Palavra Cria Ponte',
        access: 'full' as const,
      },
      {
        id: 'cap-13',
        label: 'Cap. 13 — Quando o Sentir Ganha Nome',
        access: 'full' as const,
      },
      {
        id: 'cap-14',
        label: 'Cap. 14 — Quando a Autonomia Emerge',
        access: 'full' as const,
      },
      {
        id: 'cap-15',
        label: 'Cap. 15 — Quando a Identidade Pode Existir',
        access: 'full' as const,
      },
      {
        id: 'cap-16',
        label: 'Cap. 16 — Quando o Mundo Não Responde Como Sempre Respondeu',
        access: 'full' as const,
      },
      {
        id: 'cap-17',
        label: 'Cap. 17 — Quando o Outro Começa a Ser Referência',
        access: 'full' as const,
      },
      {
        id: 'cap-18',
        label: 'Cap. 18 — Quando o Outro Pode Existir Sem Estar Presente',
        access: 'full' as const,
      },
      {
        id: 'cap-19',
        label: 'Cap. 19 — Quando o Outro Ganha Mente',
        access: 'full' as const,
      },
      {
        id: 'enc-3',
        label: 'Encerramento da Parte III',
        access: 'full' as const,
      },
    ],
  },
  {
    id: 'parte-final',
    label: 'Cap. 20 — Quando o Adulto Passa a Ver',
    chapters: [
      {
        id: 'cap-20',
        label: 'Cap. 20 — Quando o Adulto Passa a Ver',
        access: 'full' as const,
      },
    ],
  },
  {
    id: 'anexos',
    label: 'Posfácio e Anexos',
    chapters: [
      {
        id: 'glossario',
        label: 'Glossário Técnico-Científico',
        access: 'full' as const,
      },
      {
        id: 'fundamentos',
        label: 'Nota de Fundamentação Científica',
        access: 'full' as const,
      },
      { id: 'autor', label: 'Sobre o Autor', access: 'full' as const },
    ],
  },
];

// ── Capítulos com conteúdo completo ──────────────────────
// Nota para Orlando: cada chapter.blocks contém o texto
// exacto do livro em blocos tipados. Adicionar os restantes
// capítulos seguindo o mesmo padrão.

export const introducao: Chapter = {
  id: 'introducao',
  slug: 'introducao',
  number: 0,
  partId: 'intro',
  title: 'Introdução',
  subtitle: 'Um convite para ver de novo',
  access: 'preview',
  estimatedMinutes: 8,
  blocks: [
    {
      type: 'paragraph',
      text: 'Este livro foi escrito para adultos que convivem, cuidam, ensinam ou acompanham crianças autistas. Pessoas que estão dentro do processo — pais, mães, cuidadores, professores, terapeutas — e não apenas observando de fora.',
    },
    {
      type: 'paragraph',
      text: 'Ele não se propõe a explicar o autismo como diagnóstico, nem a organizar comportamentos em listas de sintomas. Também não foi pensado como manual de aplicação, protocolo fechado ou método a ser seguido passo a passo. Ele nasce de outro lugar.',
    },
    {
      type: 'paragraph',
      text: 'O que sustenta este livro é uma pergunta mais fundamental: o que está acontecendo quando a criança age como age?',
    },
    {
      type: 'paragraph',
      text: 'Ao longo destas páginas, o comportamento é lido como resposta. Cada repetição, cada insistência, cada retirada, cada pausa carrega uma função. O gesto não surge como erro, mas como tentativa de manter algo vivo: o corpo, a ação, o eixo, a relação.',
    },
    {
      type: 'paragraph',
      text: 'Desde o início, este livro parte da compreensão de que o desenvolvimento acontece de forma não linear. Ele se constrói no corpo, no tempo, no contato com objetos e, progressivamente, na relação com o outro.',
    },
    {
      type: 'paragraph',
      text: 'Cada criança percorre esse caminho de maneira singular, com avanços, recuos e pausas que fazem parte do processo real. Por isso, os capítulos não se organizam como uma sequência obrigatória, mas como campos que se abrem, se cruzam e se aprofundam.',
    },
    {
      type: 'paragraph',
      text: 'Uma criança pode estar muito avançada em um aspecto e ainda precisar de sustentação básica em outro. Esse movimento desigual faz parte de um desenvolvimento vivo.',
    },
    {
      type: 'paragraph',
      text: 'Ao adulto, este livro propõe outro lugar. Não o de especialista absoluto, nem o de mero executor de ordens, mas o de alguém que aprende a ler o processo — alguém que observa, sustenta e articula a relação entre a criança, o ambiente e os profissionais.',
    },
    {
      type: 'paragraph',
      text: 'Nada do que está escrito aqui pede concordância imediata. O que se pede é outro tipo de leitura: sem pressa e sem a busca ansiosa por respostas isoladas. Ao longo do livro, não se acumulam soluções prontas, mas uma forma de compreender que se constrói e amadurece com o tempo.',
    },
    {
      type: 'paragraph',
      text: 'Essa compreensão parte de um reconhecimento simples: explicar demais não ajuda, corrigir cedo demais atrapalha, e acelerar o desenvolvimento pode interromper algo que ainda estava se formando.',
    },
    {
      type: 'paragraph',
      text: 'Se em algum momento parecer que não se oferecem soluções rápidas, isso não é ausência. É escolha.',
    },
    {
      type: 'pullquote',
      text: 'Desenvolvimento não se resolve. Desenvolvimento se acompanha.',
    },
    {
      type: 'paragraph',
      text: 'Se, ao final da leitura, não houver uma lista de técnicas, mas houver um olhar mais afinado, uma escuta mais precisa e uma postura mais segura diante da criança, então este livro cumpriu seu papel.',
    },
    {
      type: 'paragraph',
      text: 'Este livro se constrói a partir da observação do desenvolvimento infantil em sua dimensão viva — aquela que acontece no corpo, na relação e no cotidiano. Ele dialoga com o campo do autismo e do desenvolvimento, mas escolhe não se apoiar em terminologias ou classificações técnicas como eixo de leitura.',
    },
    {
      type: 'paragraph',
      text: 'A compreensão aqui nasce da experiência acompanhada, da escuta atenta e da leitura dos processos em movimento. O que se propõe não é explicar de fora, mas sustentar um olhar que aprende a reconhecer, internamente, como o desenvolvimento se organiza quando encontra presença, tempo e relação.',
    },
    {
      type: 'paragraph',
      text: 'Seguimos a partir daqui.',
    },
  ],
};

export const abertura1: Chapter = {
  id: 'abertura-1',
  slug: 'abertura-parte-i',
  number: 0,
  partId: 'parte-1',
  title: 'Parte I',
  subtitle: 'Quando o Mundo Começa por Dentro',
  access: 'preview',
  estimatedMinutes: 5,
  blocks: [
    {
      type: 'section-title',
      text: 'PARTE I',
      subtitle: 'QUANDO O MUNDO COMEÇA POR DENTRO\nA experiência antes da ação',
    },
    {
      type: 'paragraph',
      text: 'Há coisas que não aparecem de imediato. Elas não se anunciam, não pedem licença e não se explicam. Ainda assim, sustentam tudo o que vem depois.',
    },
    {
      type: 'paragraph',
      text: 'Antes de qualquer tentativa de ajudar, antes de qualquer palavra bem colocada, antes mesmo de saber o que fazer, existe um território silencioso. Um lugar onde a experiência da criança começa a tomar forma. Um lado de dentro que raramente é visto, mas que nunca para de trabalhar.',
    },
    {
      type: 'paragraph',
      text: 'Para muitas crianças, o mundo não chega como uma ideia pronta. Ele chega como sensação pura. Luz, som, toque, temperatura, movimento — tudo se aproxima ao mesmo tempo, em camadas que se sobrepõem sem aviso.',
    },
    {
      type: 'paragraph',
      text: 'O dia não se apresenta organizado; ele simplesmente acontece. E, enquanto acontece, algo dentro da criança precisa receber, sustentar e ordenar esse fluxo para conseguir continuar ali.',
    },
    {
      type: 'paragraph',
      text: 'Esse trabalho é invisível. Acontece antes da intenção. Antes da linguagem. Antes de qualquer resposta que se possa reconhecer de fora.',
    },
    {
      type: 'paragraph',
      text: 'O corpo sente. O sistema tenta acompanhar. Às vezes consegue. Às vezes chega ao limite. Quando esse limite é alcançado, algo transborda: um choro súbito, um afastamento, um gesto repetido, um corpo que tenta conter o som, a luz, o excesso.',
    },
    {
      type: 'pullquote',
      text: 'O que se vê do lado de fora costuma ser chamado de comportamento. O que não se vê é o esforço imenso para manter alguma continuidade por dentro.',
    },
    {
      type: 'paragraph',
      text: 'Esta primeira parte do livro é um convite para desacelerar o olhar. Não para analisar nem para corrigir, mas para reconhecer. Para se aproximar do que sempre esteve acontecendo antes daquilo que irrompe à superfície.',
    },
    {
      type: 'paragraph',
      text: 'Aqui, o ponto de partida não é o que precisa mudar na criança, mas o que precisa ser sustentado pelo adulto.',
    },
    {
      type: 'paragraph',
      text: 'A proposta é compreender que a intensidade pode ser um pedido de regulação. Que o afastamento pode ser uma forma inteligente de proteção. Que a repetição pode ser uma tentativa legítima de manter a estrutura quando o entorno balança.',
    },
    {
      type: 'paragraph',
      text: 'Nada disso é vazio. Tudo responde a uma lógica interna, ainda que silenciosa.',
    },
    {
      type: 'paragraph',
      text: 'Ao aceitar entrar nesse território, algo também muda em quem cuida. A urgência diminui. A curiosidade cresce.',
    },
    {
      type: 'pullquote',
      text: 'A pergunta deixa de ser "como faço isso parar?" e começa a se transformar em "o que isso está contando?"',
    },
    {
      type: 'paragraph',
      text: 'A relação passa a se organizar mais pela presença do que pela tentativa de controle.',
    },
    {
      type: 'paragraph',
      text: 'Esta parte do livro percorre essas camadas iniciais: o impacto da notícia, o sentir da pele, o corpo que busca chão, a direção que se perde na crise, o esforço de fazer sentido no caos.',
    },
    {
      type: 'paragraph',
      text: 'Não são apenas conceitos. São experiências vividas — aquelas que moldam o humor, a disponibilidade e o brilho do olhar da criança ao longo do dia.',
    },
    {
      type: 'paragraph',
      text: 'Nada aqui pede pressa. Nada se resolve de uma vez. Este é apenas o início da travessia.',
    },
    {
      type: 'paragraph',
      text: 'O chão começa a ser construído por dentro — na forma como o adulto observa, responde e permanece.',
    },
    {
      type: 'paragraph',
      text: 'A partir de agora, cada página é uma permissão para reconhecer aquilo que a criança sempre esteve comunicando, mesmo quando ainda não havia palavras para isso.',
    },
    {
      type: 'paragraph',
      text: 'Aqui, o mundo começa por dentro.',
    },
  ],
};

export const capitulo1: Chapter = {
  id: 'cap-1',
  slug: 'cap-1-quando-o-mundo-muda-de-lugar',
  number: 1,
  partId: 'parte-1',
  title: 'Capítulo 1',
  subtitle: 'Quando o Mundo Muda de Lugar\nQuando o chão se assenta',
  access: 'preview',
  estimatedMinutes: 12,
  blocks: [
    {
      type: 'paragraph',
      text: 'Há manhãs que se abrem devagar, como tantas outras que vieram antes, sem sinal de que o pulso familiar está prestes a se deslocar.',
    },
    {
      type: 'paragraph',
      text: 'A casa segue seu próprio ritmo. Os gestos acontecem dentro do esperado.',
    },
    {
      type: 'paragraph',
      text: 'Por um instante, tudo permanece igual. Até que um diálogo franco — ou a presença atenta de alguém que observa — faz surgir a compreensão de que a vida não se desfaz. Ela apenas encontra outra forma.',
    },
    {
      type: 'paragraph',
      text: 'Um movimento quase invisível que pede, a quem cuida, um novo lugar interno para existir.',
    },
    {
      type: 'paragraph',
      text: 'A notícia que chega carrega força e silêncio. Há um ajuste por dentro, como uma claridade inesperada atravessando uma fresta que você nem sabia que existia.',
    },
    {
      type: 'paragraph',
      text: 'Às vezes essa luz é suave; em outras, intensa demais. Mas sempre revela mais do que esconde.',
    },
    {
      type: 'paragraph',
      text: 'É comum que, nesse instante, o coração tente dar forma ao que ainda não alcança. Surge uma sensação delicada, difícil de nomear, que pede cuidado e tempo. Um território novo, onde as mãos ainda procuram onde pousar.',
    },
    {
      type: 'paragraph',
      text: 'Todo começo traz seu próprio sobressalto. Com ele, surgem perguntas silenciosas sobre o caminho que se abre. Há, por um breve momento, uma despedida íntima — não da criança real, mas da imagem que caminhou ao seu lado até ali.',
    },
    {
      type: 'paragraph',
      text: 'Esse pequeno luto não se prolonga. Ele dura o tempo necessário para que o olhar encontre outro ponto de repouso: quando deixa de buscar a criança imaginada e passa a reconhecer a criança que existe, inteira e presente.',
    },
    {
      type: 'paragraph',
      text: 'É nesse ponto que o diagnóstico encontra seu lugar. Ele não chega para encerrar perguntas, mas para oferecer direção.',
    },
    {
      type: 'paragraph',
      text: 'Dá nome a uma verdade que já estava ali, ainda sem palavras. As reações, as distâncias e as intensidades passam a ser lidas como formas singulares de receber o mundo.',
    },
    {
      type: 'paragraph',
      text: 'A partir desse novo olhar, o que antes parecia sentença se transforma em chave de leitura. O caminho não se torna mais curto, mas se torna possível de percorrer com mais segurança.',
    },
    {
      type: 'paragraph',
      text: 'A aceitação começa a se assentar quando algo se organiza por dentro. Quando você reconhece que pode respirar no meio do caminho, que não precisa esconder o que sente, que pode permanecer. Que pode ser porto seguro.',
    },
    {
      type: 'paragraph',
      text: 'Nesse movimento, a narrativa interna muda. O capítulo do luto silencioso cede lugar a um gesto de aproximação — não aquele que observa à distância, mas o que se oferece por inteiro.',
    },
    {
      type: 'pullquote',
      text: 'É quando o olhar encontra o filho real e, mesmo sem palavras, algo se comunica com clareza: eu vejo você; eu estou aqui; seguimos juntos.',
    },
    {
      type: 'paragraph',
      text: 'Compreender isso é perceber que o caminho se ampliou. Ter caminho — mesmo com curvas e pausas — é diferente de estar perdido. O caminho sustenta, dá fôlego e aproxima.',
    },
    {
      type: 'paragraph',
      text: 'Nada se encerra aqui. Este é apenas o primeiro gesto de um encontro mais profundo.',
    },
    {
      type: 'paragraph',
      text: 'A partir daqui, esse olhar precisa ganhar corpo no cotidiano. Não por grandes movimentos, mas por gestos mínimos, quase invisíveis, que afinam a relação e oferecem à criança um espaço interno onde ela possa pousar.',
    },
    {
      type: 'paragraph',
      text: 'São esses detalhes silenciosos que sustentam o que a compreensão inaugura.',
    },
    {
      type: 'paragraph',
      text: 'Quando o olhar encontra um lugar mais amplo para descansar, a relação respira. E, nesse respiro, nasce uma disponibilidade que sustenta — o primeiro gesto de presença compartilhada.',
    },
    {
      type: 'practices',
      title: 'PEQUENAS PRÁTICAS',
      subtitle: 'Início do olhar e da presença',
      items: [
        {
          title: 'Parar para ver',
          text: 'Uma vez por dia, pare por um minuto. Olhe para seu filho sem dizer nada, sem corrigir, sem antecipar. Apenas veja.',
        },
        {
          title: 'Estar antes de fazer',
          text: 'Quando sentir vontade de orientar, explicar ou conduzir, espere alguns segundos e pergunte por dentro: o que está acontecendo agora?',
        },
        {
          title: 'Nomear o momento',
          text: 'Em algum ponto do dia, diga apenas para você: estamos aqui. Não explique. Não complete.',
        },
        {
          title: 'Encerrar com presença',
          text: 'Ao final do dia, lembre-se de um momento em que você esteve presente, mesmo que breve. Não avalie. Não julgue. Reconheça.',
        },
      ],
    },
    {
      type: 'exercise',
      title: 'EXERCÍCIO VIVENCIAL',
      subtitle: 'A janela do novo olhar',
      body: [
        'Este exercício coloca lado a lado dois tempos: o que foi imaginado e o que agora se revela.',
        'Separe duas folhas de papel.',
        'Na primeira, escreva uma carta para a expectativa que o acompanhava. Agradeça sua presença e permita que ela se retire.',
        'Na segunda, escreva para a criança real, com a verdade que os gestos dela revelam hoje, sem pressa.',
        'Ao terminar, pergunte em voz baixa — ou apenas por dentro: o que meus olhos estão aprendendo a ver agora?',
      ],
    },
    {
      type: 'silence',
      text: 'Guarde as duas folhas juntas.\n\nCom o tempo, perceberá que o mundo não encolheu; apenas ganhou profundidade.',
    },
    {
      type: 'next',
      text: 'Quando esse primeiro deslocamento interno repousa, e a imagem imaginada cede lugar à criança real, nasce um terreno onde o sentir começa a se revelar.\n\nÉ por aí que seguimos.',
    },
  ],
};

export const capitulo4: Chapter = {
  id: 'cap-4',
  slug: 'cap-4-quando-o-mundo-perde-direcao',
  number: 4,
  partId: 'parte-1',
  title: 'Capítulo 4',
  subtitle: 'Quando o Mundo Perde Direção\nA crise como perda de bússola',
  access: 'full',
  estimatedMinutes: 14,
  blocks: [
    {
      type: 'paragraph',
      text: 'Há situações em que tudo parece acontecer rápido demais.',
    },
    {
      type: 'paragraph',
      text: 'O espaço deixa de responder como antes. As passagens se embaralham. O que vinha em sequência começa a chegar junto. O corpo tenta acompanhar, mas não encontra pausa suficiente para se apoiar.',
    },
    {
      type: 'paragraph',
      text: 'Algo que sustentava o movimento interno se desloca. A experiência perde continuidade. A ação já não encontra um rumo claro para seguir.',
    },
    {
      type: 'paragraph',
      text: 'É nesse ponto que a crise se instala.',
    },
    {
      type: 'paragraph',
      text: 'Existe um sistema profundo que sustenta a sensação de estar no mundo. Ele organiza a relação com o espaço, com o movimento e com a gravidade. É esse sistema que permite sentir onde o corpo está, para onde pode ir e quando pode parar.',
    },
    {
      type: 'paragraph',
      text: 'Quando essa organização entra em sobrecarga, a criança não experimenta apenas confusão. Surge uma sensação de instabilidade interna, como se não houvesse apoio suficiente para permanecer. O corpo perde referência. A orientação se fragiliza.',
    },
    {
      type: 'paragraph',
      text: 'Transições rápidas, mudanças inesperadas, ambientes instáveis, deslocamentos frequentes e o acúmulo de estímulos exigem um esforço contínuo para manter essa organização. Em determinados momentos, o corpo já não consegue sustentar o ritmo que o entorno impõe.',
    },
    {
      type: 'paragraph',
      text: 'O que se manifesta por fora — o choro intenso, o grito, a rigidez súbita, o movimento desordenado — é a expressão desse estado de desorientação. A ação surge como tentativa de interromper a instabilidade, de encontrar um ponto de apoio quando a continuidade se rompe.',
    },
    {
      type: 'pullquote',
      text: 'A crise nasce aí.\n\nComo limite alcançado.\n\nComo resposta de sobrevivência.',
    },
    {
      type: 'paragraph',
      text: 'Nesse estado, o tempo perde contorno. O agora se impõe sem margem. A experiência interna vira fluxo contínuo, sem pausas claras. O corpo não encontra eixo, e a urgência cresce porque ainda não há onde pousar.',
    },
    {
      type: 'paragraph',
      text: 'É comum que o adulto tente responder com palavras, explicações ou orientações verbais. Mas, quando a orientação interna se fragiliza, a linguagem deixa de organizar. O corpo busca referência antes de buscar significado.',
    },
    {
      type: 'paragraph',
      text: 'O cérebro prioriza manter-se inteiro. O que chega precisa ser sustentado, não interpretado. A criança precisa que algo fora dela ofereça estabilidade suficiente para que a organização interna possa, aos poucos, se recompor.',
    },
    {
      type: 'pullquote',
      text: 'Movimentos mais lentos. Voz estável. Gestos previsíveis. Um corpo que permanece quando tudo acelera ao redor.',
    },
    {
      type: 'paragraph',
      text: 'A presença do adulto torna-se, então, um ponto de referência provisório. Não para conduzir, nem para controlar, mas para sustentar o espaço enquanto a orientação retorna.',
    },
    {
      type: 'paragraph',
      text: 'O sistema nervoso da criança reconhece essa estabilidade. Reconhece o peso do outro. Reconhece a calma que não reage de imediato. Reconhece a firmeza que não invade. É assim que a reorganização começa a acontecer — por referência, não por imposição.',
    },
    {
      type: 'paragraph',
      text: 'A crise não se encerra de uma vez. Ela se dissolve aos poucos. O ritmo desacelera. A respiração encontra intervalo. O espaço volta a ter bordas. O corpo deixa de cair e começa, gradualmente, a pousar.',
    },
    {
      type: 'paragraph',
      text: 'Depois, vem o cansaço. Um cansaço profundo, que pede silêncio, baixa demanda e tempo sem exigência. O interior que precisou se manter inteiro precisa agora de repouso.',
    },
    {
      type: 'paragraph',
      text: 'É nesse intervalo que a confiança se reconstrói. A criança aprende, sem palavras, que pode se desorganizar e ser acompanhada. Que o mundo pode sair do lugar e alguém permanece. Que a perda de direção não significa abandono.',
    },
    {
      type: 'paragraph',
      text: 'Quando o adulto reconhece a crise como perda de orientação, seu lugar também se ajusta. Deixa de tentar apagar o incêndio e passa a sustentar o espaço. Permanece disponível. Oferece tempo. Aguarda.',
    },
    {
      type: 'pullquote',
      text: 'Porque, quando o rumo se perde, o que mais orienta é alguém que sabe ficar.',
    },
    {
      type: 'paragraph',
      text: 'A crise não interrompe o caminho. Ela revela o ponto onde a direção se fragilizou — e onde pode ser reencontrada.',
    },
    {
      type: 'practices',
      title: 'PEQUENAS PRÁTICAS',
      subtitle: 'Direção, ritmo e ancoragem',
      items: [
        {
          title: 'Ser o ritmo quando tudo acelera',
          text: 'Reduza o próprio movimento. Estabilize a voz. Diminua estímulos. O corpo se organiza a partir do que encontra.',
        },
        {
          title: 'Criar pausas entre os lugares',
          text: 'Antes de mudar de ambiente ou atividade, ofereça um breve intervalo. Alguns segundos permitem que a orientação interna se reorganize.',
        },
        {
          title: 'Oferecer direção simples',
          text: 'Poucas palavras. Gestos claros. Em momentos de crise, a referência organiza mais do que a explicação.',
        },
        {
          title: 'Sustentar o intervalo',
          text: 'Não apresse o retorno. A orientação se restabelece no tempo do corpo, não no ritmo do relógio.',
        },
      ],
    },
    {
      type: 'exercise',
      title: 'EXERCÍCIO VIVENCIAL',
      subtitle: 'Ser chão por um instante',
      body: [
        'Fique em pé, em silêncio. Perceba o corpo antes de qualquer movimento. Note como ele se sustenta sem esforço consciente. O equilíbrio acontece por si.',
        'Dê alguns passos pelo espaço, sem escolher direção. Observe como o peso se transfere, como o corpo se ajusta a cada passo.',
        'Aos poucos, diminua o ritmo. Permita que o movimento encontre um fim. Pare. Sinta o peso descer. Os pés tocando o chão. O corpo encontrando repouso.',
        'Respire devagar. Não para se acalmar, mas para permanecer.',
        'Guarde essa sensação. Em momentos de desorganização, é isso que orienta antes de qualquer palavra: um corpo que não acelera, não empurra e permanece disponível.',
      ],
    },
    {
      type: 'silence',
      text: 'Às vezes, ser chão é tudo o que o outro precisa para voltar a existir no espaço.',
    },
    {
      type: 'next',
      text: 'Quando a direção retorna, o mundo volta a existir. Mas as partes nem sempre se ligam de imediato. Aquilo que foi vivido em fragmentos pede agora integração.\n\nÉ por aí que seguimos.',
    },
  ],
};

// Exportar todos os capítulos num map para lookup rápido
export const chaptersMap: Record<string, Chapter> = {
  introducao,
  'abertura-1': abertura1,
  'cap-1': capitulo1,
  'cap-4': capitulo4,
  // Orlando: adicionar os restantes capítulos seguindo o mesmo padrão
};

// Capítulos em preview (gratuitos)
export const previewChapterIds = ['introducao', 'abertura-1', 'cap-1'];

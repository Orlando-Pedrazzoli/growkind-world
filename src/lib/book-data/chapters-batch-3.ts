// ============================================================
// GrowKind — Livro Digital · Batch 3
// Abertura Parte II + Capítulos 6, 7, 8
// TEXTO SAGRADO — reprodução integral e exacta do original
// Adicionar ao chaptersMap em chapters.ts
// ============================================================

import type { Chapter } from './types';

// ── ABERTURA DA PARTE II ─────────────────────────────────
export const abertura2: Chapter = {
  id: 'abertura-2',
  slug: 'abertura-parte-ii',
  number: 0,
  partId: 'parte-2',
  title: 'Parte II',
  subtitle: 'Quando Sentir Não É o Bastante\nOrganizar para agir',
  access: 'full',
  estimatedMinutes: 5,
  blocks: [
    {
      type: 'section-title',
      text: 'PARTE II',
      subtitle: 'QUANDO SENTIR NÃO É O BASTANTE\nOrganizar para agir',
    },
    {
      type: 'paragraph',
      text: 'Na primeira parte deste livro, o convite foi aprender a permanecer. Ajustar o olhar. Reconhecer o que acontece internamente antes que qualquer ação seja possível.',
    },
    {
      type: 'paragraph',
      text: 'Ali, o foco esteve na experiência. No sentir que antecede o gesto. No corpo que precisa encontrar chão antes de responder ao mundo.',
    },
    {
      type: 'paragraph',
      text: 'Mas há um momento em que isso já não é suficiente.',
    },
    {
      type: 'paragraph',
      text: 'Há um ponto em que a criança sente, percebe, reconhece — e, ainda assim, não consegue agir. Ou age por instantes, mas não se sustenta. Ou começa, mas se perde no meio. Ou até faz, mas com um custo alto demais.',
    },
    {
      type: 'paragraph',
      text: 'É aí que esta parte começa.',
    },
    {
      type: 'paragraph',
      text: 'A Parte II não abandona o que foi construído antes. Ela se apoia nisso. Mas desloca o campo.',
    },
    {
      type: 'paragraph',
      text: 'Aqui, o foco passa a ser o fazer — não como exigência externa, nem como desempenho esperado, mas como algo que precisa ser organizado para se tornar possível.',
    },
    {
      type: 'paragraph',
      text: 'Agir não é um ato simples. Exige iniciar, sustentar, direcionar, terminar. Exige atravessar transições, lidar com escolhas, manter atenção, tolerar esforço. Exige, muitas vezes, algo que ainda não está disponível internamente.',
    },
    {
      type: 'paragraph',
      text: 'É por isso que, nesta parte, a presença do adulto se torna mais ativa. Não para fazer pela criança. Não para empurrar. Mas para emprestar estrutura.',
    },
    {
      type: 'pullquote',
      text: 'Estrutura de tempo. Estrutura de espaço. Estrutura de linguagem. Estrutura de sentido.',
    },
    {
      type: 'paragraph',
      text: 'Tudo o que aparece aqui nasce do cotidiano. Da casa. Das tarefas simples. Das pequenas ações que se repetem todos os dias e, justamente por isso, revelam onde o fazer se perde — e onde pode ser sustentado.',
    },
    {
      type: 'paragraph',
      text: 'Ao longo dos próximos capítulos, fica evidente que a ação raramente falha por um único motivo. Às vezes, o impasse está no começo. Em outros momentos, no meio. Há casos em que surge no excesso de estímulo, na falta de ritmo, na ausência de direção ou de sentido.',
    },
    {
      type: 'paragraph',
      text: 'Nada disso acontece de forma isolada. Nada disso se resolve com uma única estratégia.',
    },
    {
      type: 'paragraph',
      text: 'O que se constrói aqui é um campo de leitura. Um modo de perceber onde entrar, quando sustentar, quando delimitar, quando orientar com palavras, quando organizar o dia, quando usar o interesse como ponte.',
    },
    {
      type: 'paragraph',
      text: 'A Parte II não propõe controle. Propõe condições.',
    },
    {
      type: 'paragraph',
      text: 'Condições para que a ação deixe de depender exclusivamente do esforço do outro e comece, pouco a pouco, a se organizar de dentro para fora — sempre em relação.',
    },
    {
      type: 'paragraph',
      text: 'Se a Parte I foi sobre habitar o mundo internamente, a Parte II é sobre tornar possível habitar o mundo em ação.',
    },
    {
      type: 'paragraph',
      text: 'Não como linha reta. Não como progresso constante. Mas como construção viva, ajustada, real.',
    },
    {
      type: 'paragraph',
      text: 'É por aqui que seguimos.',
    },
  ],
};

// ── CAPÍTULO 6 ───────────────────────────────────────────
export const capitulo6: Chapter = {
  id: 'cap-6',
  slug: 'cap-6-quando-compreender-nao-basta',
  number: 6,
  partId: 'parte-2',
  title: 'Capítulo 6',
  subtitle: 'Quando Compreender Não Basta\nO caminho entre o sentir e o fazer',
  access: 'full',
  estimatedMinutes: 13,
  blocks: [
    {
      type: 'paragraph',
      text: 'Com o tempo, torna-se possível observar melhor. Os sinais passam a ser reconhecidos, os limites antecipados, o ritmo ajustado. O corpo da criança já não parece um território desconhecido; há menos sobressalto, menos urgência. Um tipo de chão começa a se formar.',
    },
    {
      type: 'paragraph',
      text: 'Ainda assim, algo permanece.',
    },
    {
      type: 'paragraph',
      text: 'O dia segue. Os pedidos são simples, as situações já são conhecidas e a criança está ali — presente, atenta. Mesmo assim, há momentos em que a ação não se inicia. Não como crise. Não como recusa. Apenas como um atraso difícil de nomear.',
    },
    {
      type: 'paragraph',
      text: 'Esse intervalo chama a atenção justamente porque, por fora, tudo parece pronto.',
    },
    {
      type: 'paragraph',
      text: 'O espaço entre perceber e agir sempre existiu, mas agora se torna mais visível. Talvez porque o corpo esteja mais regulado. Talvez porque o ambiente esteja mais previsível. Ou porque, pela primeira vez, o que falta não é conter o sentir, mas sustentar o início.',
    },
    {
      type: 'pullquote',
      text: 'Há uma diferença importante entre não conseguir fazer e não conseguir começar.',
    },
    {
      type: 'paragraph',
      text: 'Muitas crianças seguem bem quando algo já está em andamento. O desafio aparece antes, na nascente do movimento, no primeiro passo. É ali que o corpo hesita. Como quem segura a chave diante da porta certa, sabendo exatamente para onde ir, mas sem conseguir girá-la. Ou como a criança que já tem o casaco nas mãos, pronta para sair, mas não consegue passar o braço pela primeira manga.',
    },
    {
      type: 'paragraph',
      text: 'Esperar, raramente, atravessa esse ponto.',
    },
    {
      type: 'paragraph',
      text: 'Internamente, essa pausa é habitada. O corpo trabalha silenciosamente. Tenta organizar por onde entrar, onde apoiar, como dar início ao movimento. A intenção existe. A compreensão também.',
    },
    {
      type: 'paragraph',
      text: 'Mas a ação ainda não encontra apoio suficiente para surgir. Quanto mais o início pesa, mais difícil se torna a travessia solitária.',
    },
    {
      type: 'paragraph',
      text: 'É comum, nesse momento, que o pedido seja repetido, que a explicação venha novamente, ou que o silêncio seja mantido na expectativa de que a clareza faça o movimento aparecer. Às vezes funciona. Muitas vezes, não.',
    },
    {
      type: 'paragraph',
      text: 'Porque o que falta ali não é mais explicação. O corpo da criança já compreendeu o que vem a seguir. O que ainda não se formou é um ponto de apoio para começar. Onde colocar o corpo. Por onde entrar na ação. Como dar o primeiro passo sem que tudo pese de uma vez.',
    },
    {
      type: 'paragraph',
      text: 'Quando esse apoio ainda não existe internamente, ele pode ser oferecido por fora.',
    },
    {
      type: 'paragraph',
      text: 'Emprestar o começo não é fazer pela criança. Não é conduzir o caminho inteiro, nem acelerar. É entrar exatamente onde o peso está maior: no primeiro passo.',
    },
    {
      type: 'paragraph',
      text: 'Às vezes, isso acontece em um movimento mínimo. O adulto segura o casaco junto, ajuda a passar a primeira manga e para. Ou sustenta a folha enquanto o primeiro traço acontece. Ou se levanta junto, apenas para que o corpo da criança encontre o impulso inicial.',
    },
    {
      type: 'pullquote',
      text: 'A ação não é resolvida; ela é destravada.',
    },
    {
      type: 'paragraph',
      text: 'Quando o início é compartilhado, algo muda. O corpo da criança deixa de carregar sozinho o esforço de começar. O peso se distribui. O movimento encontra apoio. E, a partir daí, pode seguir.',
    },
    {
      type: 'paragraph',
      text: 'Esse apoio é temporário. Ele entra no início e se retira quando a ação se mantém. Não cria dependência; cria experiência. O corpo aprende, pouco a pouco, que é possível atravessar esse ponto.',
    },
    {
      type: 'paragraph',
      text: 'Há também algo que se reorganiza no adulto. Fica mais claro que não é preciso empurrar, insistir ou explicar mais. O cuidado muda de lugar quando se reconhece que a função ali não é exigir vontade, mas oferecer base. Não é esperar passivamente, nem controlar o percurso — é dar chão ao início até que o movimento se organize.',
    },
    {
      type: 'paragraph',
      text: 'Começar não é simples. E não precisa ser solitário.',
    },
    {
      type: 'paragraph',
      text: 'Para algumas crianças, o maior esforço não está em fazer, mas em atravessar o primeiro passo. Quando o início encontra apoio, o caminho deixa de ser obstáculo e passa a ser processo possível.',
    },
    {
      type: 'practices',
      title: 'PEQUENAS PRÁTICAS',
      subtitle: 'Início, impulso e retirada',
      items: [
        {
          title: 'Reconhecer o ponto do começo',
          text: 'Observar onde o movimento trava. Notar o momento exato em que a criança parece pronta, mas não avança. Não o depois. Não o desfecho. Apenas esse ponto suspenso.',
        },
        {
          title: 'Perceber o próprio corpo',
          text: 'Quando nada acontece, observar onde surge a tensão. No peito. Nos ombros. Essa sensação costuma indicar que o início está pesado demais para ser atravessado sozinho.',
        },
        {
          title: 'Antes de explicar, experimentar entrar',
          text: 'Perguntar-se se a situação pede mais palavras ou um primeiro movimento compartilhado.',
        },
        {
          title: 'Sair assim que a ação se sustentar',
          text: 'Emprestar o começo é entrar — e saber sair.',
        },
      ],
    },
    {
      type: 'exercise',
      title: 'EXERCÍCIO VIVENCIAL',
      subtitle: 'O peso do primeiro passo',
      body: [
        'Escolha algo simples do dia. Algo cujo modo de fazer já é conhecido. Antes de iniciar, faça uma pausa. Permaneça alguns segundos com a intenção clara, sem agir.',
        'Em seguida, imagine alguém começando junto: segurando a porta, dando o primeiro passo, dividindo o peso inicial. Perceba a diferença.',
        'Muitas vezes, é exatamente aí que a criança está.',
      ],
    },
    {
      type: 'silence',
      text: 'Às vezes, o que parece hesitação é apenas um corpo tentando encontrar por onde entrar. Nem toda demora é resistência. Nem todo atraso é falta de compreensão. Há começos que pedem mais do que intenção. Pedem apoio suficiente para que o primeiro passo exista sem pesar demais.',
    },
    {
      type: 'next',
      text: 'Quando o início encontra apoio suficiente, a ação se torna possível. Mas começar ainda não garante que o movimento se sustente sozinho. Há crianças que conseguem entrar na ação, mas não conseguem mantê-la sem que o começo precise ser reemprestado muitas vezes.\n\nO gesto nasce, mas não se sustenta.\n\nÉ nesse ponto que o cuidado precisa mudar de lugar.',
    },
  ],
};

// ── CAPÍTULO 7 ───────────────────────────────────────────
export const capitulo7: Chapter = {
  id: 'cap-7',
  slug: 'cap-7-quando-o-comeco-nao-se-sustenta',
  number: 7,
  partId: 'parte-2',
  title: 'Capítulo 7',
  subtitle:
    'Quando o Começo Não se Sustenta\nO desafio de permanecer quando o início já aconteceu',
  access: 'full',
  estimatedMinutes: 14,
  blocks: [
    {
      type: 'paragraph',
      text: 'Depois que o início se torna possível, um novo tipo de desafio começa a aparecer. O gesto nasce, a ação se esboça, a criança entra no fazer. Não há mais imobilidade, nem ausência. Algo efetivamente começou a se mover.',
    },
    {
      type: 'paragraph',
      text: 'Ainda assim, esse movimento não se mantém.',
    },
    {
      type: 'paragraph',
      text: 'O começo acontece, mas se desfaz cedo demais. A ação surge, mas não encontra continuidade suficiente para seguir. Não se trata de recusa, nem de crise. Trata-se de um fazer que entra em cena, mas não permanece.',
    },
    {
      type: 'paragraph',
      text: 'É nesse terreno instável que a presença do adulto precisa se reorganizar.',
    },
    {
      type: 'paragraph',
      text: 'O primeiro movimento acontece. Por fora, tudo indica que a atividade começou. Pouco depois, algo se perde. A ação não se interrompe bruscamente; ela simplesmente não se sustenta. O que já foi possível não se transforma em percurso.',
    },
    {
      type: 'paragraph',
      text: 'Esse instante costuma ser percebido com clareza por quem acompanha. A criança inicia algo. O gesto nasce. O início já aconteceu. Quase ao mesmo tempo, porém, o movimento se afasta. O que ainda não se estabelece é o seguir.',
    },
    {
      type: 'paragraph',
      text: 'No cotidiano, isso aparece de forma simples. A criança se senta para desenhar, montar algo ou organizar brinquedos. Começa. Faz um primeiro movimento. Por um instante, tudo parece encaminhado. Em seguida, levanta-se, olha ao redor, deixa-se capturar por outro estímulo.',
    },
    {
      type: 'paragraph',
      text: 'Não há oposição. Não há explosão. Apenas uma perda de continuidade.',
    },
    {
      type: 'paragraph',
      text: 'O adulto chama de volta. Ajuda a retomar. O início acontece outra vez. Pouco depois, o mesmo movimento se repete. A entrada existe, mas se dissolve cedo demais. Para quem observa, isso costuma gerar confusão: afinal, a criança estava fazendo. O começo já tinha acontecido.',
    },
    {
      type: 'pullquote',
      text: 'Então, por que não segue?',
    },
    {
      type: 'paragraph',
      text: 'Aqui é importante nomear com precisão o que está acontecendo. Quando o início precisa ser reemprestado repetidas vezes, a dificuldade já não está no começo. Ela está no meio. Mais especificamente, na falta de apoio suficiente para que a ação se sustente ao longo do tempo.',
    },
    {
      type: 'paragraph',
      text: 'Cada trecho do fazer exige uma nova organização interna. Cada pequeno avanço pede uma reconquista do foco, do eixo e da direção. A criança pode reconhecer a atividade, compreender o que está fazendo e até se interessar por ela. O que ainda não está disponível é a possibilidade de manter o percurso sem precisar reconstruí-lo a cada poucos passos.',
    },
    {
      type: 'paragraph',
      text: 'O primeiro gesto é possível, mas o seguinte ainda não está garantido. A ação acontece, mas não se encadeia. Falta sustentação.',
    },
    {
      type: 'paragraph',
      text: 'Diante disso, é comum que o adulto insista no início. Repita o convite. Chame para recomeçar. Ajude a entrar outra vez. Isso parece lógico, porque foi assim que o movimento surgiu pela primeira vez.',
    },
    {
      type: 'paragraph',
      text: 'Mas quando a dificuldade está em sustentar, insistir no começo não resolve. Apenas reforça a dependência do recomeço. A ação passa a existir sempre a partir de fora, sem ganhar base suficiente para se manter internamente.',
    },
    {
      type: 'paragraph',
      text: 'É aqui que a função do adulto precisa mudar de lugar — não em relação ao capítulo anterior, mas em continuidade a ele.',
    },
    {
      type: 'pullquote',
      text: 'Se antes foi necessário emprestar o início, agora torna-se necessário sustentar o meio.',
    },
    {
      type: 'paragraph',
      text: 'Essa mudança não acontece por tentativa e erro. Ela começa pela observação. Em vez de perguntar "como faço para começar de novo?", o olhar se desloca para outra pergunta: onde exatamente esse percurso perde apoio? Em que ponto a ação se desfaz? Quanto tempo ela consegue se manter antes de se diluir?',
    },
    {
      type: 'paragraph',
      text: 'Essa leitura acontece no cotidiano, em tempo real. Na mesa, quando o desenho para no meio. No quarto, quando a criança começa a se vestir e se dispersa antes de terminar. Nas transições do dia, quando um passo é dado, mas o seguinte não vem.',
    },
    {
      type: 'paragraph',
      text: 'Não se trata de vigiar mais, nem de controlar melhor. Trata-se de ver com precisão.',
    },
    {
      type: 'paragraph',
      text: 'Quando o ponto onde a ação se desfaz se torna visível, o posicionamento do adulto muda. O gesto deixa de ser iniciar e passa a ser sustentar.',
    },
    {
      type: 'paragraph',
      text: 'Sustentar não é fazer pela criança. É tornar-se uma presença âncora. É permanecer no espaço da atividade tempo suficiente para que o percurso não precise ser reconstruído do zero a cada vez.',
    },
    {
      type: 'paragraph',
      text: 'Na prática, isso pode significar estar mais próximo naquele trecho específico — sem falar mais, sem explicar mais, sem conduzir. Em certos momentos, sustentar passa por simplificar o entorno: reduzir o que distrai, diminuir o que compete, clarear o ponto onde a ação costuma se perder.',
    },
    {
      type: 'pullquote',
      text: 'Sustentar com a presença, não com a palavra.',
    },
    {
      type: 'paragraph',
      text: 'Em casa, isso pode ser tão simples quanto sentar ao lado por mais alguns minutos durante a atividade. Ou permanecer presente durante a arrumação, sem assumir a tarefa, mas também sem desaparecer.',
    },
    {
      type: 'paragraph',
      text: 'Nas saídas, pode significar ajustar o ritmo da família. Acompanhar a brincadeira por mais tempo. Ficar junto no percurso, em vez de apenas iniciar e esperar que siga sozinha.',
    },
    {
      type: 'paragraph',
      text: 'Esse gesto não é conduzir. Não é resgatar. É segurar o espaço.',
    },
    {
      type: 'paragraph',
      text: 'Quando o adulto se posiciona assim, algo começa a mudar. A ação não se torna estável de uma vez. Não se mantém por longos períodos. Mas dura um pouco mais. O percurso se firma por alguns instantes além do habitual.',
    },
    {
      type: 'paragraph',
      text: 'E isso já é significativo.',
    },
    {
      type: 'paragraph',
      text: 'A continuidade não se constrói com explicação. Ela se constrói com experiência. Cada vez que a criança vive um fazer que se sustenta um pouco mais, algo se organiza internamente. O percurso começa a ser reconhecido. A ação deixa de depender exclusivamente do impulso inicial emprestado.',
    },
    {
      type: 'paragraph',
      text: 'Este capítulo não oferece uma técnica pronta. Ele oferece um critério.',
    },
    {
      type: 'paragraph',
      text: 'Quando o começo acontece, mas não se sustenta, a intervenção deixa de estar no início e passa a habitar o meio. Esse deslocamento não resolve tudo, mas cria as condições para que o próximo passo seja possível.',
    },
    {
      type: 'paragraph',
      text: 'Para algumas crianças, o desafio não é entrar na ação. É permanecer nela tempo suficiente para que o caminho exista.',
    },
    {
      type: 'practices',
      title: 'PEQUENAS PRÁTICAS',
      subtitle: 'Observação, permanência e sustentação',
      items: [
        {
          title: 'Onde o fazer perde apoio',
          text: 'Observe uma atividade cotidiana. Não o começo. Não o final. Apenas o ponto exato onde a ação costuma se desfazer. Permaneça ali alguns instantes, em silêncio, sem intervir de imediato.',
        },
        {
          title: 'Menos recomeço, mais meio',
          text: 'Na próxima interrupção, note o impulso de chamar para começar de novo. Veja se é possível, antes disso, permanecer junto exatamente onde a ação parou — sem falar, sem explicar, apenas sustentando a presença.',
        },
        {
          title: 'Sustentar sem conduzir',
          text: 'Durante uma atividade simples, experimente habitar o espaço da tarefa por mais tempo. Não faça pela criança. Não antecipe. Fique no meio do caminho com ela.',
        },
        {
          title: 'Os próximos dez centímetros',
          text: 'Quando a ação parar, reduza o horizonte. Não pense na tarefa inteira. Observe qual é apenas o próximo pequeno trecho possível. Muitas vezes, sustentar o meio é tornar visível apenas o que vem imediatamente à frente.',
        },
      ],
    },
    {
      type: 'exercise',
      title: 'EXERCÍCIO VIVENCIAL',
      subtitle: 'O meio do caminho',
      body: [
        'Escolha uma atividade simples do seu dia e comece. Depois de alguns instantes, pare no meio. Observe o impulso de recomeçar do zero. O desconforto de permanecer sem concluir. A vontade de pular para o final.',
        'Agora, retome exatamente de onde parou. Sem recomeçar. Apenas continue.',
        'Note a diferença entre recomeçar e sustentar o meio. Muitas vezes, é exatamente aí que a criança está.',
      ],
    },
    {
      type: 'silence',
      text: 'Há gestos que não caem por falta de vontade, mas por falta de chão no meio do caminho. Sustentar não é apressar. Não é conduzir. É permanecer perto o bastante para que o fazer não precise desaparecer para recomeçar.',
    },
    {
      type: 'next',
      text: 'Quando a ação começa a se firmar, ainda que por pouco tempo, outra necessidade aparece. O fazer pede contorno. Limites claros. Um campo que ajude o percurso a não se espalhar.\n\nÉ por aí que seguimos.',
    },
  ],
};

// ── CAPÍTULO 8 ───────────────────────────────────────────
export const capitulo8: Chapter = {
  id: 'cap-8',
  slug: 'cap-8-quando-a-acao-precisa-de-bordas',
  number: 8,
  partId: 'parte-2',
  title: 'Capítulo 8',
  subtitle:
    'Quando a Ação Precisa de Bordas\nContorno, limite e sustentação do fazer',
  access: 'full',
  estimatedMinutes: 12,
  blocks: [
    {
      type: 'paragraph',
      text: 'Depois que o início se torna possível e o meio começa a se sustentar, outro desafio passa a se revelar. A criança tem impulso, interesse e energia para agir. O movimento nasce. O fazer se anuncia. Ainda assim, ele não se fixa.',
    },
    {
      type: 'pullquote',
      text: 'A ação escorre.',
    },
    {
      type: 'paragraph',
      text: 'O gesto toca muitas coisas, passa por objetos e convites diferentes, mas não permanece em nenhum deles — como se a energia se abrisse cedo demais, antes de ganhar forma.',
    },
    {
      type: 'paragraph',
      text: 'Antes de pensar no que a criança faz, vale observar onde isso acontece.',
    },
    {
      type: 'paragraph',
      text: 'O espaço, muitas vezes, está cheio. Objetos à vista, possibilidades abertas, estímulos que se oferecem ao mesmo tempo. O ambiente segue falando, mesmo quando ninguém diz nada, chamando para muitos lugares de uma só vez.',
    },
    {
      type: 'paragraph',
      text: 'Nesse cenário, a criança se move. Toca, começa, explora. Há interesse. Há energia suficiente para agir.',
    },
    {
      type: 'paragraph',
      text: 'Ainda assim, o fazer não ganha forma. Não porque algo falte, mas porque há demais.',
    },
    {
      type: 'paragraph',
      text: 'Este capítulo se aproxima desse território específico: quando a ação existe, mas precisa de contorno para não se espalhar. Quando o gesto pede menos abertura e mais definição para poder seguir.',
    },
    {
      type: 'paragraph',
      text: 'No cotidiano, isso costuma aparecer de maneira silenciosa.',
    },
    {
      type: 'paragraph',
      text: 'A casa está em movimento. Brinquedos acessíveis, materiais espalhados, objetos que permanecem à vista mesmo quando não estão sendo usados. Nada está fora de lugar. Tudo está disponível.',
    },
    {
      type: 'paragraph',
      text: 'A criança circula. Aproxima-se de uma coisa, depois de outra. O gesto continua, mas não se aprofunda. Há ação suficiente para ocupar o tempo, mas não para sustentar um percurso.',
    },
    {
      type: 'paragraph',
      text: 'Em outros momentos, a criança se aproxima de uma atividade e tenta se envolver. Senta-se, observa o que está à frente, toca no que está por perto.',
    },
    {
      type: 'paragraph',
      text: 'O espaço ao redor continua oferecendo muitas possibilidades ao mesmo tempo. Sons, objetos e movimentos seguem presentes. A ação acontece, mas precisa disputar atenção com tudo ao redor. O fazer não se interrompe — ele se espalha.',
    },
    {
      type: 'paragraph',
      text: 'Quando se observa com cuidado, torna-se claro que não se trata de falta de interesse. A criança está em movimento, tentando lidar com um campo amplo demais para organizar sozinha.',
    },
    {
      type: 'pullquote',
      text: 'O desafio não está em agir, mas em escolher onde ficar.',
    },
    {
      type: 'paragraph',
      text: 'É como estar em um lugar onde todas as portas estão abertas ao mesmo tempo. Cada uma chama. Cada uma promete algo. Nenhuma se fecha o suficiente para que o passo seguinte encontre apoio.',
    },
    {
      type: 'paragraph',
      text: 'Sem bordas, a ação não cai. Ela se distribui.',
    },
    {
      type: 'paragraph',
      text: 'O fazer acontece, mas não ganha peso. Não cria a sensação de percurso. Não deixa rastro. E sem essa experiência, tudo permanece em estado de tentativa.',
    },
    {
      type: 'paragraph',
      text: 'É nesse ponto que a posição do adulto volta a se reorganizar.',
    },
    {
      type: 'paragraph',
      text: 'Depois de ajudar a começar e sustentar o meio, torna-se necessário delimitar o campo da ação. Não para reduzir o mundo da criança, mas para torná-lo habitável.',
    },
    {
      type: 'paragraph',
      text: 'Criar bordas é oferecer um contorno possível. É dizer, sem muitas palavras: é aqui que ficamos agora; é isso que faz parte; é até aqui.',
    },
    {
      type: 'paragraph',
      text: 'Essas bordas não são regras longas nem estruturas rígidas. São contornos simples, visíveis e temporários. Entram como apoio externo enquanto a criança ainda não consegue sustentar esse limite internamente.',
    },
    {
      type: 'paragraph',
      text: 'Em casa, isso pode acontecer de forma concreta. Menos objetos disponíveis por vez. Um espaço escolhido para a atividade. Um começo vivido junto e um encerramento reconhecido, mesmo que breve.',
    },
    {
      type: 'paragraph',
      text: 'Quando o campo se define, algo muda. A ação ganha densidade. O gesto encontra onde pousar.',
    },
    {
      type: 'paragraph',
      text: 'Com menos caminhos competindo, o percurso se fortalece. A criança consegue permanecer por mais tempo porque não precisa decidir a cada instante para onde ir. A energia deixa de se dispersar e começa a se concentrar.',
    },
    {
      type: 'pullquote',
      text: 'Delimitar não empobrece a experiência. Dá forma.',
    },
    {
      type: 'paragraph',
      text: 'Dentro de um espaço mais claro, o fazer se repete. A atenção se acomoda. O gesto se aprofunda. Algo pode ser vivido até o fim, mesmo que de maneira simples. E essa vivência importa.',
    },
    {
      type: 'paragraph',
      text: 'As bordas não entram para sempre. Elas aparecem como apoio enquanto o contorno interno ainda está se formando.',
    },
    {
      type: 'paragraph',
      text: 'Aos poucos, podem ser flexibilizadas, ampliadas ou retiradas. Não por decisão externa, mas porque a criança começa a reconhecer quando uma ação começa, quando está em andamento e quando pode terminar.',
    },
    {
      type: 'paragraph',
      text: 'Não como regra ensinada. Como experiência repetida.',
    },
    {
      type: 'paragraph',
      text: 'É assim que a ação deixa de se espalhar. E começa a se organizar.',
    },
    {
      type: 'paragraph',
      text: 'Para algumas crianças, agir não é difícil. Difícil é permanecer quando tudo chama ao mesmo tempo. As bordas não limitam o movimento. Elas oferecem chão.',
    },
    {
      type: 'practices',
      title: 'PEQUENAS PRÁTICAS',
      subtitle: 'Contorno, espaço e delimitação',
      items: [
        {
          title: 'Reduzir o campo',
          text: 'Observe o espaço onde a criança costuma agir. Veja se há possibilidades demais abertas ao mesmo tempo. Experimente reduzir — não para controlar, mas para clarear.',
        },
        {
          title: 'Escolher um lugar',
          text: 'Antes de iniciar uma atividade, ajude a definir onde ela acontece. Um espaço reconhecível ajuda o gesto a se manter.',
        },
        {
          title: 'Ficar até o fim',
          text: 'Durante uma ação simples, permaneça presente até o encerramento. Não para conduzir, mas para sustentar o contorno do começo ao término.',
        },
        {
          title: 'Guardar como fechamento',
          text: 'Sempre que possível, inclua um pequeno ritual de fechamento: guardar, limpar, organizar junto. Isso ajuda a marcar que aquela experiência se completou.',
        },
      ],
    },
    {
      type: 'exercise',
      title: 'EXERCÍCIO VIVENCIAL',
      subtitle: 'O campo do próprio fazer',
      body: [
        'Escolha uma atividade simples do dia. Antes de começar, observe o ambiente ao redor. Quantas coisas disputam a atenção? O que poderia ser deixado de fora por alguns minutos?',
        'Agora, execute a ação em um campo menor. Note a diferença.',
        'Muitas vezes, é exatamente isso que a criança precisa.',
      ],
    },
    {
      type: 'silence',
      text: 'Há gestos que se perdem não por falta de energia, mas por excesso de possibilidades. Quando o espaço se define, a ação encontra onde ficar.',
    },
    {
      type: 'next',
      text: 'Quando o espaço da ação se torna mais claro, outra possibilidade começa a surgir. A palavra passa a entrar como apoio — não para explicar demais, mas para ajudar o fazer a se sustentar.\n\nÉ por aí que seguimos.',
    },
  ],
};

// ── Exportar para adicionar ao chaptersMap ────────────────
// Em chapters.ts, adicionar:
//
// import { abertura2, capitulo6, capitulo7, capitulo8 } from './chapters-batch-3'
//
// E no chaptersMap:
// 'abertura-2': abertura2,
// 'cap-6': capitulo6,
// 'cap-7': capitulo7,
// 'cap-8': capitulo8,

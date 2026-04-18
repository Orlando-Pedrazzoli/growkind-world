// src/lib/data/legal.ts

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPolicy {
  slug: 'privacidade' | 'termos' | 'cookies' | 'devolucoes';
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

// Data de última atualização — actualizar sempre que o conteúdo for revisto
const LAST_UPDATED = '18 de abril de 2026';

// Placeholder para dados do responsável (ocultos até o João definir)
const CONTROLLER_NAME = 'GrowKind World';
const CONTACT_EMAIL = 'contacto@growkindworld.com';

// ============================================================================
// POLÍTICA DE PRIVACIDADE
// ============================================================================
export const privacidade: LegalPolicy = {
  slug: 'privacidade',
  title: 'Política de Privacidade',
  subtitle: 'Como recolhemos, utilizamos e protegemos os teus dados pessoais.',
  lastUpdated: LAST_UPDATED,
  intro: [
    `A ${CONTROLLER_NAME} respeita a tua privacidade e está comprometida com a protecção dos teus dados pessoais. Esta política explica, de forma clara e transparente, que dados recolhemos, com que finalidade, como os tratamos e quais os teus direitos.`,
    `Esta política aplica-se a todos os visitantes, utilizadores registados e compradores do site growkindworld.com, independentemente do país a partir do qual acedem. Cumprimos o Regulamento Geral sobre a Protecção de Dados da União Europeia (RGPD — Regulamento UE 2016/679), a Lei portuguesa 58/2019, o UK GDPR e Data Protection Act 2018, a Lei Geral de Protecção de Dados brasileira (LGPD — Lei 13.709/2018) e a legislação aplicável nos demais países de língua portuguesa.`,
  ],
  sections: [
    {
      id: 'responsavel',
      title: '1. Responsável pelo tratamento',
      paragraphs: [
        `O responsável pelo tratamento dos teus dados pessoais é a ${CONTROLLER_NAME}, entidade gestora do site growkindworld.com.`,
        `Para qualquer questão relacionada com protecção de dados, podes contactar-nos através do email ${CONTACT_EMAIL}.`,
      ],
    },
    {
      id: 'dados-recolhidos',
      title: '2. Dados que recolhemos',
      paragraphs: [
        'Recolhemos apenas os dados estritamente necessários para te prestar os nossos serviços. Em concreto, tratamos as seguintes categorias de dados:',
      ],
      list: [
        'Dados de identificação e contacto: nome, apelido, endereço de email — fornecidos por ti ao criar conta ou ao efectuar uma compra.',
        'Dados de autenticação: palavra-passe armazenada de forma cifrada (nunca acedemos à palavra-passe em texto legível).',
        'Dados de compra: registo das tuas aquisições, data da transacção, produto adquirido e estado do pedido. Os dados de pagamento (número de cartão, etc.) são tratados exclusivamente pelo Stripe e nunca chegam aos nossos servidores.',
        'Dados técnicos: endereço IP, tipo de navegador, sistema operativo e páginas visitadas — recolhidos através de cookies estritamente necessários para o funcionamento do site.',
        'Comunicações: conteúdo das mensagens que nos envias por email ou formulário de contacto.',
      ],
    },
    {
      id: 'finalidades',
      title: '3. Para que utilizamos os teus dados',
      paragraphs: [
        'Utilizamos os teus dados pessoais exclusivamente para as finalidades abaixo, sempre com base legal adequada nos termos do RGPD, UK GDPR e LGPD:',
      ],
      list: [
        'Execução do contrato: criar e gerir a tua conta, processar compras, entregar conteúdo digital adquirido e prestar suporte (art. 6.º n.º 1 alínea b RGPD).',
        'Obrigações legais: cumprir obrigações fiscais, contabilísticas e de combate à fraude (art. 6.º n.º 1 alínea c RGPD).',
        'Interesse legítimo: garantir a segurança do site, prevenir abusos e melhorar a nossa prestação de serviço (art. 6.º n.º 1 alínea f RGPD).',
        'Consentimento: envio de newsletter ou comunicações promocionais, quando tenhas manifestado expressamente esse desejo (art. 6.º n.º 1 alínea a RGPD). Podes retirar o consentimento a qualquer momento.',
      ],
    },
    {
      id: 'partilha',
      title: '4. Com quem partilhamos os teus dados',
      paragraphs: [
        'Não vendemos, alugamos nem cedemos os teus dados pessoais a terceiros para fins de marketing. Recorremos a prestadores de serviços (subcontratantes, nos termos do art. 28.º RGPD) estritamente necessários ao funcionamento do site, vinculados por contrato a garantir o mesmo nível de protecção que aplicamos:',
      ],
      list: [
        'Stripe (Stripe Payments Europe Ltd., Irlanda) — processamento de pagamentos. Certificado PCI DSS nível 1.',
        'Vercel Inc. (EUA) — alojamento do site. Transferências abrangidas por Cláusulas Contratuais Tipo aprovadas pela Comissão Europeia.',
        'MongoDB Atlas (MongoDB Inc., EUA/UE) — base de dados. Servidores localizados na União Europeia sempre que possível.',
        'Resend (Resend Inc., EUA) — envio de emails transaccionais (confirmação de compra, recuperação de palavra-passe). Transferências abrangidas por Cláusulas Contratuais Tipo.',
        'Cloudinary — alojamento de imagens e conteúdo multimédia.',
      ],
    },
    {
      id: 'transferencias',
      title: '5. Transferências internacionais',
      paragraphs: [
        'Alguns dos nossos subcontratantes estão sediados fora do Espaço Económico Europeu (EEE). Nestes casos, asseguramos que a transferência ocorre apenas para países com decisão de adequação da Comissão Europeia ou ao abrigo de Cláusulas Contratuais Tipo (Standard Contractual Clauses) que garantem um nível de protecção equivalente ao exigido pelo RGPD.',
        'Para utilizadores no Reino Unido, aplicam-se as International Data Transfer Agreements (IDTA) ou o UK Addendum às Cláusulas Contratuais Tipo da UE. Para utilizadores no Brasil, as transferências são efectuadas nos termos do Capítulo V da LGPD.',
      ],
    },
    {
      id: 'conservacao',
      title: '6. Durante quanto tempo guardamos os teus dados',
      paragraphs: [
        'Conservamos os teus dados apenas pelo tempo necessário às finalidades para que foram recolhidos ou pelo tempo exigido por lei:',
      ],
      list: [
        'Conta de utilizador: enquanto a conta estiver activa. Podes solicitar o encerramento a qualquer momento.',
        'Registos de compra: 10 anos, em cumprimento de obrigações fiscais e contabilísticas (Código Comercial e Código do IVA).',
        'Dados técnicos e logs: até 12 meses para fins de segurança.',
        'Comunicações de suporte: até 3 anos após a última interacção.',
      ],
    },
    {
      id: 'direitos',
      title: '7. Os teus direitos',
      paragraphs: [
        'Tens, em qualquer momento, os seguintes direitos sobre os teus dados pessoais, nos termos do RGPD, UK GDPR e LGPD:',
      ],
      list: [
        'Direito de acesso — saber que dados teus tratamos.',
        'Direito de rectificação — corrigir dados incorrectos ou desactualizados.',
        'Direito ao apagamento ("direito a ser esquecido") — pedir a eliminação dos teus dados, salvo quando exista obrigação legal de conservação.',
        'Direito à limitação do tratamento — suspender temporariamente o tratamento.',
        'Direito de portabilidade — receber os teus dados num formato estruturado e de uso corrente.',
        'Direito de oposição — opor-te a tratamentos baseados em interesse legítimo ou marketing directo.',
        'Direito de retirar o consentimento — a qualquer momento, quando o tratamento se baseie em consentimento.',
        'Direito de não ser sujeito a decisões automatizadas com efeitos significativos.',
      ],
    },
    {
      id: 'exercer-direitos',
      title: '8. Como exercer os teus direitos',
      paragraphs: [
        `Para exercer qualquer destes direitos, envia-nos um email para ${CONTACT_EMAIL} com a identificação do direito que pretendes exercer. Responderemos no prazo máximo de 30 dias, podendo este prazo ser prorrogado por mais 60 dias em casos de especial complexidade, nos termos do art. 12.º n.º 3 do RGPD.`,
        'Se considerares que os teus direitos não foram respeitados, podes apresentar reclamação junto da autoridade de controlo competente:',
      ],
      list: [
        'Portugal: Comissão Nacional de Protecção de Dados (CNPD) — www.cnpd.pt',
        'Brasil: Autoridade Nacional de Protecção de Dados (ANPD) — www.gov.br/anpd',
        "Reino Unido: Information Commissioner's Office (ICO) — ico.org.uk",
        'Outros países da UE: autoridade de controlo do teu país de residência ou de trabalho.',
      ],
    },
    {
      id: 'seguranca',
      title: '9. Segurança dos dados',
      paragraphs: [
        'Aplicamos medidas técnicas e organizativas adequadas para proteger os teus dados contra acesso não autorizado, perda, destruição ou alteração. Entre outras:',
      ],
      list: [
        'Ligações cifradas (HTTPS/TLS) em todas as páginas do site.',
        'Palavras-passe armazenadas com hash bcrypt (nunca em texto legível).',
        'Acesso restrito aos dados por pessoal autorizado e sob dever de confidencialidade.',
        'Revisões periódicas de segurança e actualizações do software.',
      ],
    },
    {
      id: 'menores',
      title: '10. Dados de menores',
      paragraphs: [
        'Os nossos serviços destinam-se a adultos (pais, educadores, profissionais). Não recolhemos conscientemente dados pessoais de menores de 16 anos. Se tomares conhecimento de que um menor nos forneceu dados sem autorização dos pais ou tutores, contacta-nos imediatamente para procedermos à sua eliminação.',
      ],
    },
    {
      id: 'alteracoes',
      title: '11. Alterações a esta política',
      paragraphs: [
        'Esta Política de Privacidade pode ser actualizada periodicamente. A data da última actualização está indicada no início do documento. Alterações materiais serão comunicadas de forma destacada no site ou por email, consoante o impacto.',
      ],
    },
  ],
};

// ============================================================================
// TERMOS E CONDIÇÕES
// ============================================================================
export const termos: LegalPolicy = {
  slug: 'termos',
  title: 'Termos e Condições',
  subtitle:
    'As regras aplicáveis à utilização do site e à aquisição dos nossos conteúdos.',
  lastUpdated: LAST_UPDATED,
  intro: [
    `Os presentes Termos e Condições regulam o acesso e utilização do site growkindworld.com, bem como a aquisição de livros, cursos e demais conteúdos digitais disponibilizados pela ${CONTROLLER_NAME}.`,
    'Ao utilizares este site ou ao efectuares uma compra, declaras ter lido, compreendido e aceitado integralmente estes Termos. Se não concordares com algum dos pontos, pedimos que não utilizes o site nem efectues compras.',
  ],
  sections: [
    {
      id: 'objeto',
      title: '1. Objecto',
      paragraphs: [
        `Estes Termos regulam a relação contratual entre a ${CONTROLLER_NAME} (doravante "nós" ou "o vendedor") e o utilizador ou comprador (doravante "tu" ou "o cliente") no âmbito da utilização do site e da aquisição dos seguintes produtos:`,
      ],
      list: [
        'Livro digital (eBook) "Onde o Mundo Nasce Entre Nós", em formato PDF.',
        'Cursos online e conteúdos formativos, a disponibilizar através da área de membro.',
        'Newsletter e conteúdos gratuitos, quando disponíveis.',
      ],
    },
    {
      id: 'registo',
      title: '2. Registo e conta de utilizador',
      paragraphs: [
        'Para efectuar compras é necessário criar uma conta. Ao registares-te, garantes que:',
      ],
      list: [
        'Tens pelo menos 18 anos ou dispões de autorização legal para contratar.',
        'Os dados que forneces são verdadeiros, completos e actualizados.',
        'És responsável pela confidencialidade da tua palavra-passe e por toda a actividade realizada na tua conta.',
        'Notificas-nos imediatamente em caso de utilização não autorizada da tua conta.',
      ],
    },
    {
      id: 'compra',
      title: '3. Processo de compra',
      paragraphs: ['A compra de produtos no site segue o seguinte fluxo:'],
      list: [
        'Selecção do produto e confirmação do pedido.',
        'Preenchimento dos dados de facturação e pagamento através do Stripe.',
        'Confirmação do pagamento e envio automático de email de confirmação.',
        'Acesso imediato ao conteúdo digital adquirido, disponível na área "A Minha Conta".',
      ],
    },
    {
      id: 'precos',
      title: '4. Preços e pagamento',
      paragraphs: [
        'Os preços indicados no site incluem todos os impostos aplicáveis (IVA na UE, quando devido). Os preços estão expressos em euros (EUR). Poderão ser cobradas taxas adicionais de câmbio ou transacção internacional pelo teu banco ou emissor de cartão, sobre as quais não temos controlo.',
        'O pagamento é processado pelo Stripe, prestador certificado PCI DSS nível 1. Aceitamos cartões de débito e crédito das principais redes (Visa, Mastercard, American Express) e outros métodos disponibilizados pelo Stripe consoante o país.',
        `Reservamo-nos o direito de alterar os preços a qualquer momento, sendo aplicável o preço em vigor no momento da confirmação do pedido.`,
      ],
    },
    {
      id: 'entrega',
      title: '5. Entrega de conteúdo digital',
      paragraphs: [
        'Tratando-se de conteúdo digital, a entrega é imediata após confirmação do pagamento. O acesso é feito através da tua conta, na área "A Minha Conta > Livro" ou "A Minha Conta > Cursos", e também por link enviado no email de confirmação.',
        'O acesso ao conteúdo é pessoal e intransmissível, para uso próprio e não comercial. Cada link de descarga é nominativo e associado à tua conta.',
      ],
    },
    {
      id: 'direito-resolucao',
      title: '6. Direito de resolução e devoluções',
      paragraphs: [
        'As regras aplicáveis a devoluções e direito de arrependimento estão descritas em detalhe na nossa Política de Devoluções.',
        'Importante: ao comprares conteúdo digital e aceitares o início imediato da entrega, consentes expressamente na perda do direito de resolução de 14 dias previsto na Directiva 2011/83/UE (para consumidores na União Europeia e Reino Unido) ou de 7 dias previsto no art. 49.º do Código de Defesa do Consumidor brasileiro, nos termos legalmente admitidos.',
      ],
    },
    {
      id: 'propriedade',
      title: '7. Propriedade intelectual',
      paragraphs: [
        `Todos os conteúdos do site e dos produtos adquiridos — incluindo textos, imagens, vídeos, diagramas, o Relational Development Framework (RDF) e a metodologia a ele associada, marca, logótipo e design — são propriedade da ${CONTROLLER_NAME} ou de terceiros devidamente licenciados, estando protegidos pelas leis de direitos de autor e propriedade industrial aplicáveis.`,
        'Ao comprares um eBook ou curso, recebes uma licença pessoal, não exclusiva, não transmissível e revogável para utilização do conteúdo para uso próprio e estritamente privado. É expressamente proibido:',
      ],
      list: [
        'Reproduzir, copiar, distribuir, vender ou disponibilizar o conteúdo a terceiros.',
        'Partilhar as credenciais de acesso à tua conta.',
        'Utilizar o conteúdo para qualquer finalidade comercial sem autorização escrita prévia.',
        'Remover ou alterar marcas, avisos de direitos de autor ou metadados incorporados nos ficheiros.',
      ],
    },
    {
      id: 'responsabilidade',
      title: '8. Limitação de responsabilidade',
      paragraphs: [
        'Os conteúdos disponibilizados têm finalidade educativa e reflectem a experiência, opinião e metodologia do autor. Não substituem o aconselhamento profissional individualizado de médicos, psicólogos, terapeutas ou outros profissionais de saúde.',
        `Dentro dos limites legalmente admissíveis, a ${CONTROLLER_NAME} não poderá ser responsabilizada por decisões tomadas pelo cliente com base nos conteúdos adquiridos, nem por interrupções temporárias do serviço decorrentes de manutenção, falhas técnicas ou causas de força maior.`,
        'Nada nestes Termos limita os direitos que te assistem enquanto consumidor ao abrigo da legislação aplicável.',
      ],
    },
    {
      id: 'suspensao',
      title: '9. Suspensão e cancelamento da conta',
      paragraphs: [
        'Reservamo-nos o direito de suspender ou cancelar contas que violem estes Termos, designadamente em caso de partilha indevida de conteúdos, fraude, utilização abusiva ou incumprimento das obrigações de pagamento. Em caso de cancelamento por violação grave, não haverá lugar a reembolso dos valores pagos.',
      ],
    },
    {
      id: 'lei-aplicavel',
      title: '10. Lei aplicável e foro',
      paragraphs: [
        'Estes Termos são regidos pela lei portuguesa. Para litígios emergentes, as partes elegem o foro da comarca de Lisboa, sem prejuízo do direito de o consumidor recorrer ao tribunal do seu domicílio ou aos mecanismos alternativos de resolução de litígios previstos na lei aplicável.',
        'Consumidores residentes na União Europeia podem recorrer à plataforma de Resolução de Litígios em Linha (RLL) da Comissão Europeia, disponível em ec.europa.eu/consumers/odr. Em Portugal, podem ainda recorrer ao Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (CNIACC) ou a outra entidade de resolução alternativa de litígios competente.',
      ],
    },
    {
      id: 'alteracoes-termos',
      title: '11. Alterações aos Termos',
      paragraphs: [
        'Reservamo-nos o direito de alterar estes Termos. A versão em vigor em cada momento é a que está publicada no site, com indicação da data da última actualização. Alterações materiais serão comunicadas aos utilizadores registados por email.',
      ],
    },
    {
      id: 'contacto-termos',
      title: '12. Contacto',
      paragraphs: [
        `Para qualquer questão relativa a estes Termos, contacta-nos através do email ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

// ============================================================================
// POLÍTICA DE COOKIES
// ============================================================================
export const cookies: LegalPolicy = {
  slug: 'cookies',
  title: 'Política de Cookies',
  subtitle:
    'Que cookies utilizamos e porquê — uma explicação simples e transparente.',
  lastUpdated: LAST_UPDATED,
  intro: [
    'Esta política explica que cookies utilizamos no site growkindworld.com, para que servem e como os podes gerir. Acreditamos em transparência e minimalismo: só usamos os cookies estritamente necessários ao funcionamento do site.',
    'Esta política deve ser lida em conjunto com a nossa Política de Privacidade.',
  ],
  sections: [
    {
      id: 'o-que-sao',
      title: '1. O que são cookies',
      paragraphs: [
        'Cookies são pequenos ficheiros de texto que um site coloca no teu dispositivo (computador, tablet ou telemóvel) quando o visitas. Servem para lembrar informações sobre a tua sessão, preferências ou estado de autenticação, de modo a que o site funcione correctamente.',
        'Os cookies podem ser de sessão (apagados quando fechas o navegador) ou persistentes (mantêm-se por um período determinado). Podem ser de primeira parte (colocados por este site) ou de terceiros (colocados por serviços externos).',
      ],
    },
    {
      id: 'que-cookies',
      title: '2. Que cookies utilizamos',
      paragraphs: [
        'Actualmente, o site growkindworld.com utiliza exclusivamente cookies estritamente necessários ao seu funcionamento. Não utilizamos cookies de análise, publicidade, marketing ou rastreamento de terceiros.',
        'Os cookies em uso são os seguintes:',
      ],
      list: [
        'next-auth.session-token (ou __Secure-next-auth.session-token em HTTPS) — cookie de sessão que mantém a tua autenticação após o login. Duração: 7 dias. Finalidade: permitir o acesso à tua conta sem exigir nova autenticação a cada página.',
        'next-auth.csrf-token — cookie de segurança que protege contra ataques de falsificação de pedidos (CSRF). Duração: sessão. Finalidade: segurança.',
        'next-auth.callback-url — cookie técnico utilizado durante o processo de login. Duração: sessão. Finalidade: redireccionamento após autenticação.',
        'gk-cookie-info — regista que viste o aviso informativo sobre cookies, para não o mostrar novamente. Duração: 12 meses. Finalidade: usabilidade.',
      ],
    },
    {
      id: 'base-legal',
      title: '3. Base legal',
      paragraphs: [
        'Os cookies que utilizamos são classificados como "estritamente necessários" e, por esse motivo, estão dispensados de consentimento prévio nos termos:',
      ],
      list: [
        'Artigo 5.º n.º 3 da Directiva ePrivacy (2002/58/CE, alterada pela Directiva 2009/136/CE).',
        'Artigo 30.º n.º 2 da Lei portuguesa 41/2004.',
        'Regulation 6(4) das Privacy and Electronic Communications Regulations 2003 (PECR) no Reino Unido.',
        'Artigo 7.º inciso IX da LGPD brasileira (legítimo interesse na prestação do serviço).',
      ],
    },
    {
      id: 'terceiros',
      title: '4. Cookies de terceiros',
      paragraphs: [
        'Não utilizamos cookies de análise (Google Analytics, etc.), publicidade (Meta Pixel, Google Ads, etc.) nem qualquer outro tipo de rastreamento de terceiros.',
        'No entanto, quando efectuas uma compra, és redireccionado para o ambiente seguro do Stripe para processamento do pagamento. O Stripe poderá colocar cookies próprios nesse momento, sujeitos à política de cookies do Stripe (disponível em stripe.com/cookies-policy/legal). Esses cookies destinam-se a prevenir fraude e não são partilhados connosco para fins de marketing.',
        'Caso, no futuro, venhamos a implementar cookies de análise ou marketing, esta política será actualizada e solicitaremos o teu consentimento prévio através de um banner dedicado, conforme exigido pela legislação aplicável.',
      ],
    },
    {
      id: 'gerir',
      title: '5. Como gerir os cookies',
      paragraphs: [
        'Podes controlar e apagar os cookies a qualquer momento através das definições do teu navegador. A maioria dos navegadores permite-te bloquear cookies, apagar os existentes ou receber aviso antes de serem colocados.',
        'Importante: se bloqueares os cookies estritamente necessários, algumas funcionalidades do site deixarão de funcionar, nomeadamente a autenticação e o acesso à área de cliente.',
        'Aqui ficam links para as instruções dos principais navegadores:',
      ],
      list: [
        'Google Chrome: support.google.com/chrome/answer/95647',
        'Mozilla Firefox: support.mozilla.org/kb/cookies-informacoes-sites-armazenam',
        'Safari: support.apple.com/guide/safari/sfri11471',
        'Microsoft Edge: support.microsoft.com/microsoft-edge',
      ],
    },
    {
      id: 'alteracoes-cookies',
      title: '6. Alterações a esta política',
      paragraphs: [
        'Esta Política de Cookies pode ser actualizada sempre que introduzirmos novos cookies ou alterarmos os existentes. A data da última actualização está indicada no início do documento.',
      ],
    },
    {
      id: 'contacto-cookies',
      title: '7. Contacto',
      paragraphs: [
        `Para qualquer questão sobre esta Política de Cookies, contacta-nos através do email ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

// ============================================================================
// POLÍTICA DE DEVOLUÇÕES
// ============================================================================
export const devolucoes: LegalPolicy = {
  slug: 'devolucoes',
  title: 'Política de Devoluções',
  subtitle: 'Como funcionam reembolsos e devoluções para conteúdos digitais.',
  lastUpdated: LAST_UPDATED,
  intro: [
    'Esta política explica como funcionam devoluções, reembolsos e o direito de arrependimento nos conteúdos digitais vendidos pela GrowKind World — livro digital, cursos e outros produtos descarregáveis ou de acesso imediato.',
    'Procurámos ser transparentes: conteúdo digital tem regras específicas na União Europeia, Reino Unido e Brasil, e queremos que as conheças antes de comprar.',
  ],
  sections: [
    {
      id: 'principio-geral',
      title: '1. Princípio geral',
      paragraphs: [
        'Os nossos produtos são conteúdos digitais entregues de forma imediata após a confirmação do pagamento. Não há envio físico, não há custos de transporte e não há estado de "em trânsito": assim que o pagamento é confirmado, o conteúdo fica acessível na tua área de cliente.',
        'A natureza imediata da entrega tem implicações no teu direito de arrependimento, que explicamos a seguir.',
      ],
    },
    {
      id: 'ue-uk',
      title: '2. Consumidores na União Europeia e Reino Unido',
      paragraphs: [
        'Enquanto consumidor residente num Estado-Membro da União Europeia ou no Reino Unido, dispões, em regra, de um período de 14 dias para resolver o contrato sem indicação de motivo, nos termos da Directiva 2011/83/UE (transposta em Portugal pelo Decreto-Lei 24/2014) e do Consumer Contracts Regulations 2013 no Reino Unido.',
        'Contudo, o artigo 16.º alínea m) da Directiva 2011/83/UE prevê uma excepção específica para conteúdos digitais não fornecidos em suporte material: o direito de resolução cessa se a execução tiver tido início com o teu consentimento prévio e expresso e com o teu reconhecimento de que perdes o direito de resolução.',
        'No momento da compra, é-te pedido que aceites expressamente o início imediato da entrega do conteúdo digital e que reconheças a consequente perda do direito de resolução de 14 dias. Esta aceitação é registada e confirmada no email de confirmação da compra.',
        'Por outras palavras: se aceitaste o download imediato do eBook ou o acesso imediato ao curso, o direito de resolução de 14 dias não se aplica a essa compra. Se não aceitaste, o direito continua válido durante 14 dias após a compra.',
      ],
    },
    {
      id: 'brasil',
      title: '3. Consumidores no Brasil',
      paragraphs: [
        'Consumidores residentes no Brasil têm, ao abrigo do artigo 49.º do Código de Defesa do Consumidor (Lei 8.078/90), o direito de desistir do contrato no prazo de 7 dias a contar da assinatura ou do recebimento do produto ou serviço, sempre que a contratação ocorra fora do estabelecimento comercial (o que inclui compras online).',
        'Para conteúdos digitais com entrega imediata, aplicamos o seguinte critério por transparência e boa-fé: o direito de arrependimento pode ser exercido no prazo de 7 dias, desde que o conteúdo não tenha sido efectivamente acedido ou descarregado. Uma vez descarregado o ficheiro ou iniciado o consumo do curso, considera-se que o serviço foi fruído e o direito de arrependimento deixa de ser aplicável.',
        `Para exercer este direito, envia um email para ${CONTACT_EMAIL} dentro do prazo de 7 dias, indicando o número do pedido e a intenção de desistir. Confirmaremos o acesso ao conteúdo e, não havendo fruição, procederemos ao reembolso integral.`,
      ],
    },
    {
      id: 'outros-paises',
      title: '4. Outros países (África e resto do mundo)',
      paragraphs: [
        'Para consumidores residentes em países sem legislação específica sobre direito de arrependimento em compras de conteúdo digital — incluindo muitos países africanos de língua portuguesa — aplicamos por boa-fé os princípios do direito português: reembolso integral se o conteúdo não tiver sido efectivamente descarregado ou acedido, no prazo de 14 dias após a compra.',
        `Qualquer pedido deve ser enviado para ${CONTACT_EMAIL} dentro desse prazo.`,
      ],
    },
    {
      id: 'produto-defeituoso',
      title: '5. Produto defeituoso ou não conforme',
      paragraphs: [
        'Se o conteúdo adquirido apresentar defeito (ficheiro corrompido, incompleto, link de descarga inválido, etc.) ou não corresponder à descrição apresentada no site, tens direito à reparação do defeito (envio de novo ficheiro ou reposição de acesso) ou, não sendo isto possível, ao reembolso integral, independentemente do prazo de arrependimento.',
        'A garantia legal de conformidade é de 2 anos na União Europeia (Directiva UE 2019/770 sobre conteúdos digitais), 3 anos no Brasil para vícios ocultos (art. 26.º e 27.º CDC) e prazos equivalentes noutros ordenamentos.',
        `Para reportar um defeito, contacta-nos por email para ${CONTACT_EMAIL} com o número do pedido e descrição do problema. Respondemos no prazo máximo de 48 horas úteis.`,
      ],
    },
    {
      id: 'como-pedir',
      title: '6. Como pedir um reembolso',
      paragraphs: ['O procedimento é simples:'],
      list: [
        `Envia um email para ${CONTACT_EMAIL} com o assunto "Pedido de reembolso".`,
        'Indica o teu nome, o número do pedido (consta do email de confirmação) e o motivo do pedido.',
        'Recebes confirmação da recepção no prazo máximo de 2 dias úteis.',
        'Após validação, o reembolso é processado no prazo máximo de 14 dias, através do mesmo meio de pagamento utilizado na compra original.',
      ],
    },
    {
      id: 'prazo-reembolso',
      title: '7. Prazos de reembolso',
      paragraphs: [
        'Os reembolsos são processados através do Stripe, utilizando o mesmo método de pagamento da compra original. O prazo de conclusão do reembolso depende do teu banco ou emissor de cartão, sendo habitualmente entre 5 e 14 dias úteis.',
        'Não cobramos qualquer taxa pelo processamento do reembolso.',
      ],
    },
    {
      id: 'litigios-devolucoes',
      title: '8. Resolução de litígios',
      paragraphs: [
        'Caso não estejas satisfeito com a resposta ao teu pedido, podes recorrer aos mecanismos alternativos de resolução de litígios referidos nos nossos Termos e Condições, designadamente à plataforma europeia de Resolução de Litígios em Linha (ec.europa.eu/consumers/odr) ou, em Portugal, ao Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (CNIACC).',
      ],
    },
    {
      id: 'contacto-devolucoes',
      title: '9. Contacto',
      paragraphs: [
        `Para qualquer questão sobre devoluções e reembolsos, contacta-nos através do email ${CONTACT_EMAIL}. Respondemos em dias úteis, no prazo máximo de 48 horas.`,
      ],
    },
  ],
};

// ============================================================================
// Mapa para acesso dinâmico
// ============================================================================
export const legalPolicies = {
  privacidade,
  termos,
  cookies,
  devolucoes,
} as const;

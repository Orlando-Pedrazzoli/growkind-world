// src/app/api/ai-feedback/route.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy seguro para a Anthropic API.
 * A chave API NUNCA é exposta ao browser — fica só no servidor.
 * Body: { prompt, maxTokens?, model?: 'sonnet'|'haiku', moduleId? }
 * Sem moduleId → comportamento antigo (retrocompatível).
 * Com moduleId → injecta o system prompt centralizado do módulo.
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

const MODELS = {
  sonnet: 'claude-sonnet-4-20250514',
  haiku: 'claude-haiku-4-5-20251001',
} as const;

const GUARDRAILS_COMUNS = `Responde SEMPRE em Português (PT-BR). Referencia sempre detalhes concretos do que o aluno escreveu — nunca uses elogios genéricos nem frases de encaixe. Nunca sugiras diagnósticos, rótulos clínicos ou intervenções terapêuticas. Responde APENAS com o texto do feedback — sem etiquetas, sem JSON, sem preâmbulo, sem título.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  'cz-m2-prof': `És o tutor de feedback CPD GrowKind para profissionais de apoio educativo e TAs. Contexto: Curso Zero · Módulo 2 — "Os três elementos do campo". Competência: observação deliberada com o Observation Protocol (7 campos). Conceito RDF: ler o campo relacional nos três elementos — criança, ambiente e adulto — em simultâneo, antes de qualquer decisão de intervenção. Tom: caloroso, preciso, profissional, na segunda pessoa (você). ${GUARDRAILS_COMUNS}`,

  'cz-m3-prof': `És o tutor de feedback CPD GrowKind para profissionais de apoio educativo e TAs. Contexto: Curso Zero · Módulo 3 — "A sua presença já é a intervenção". Competência: tornar-se presença reguladora antes de qualquer instrução verbal — Movimento 1 do RDF (Ser Chão). Conceito: quando o campo está desregulado, a primeira resposta do adulto não é instrução — é regulação. O estado do adulto chega ao sistema nervoso da criança antes de qualquer palavra. Usa linguagem de co-regulação e polivagal com parcimónia e sem jargão excessivo. Tom: caloroso, preciso, profissional, na segunda pessoa (você). ${GUARDRAILS_COMUNS}`,

  'cz-m4-prof': `És o tutor de feedback CPD GrowKind para profissionais de apoio educativo e TAs. Contexto: Curso Zero · Módulo 4 — "O adulto não se torna especialista. Torna-se eixo." (módulo final, de integração). Competência: integrar as três lentes (leitura de campo · Observation Protocol · presença reguladora) numa leitura completa e partilhável — o Movimento Transversal, Ser Eixo. Conceito: o profissional não se torna especialista, torna-se o ponto de coerência entre todos os adultos à volta da criança. O que vê, nomeia; o que nomeia, partilha; o que partilha, cria coerência. Tom: caloroso, preciso, com sentido de chegada, na segunda pessoa (você). ${GUARDRAILS_COMUNS}`,

  'cz-m2-fam': `És o tutor de feedback GrowKind Famílias. Contexto: Curso Zero · Módulo 2 Famílias — "Os três elementos: a criança, o ambiente e você". Conceito RDF: o comportamento do filho não começa no filho — começa no que o campo está a comunicar; ler os três elementos antes de reagir (Tabela Se→Então). Tom: muito caloroso, próximo, linguagem de casa, sem jargão clínico. Enquadra o estado do próprio adulto como ferramenta, nunca como culpa. ${GUARDRAILS_COMUNS}`,

  'cz-m3-fam': `És o tutor de feedback GrowKind Famílias. Contexto: Curso Zero · Módulo 3 Famílias — "Quando o seu filho perde o chão". Conceito RDF: a crise é o limite fisiológico do sistema nervoso — não é falha do filho nem da família; o pedido é presença calma antes de qualquer palavra (Movimento 1, Ser Chão). O estado do adulto chega ao sistema nervoso do filho antes da instrução. Tom: muito caloroso, próximo, sem julgamento — esta família esteve numa situação difícil. Linguagem de casa. ${GUARDRAILS_COMUNS}`,

  'cz-m4-fam': `És o tutor de feedback GrowKind Famílias. Contexto: Curso Zero · Módulo 4 Famílias (módulo final, de integração). Conceito RDF: a família que conclui o Curso Zero não se torna especialista do filho — torna-se o ponto de coerência entre todos os adultos à sua volta (professores, terapeutas, família alargada). O que vêem, conseguem nomear; o que nomeiam, conseguem partilhar. Movimento Transversal, Ser Eixo. Tom: caloroso, com sentido de chegada — completaram um percurso real. Linguagem de casa. ${GUARDRAILS_COMUNS}`,
};

const MAX_PROMPT_LENGTH = 4000;
const MAX_TOKENS_CAP = 1000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) rateLimitMap.delete(key);
    }
  }, 5 * 60_000).unref?.();
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[ai-feedback] ANTHROPIC_API_KEY não configurada');
    return NextResponse.json(
      { error: 'Serviço temporariamente indisponível.' },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiados pedidos. Aguarde um momento.' },
      { status: 429 },
    );
  }

  let body: {
    prompt?: string;
    maxTokens?: number;
    model?: string;
    moduleId?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const { prompt, maxTokens, model, moduleId } = body;

  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    return NextResponse.json(
      { error: 'Campo "prompt" em falta ou inválido.' },
      { status: 400 },
    );
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: 'Prompt demasiado longo.' },
      { status: 400 },
    );
  }

  let systemPrompt: string | undefined;
  if (typeof moduleId === 'string' && moduleId.trim().length > 0) {
    systemPrompt = SYSTEM_PROMPTS[moduleId];
    if (!systemPrompt) {
      console.warn(`[ai-feedback] moduleId desconhecido: ${moduleId}`);
    }
  }

  const modelId = model === 'haiku' ? MODELS.haiku : MODELS.sonnet;

  const tokens = Math.min(
    typeof maxTokens === 'number' && maxTokens > 0 ? maxTokens : 400,
    MAX_TOKENS_CAP,
  );

  try {
    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: tokens,
        ...(systemPrompt ? { system: systemPrompt } : {}),
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errorText = await anthropicRes.text();
      console.error(
        `[ai-feedback] Anthropic ${anthropicRes.status}:`,
        errorText.slice(0, 300),
      );
      return NextResponse.json(
        { error: 'Serviço de IA indisponível de momento.' },
        { status: 502 },
      );
    }

    const data = await anthropicRes.json();
    const text = data?.content?.[0]?.text;

    if (typeof text !== 'string') {
      console.error('[ai-feedback] Resposta inesperada da Anthropic');
      return NextResponse.json(
        { error: 'Resposta inválida do serviço de IA.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error('[ai-feedback] Erro ao chamar Anthropic:', err);
    return NextResponse.json(
      { error: 'Erro ao comunicar com o serviço de IA.' },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 });
}

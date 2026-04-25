// src/app/api/ai-feedback/route.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy seguro para a Anthropic API.
 *
 * Recebe prompts dos HTMLs dos cursos e devolve o feedback gerado pelo Claude.
 * A chave API NUNCA é exposta ao browser — fica apenas no ambiente do servidor
 * (process.env.ANTHROPIC_API_KEY).
 *
 * Endpoint: POST /api/ai-feedback
 * Body: { prompt: string, maxTokens?: number, model?: 'sonnet' | 'haiku' }
 * Response: { text: string } | { error: string }
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// Modelos disponíveis — mapeamento de alias para ID real
const MODELS = {
  sonnet: 'claude-sonnet-4-20250514',
  haiku: 'claude-haiku-4-5-20251001',
} as const;

// Limites de segurança
const MAX_PROMPT_LENGTH = 4000; // evita abuso (utilizador malicioso a colar textos enormes)
const MAX_TOKENS_CAP = 1000; // limite de saída por pedido

// Rate limiting simples em memória (protege contra bursts por IP)
// Nota: em múltiplas instâncias Vercel, cada instância tem o seu próprio contador.
// Para rate limiting robusto, migrar para Upstash/Redis no futuro.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX = 10; // 10 chamadas por IP por minuto
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Limpeza periódica do mapa (evita crescer indefinidamente)
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) rateLimitMap.delete(key);
    }
  }, 5 * 60_000).unref?.();
}

export async function POST(req: NextRequest) {
  // 1. Validar que a chave API está configurada
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[ai-feedback] ANTHROPIC_API_KEY não configurada');
    return NextResponse.json(
      { error: 'Serviço temporariamente indisponível.' },
      { status: 503 },
    );
  }

  // 2. Rate limit por IP
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

  // 3. Validar body
  let body: { prompt?: string; maxTokens?: number; model?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const { prompt, maxTokens, model } = body;

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

  // Seleção do modelo
  const modelId = model === 'haiku' ? MODELS.haiku : MODELS.sonnet; // default: sonnet

  const tokens = Math.min(
    typeof maxTokens === 'number' && maxTokens > 0 ? maxTokens : 400,
    MAX_TOKENS_CAP,
  );

  // 4. Chamar Anthropic
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

// Bloquear outros métodos
export async function GET() {
  return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 });
}

// src/app/api/subscribe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import EmailSubscriber, {
  type SubscriberSource,
} from '@/models/EmailSubscriber';

// Validação de email simples mas eficaz
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES: SubscriberSource[] = [
  'homepage',
  'sobre',
  'cursos',
  'o-livro',
  'other',
];

function isValidSource(s: unknown): s is SubscriberSource {
  return typeof s === 'string' && VALID_SOURCES.includes(s as SubscriberSource);
}

// Rate limit simples em memória — protege contra spam
// Em produção usar Vercel Edge Config ou Redis para multi-instance
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  const recentRequests = requests.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  // Limpeza periódica para não acumular memória
  if (requestLog.size > 1000) {
    for (const [key, times] of requestLog.entries()) {
      const filtered = times.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (filtered.length === 0) {
        requestLog.delete(key);
      } else {
        requestLog.set(key, filtered);
      }
    }
  }

  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas tentativas. Tenta novamente daqui a um minuto.' },
        { status: 429 },
      );
    }

    // 2. Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
    }

    const data = body as { email?: unknown; source?: unknown };
    const rawEmail = typeof data.email === 'string' ? data.email.trim() : '';
    const email = rawEmail.toLowerCase();

    // 3. Validar email
    if (!email || !EMAIL_REGEX.test(email) || email.length > 200) {
      return NextResponse.json(
        { error: 'Por favor introduz um email válido.' },
        { status: 400 },
      );
    }

    const source: SubscriberSource = isValidSource(data.source)
      ? data.source
      : 'homepage';

    // 4. Guardar na BD
    await connectDB();

    // Tentar criar — se já existe, devolver sucesso amigável
    // (não revelar se o email já estava ou não na lista — privacidade)
    const userAgent = req.headers.get('user-agent')?.slice(0, 500) || undefined;

    try {
      await EmailSubscriber.create({
        email,
        source,
        status: 'active',
        ipAddress: ip !== 'unknown' ? ip : undefined,
        userAgent,
        subscribedAt: new Date(),
      });
    } catch (err: unknown) {
      // Erro 11000 = duplicate key (email já existe)
      // Tratar como sucesso para não revelar que email já estava registado
      const isDuplicate =
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: number }).code === 11000;

      if (!isDuplicate) {
        console.error('[SUBSCRIBE] Erro ao guardar:', err);
        return NextResponse.json(
          { error: 'Erro ao processar inscrição. Tenta novamente.' },
          { status: 500 },
        );
      }

      // Se já estava unsubscribed, reactivar
      await EmailSubscriber.updateOne(
        { email, status: 'unsubscribed' },
        {
          $set: {
            status: 'active',
            subscribedAt: new Date(),
            source,
          },
          $unset: { unsubscribedAt: '' },
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inscrição confirmada — bem-vindo à lista.',
    });
  } catch (error) {
    console.error('[SUBSCRIBE ERROR]', error);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição. Tenta novamente.' },
      { status: 500 },
    );
  }
}

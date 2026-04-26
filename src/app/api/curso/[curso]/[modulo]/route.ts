// src/app/api/curso/[curso]/[modulo]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

/**
 * Rota protegida que serve os HTMLs M2-M4 dos cursos.
 *
 * Os ficheiros estão em `private/cursos/{curso}/{modulo}.html` (fora do `public/`)
 * e só são servidos se:
 *   1. O utilizador está autenticado
 *   2. Tem uma Purchase completed para o produto correspondente
 *
 * Os HTMLs do M1 continuam em `public/cursos/...` (gratuitos, indexáveis,
 * acessíveis a todos via URL direto).
 */

type CursoSlug = 'profissionais' | 'familias';
type ModuloSlug = 'm2' | 'm3' | 'm4';

const CURSO_TO_PRODUCT: Record<CursoSlug, 'curso-prof' | 'curso-fam'> = {
  profissionais: 'curso-prof',
  familias: 'curso-fam',
};

const MODULO_TO_FILENAME: Record<CursoSlug, Record<ModuloSlug, string>> = {
  profissionais: {
    m2: 'cz-m2-prof.html',
    m3: 'cz-m3-prof.html',
    m4: 'cz-m4-prof.html',
  },
  familias: {
    m2: 'cz-m2-fam.html',
    m3: 'cz-m3-fam.html',
    m4: 'cz-m4-fam.html',
  },
};

function isValidCurso(c: string): c is CursoSlug {
  return c === 'profissionais' || c === 'familias';
}

function isValidModulo(m: string): m is ModuloSlug {
  return m === 'm2' || m === 'm3' || m === 'm4';
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ curso: string; modulo: string }> },
) {
  const { curso, modulo } = await context.params;

  // 1. Validar params
  if (!isValidCurso(curso)) {
    return NextResponse.json({ error: 'Curso inválido.' }, { status: 400 });
  }
  if (!isValidModulo(modulo)) {
    return NextResponse.json(
      { error: 'Módulo inválido ou módulo gratuito (use o caminho público).' },
      { status: 400 },
    );
  }

  // 2. Verificar autenticação
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Necessário fazer login para aceder a este módulo.' },
      { status: 401 },
    );
  }

  // 3. Verificar compra
  await connectDB();
  const purchase = await Purchase.findOne({
    userEmail: session.user.email.toLowerCase(),
    product: CURSO_TO_PRODUCT[curso],
    status: 'completed',
  });

  if (!purchase) {
    return NextResponse.json(
      {
        error: 'Não tens acesso a este módulo. Adquire o curso para continuar.',
      },
      { status: 403 },
    );
  }

  // 4. Ler HTML do filesystem (fora de public/)
  const filename = MODULO_TO_FILENAME[curso][modulo];
  const filePath = path.join(
    process.cwd(),
    'private',
    'cursos',
    curso,
    filename,
  );

  try {
    const html = await readFile(filePath, 'utf-8');

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Não cachear — queremos que verificação de acesso seja sempre fresca
        'Cache-Control': 'private, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('[CURSO PROTECTED] Erro a ler ficheiro:', filePath, err);
    return NextResponse.json(
      { error: 'Conteúdo do módulo indisponível de momento.' },
      { status: 404 },
    );
  }
}

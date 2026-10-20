// src/lib/admin/auth.ts
// Guarda única para as rotas /api/admin/*.
// Mesma regra do layout do admin + da rota de preços:
// role 'admin' na sessão OU email listado em ADMIN_EMAILS.
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/access';

export async function isAdminSession(): Promise<boolean> {
  const session = await auth();
  return (
    !!session?.user &&
    (session.user.role === 'admin' || isAdminEmail(session.user.email))
  );
}

/**
 * Uso nas rotas:
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminSession()) return null;
  return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
}

/** Lê o body JSON sem rebentar com body vazio/inválido. */
export async function readJson<T = Record<string, unknown>>(
  req: Request,
): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

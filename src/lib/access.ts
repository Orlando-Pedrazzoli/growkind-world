// src/lib/access.ts
/**
 * Helper central de controlo de acesso a conteúdo pago.
 *
 * Um utilizador tem acesso a um produto se:
 *   1. É admin (email listado em ADMIN_EMAILS), OU
 *   2. Tem uma Purchase com status 'completed' para esse produto
 *
 * Usar SEMPRE este helper para qualquer verificação de acesso a conteúdo pago.
 */

import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import type { ProductType } from '@/models/Purchase';

// Lista de emails com acesso de admin (mesma fonte que auth.ts)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Verifica se um email tem privilégios de admin.
 * Síncrono — não toca na BD.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Verifica se um utilizador tem acesso a um produto específico.
 * Admins têm acesso a todos os produtos automaticamente.
 */
export async function hasAccess(
  email: string | null | undefined,
  product: ProductType,
): Promise<boolean> {
  if (!email) return false;

  // 1. Admin bypass — não precisa de tocar na BD
  if (isAdminEmail(email)) {
    return true;
  }

  // 2. Verificar Purchase real
  await connectDB();
  const purchase = await Purchase.findOne({
    userEmail: email.toLowerCase(),
    product,
    status: 'completed',
  }).lean();

  return !!purchase;
}

/**
 * Devolve todos os productKeys a que o utilizador tem acesso.
 * Para admins, devolve todos os produtos da plataforma.
 * Para clientes normais, devolve os de Purchases completed.
 */
export async function getOwnedProducts(
  email: string | null | undefined,
): Promise<Set<ProductType>> {
  if (!email) return new Set();

  // Admins têm acesso a tudo
  if (isAdminEmail(email)) {
    return new Set<ProductType>(['ebook', 'curso-prof', 'curso-fam']);
  }

  // Clientes — verificar Purchases reais
  await connectDB();
  const purchases = await Purchase.find({
    userEmail: email.toLowerCase(),
    status: 'completed',
  })
    .select('product')
    .lean();

  return new Set(purchases.map(p => p.product as ProductType));
}

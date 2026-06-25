// src/app/api/admin/prices/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/access';
import { connectDB } from '@/lib/db';
import ProductPrice from '@/models/ProductPrice';
import { getPricesMap, ALL_PRODUCTS } from '@/lib/prices';
import type { ProductType } from '@/models/Purchase';

// Limites sãos para evitar erros graves (em cêntimos)
const MIN_CENTS = 50; // 0,50 €
const MAX_CENTS = 1_000_000; // 10 000 €

async function ensureAdmin() {
  const session = await auth();
  const ok =
    !!session?.user &&
    (session.user.role === 'admin' || isAdminEmail(session.user.email));
  return ok;
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
  }
  const prices = await getPricesMap();
  return NextResponse.json({ prices });
}

export async function PATCH(req: NextRequest) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
  }

  let product: unknown;
  let amount: unknown;
  try {
    const body = await req.json();
    product = body?.product;
    amount = body?.amount;
  } catch {
    /* body inválido */
  }

  if (
    typeof product !== 'string' ||
    !ALL_PRODUCTS.includes(product as ProductType)
  ) {
    return NextResponse.json({ error: 'Produto inválido.' }, { status: 400 });
  }
  if (
    typeof amount !== 'number' ||
    !Number.isInteger(amount) ||
    amount < MIN_CENTS ||
    amount > MAX_CENTS
  ) {
    return NextResponse.json(
      {
        error: `Valor inválido. Tem de estar entre ${MIN_CENTS / 100}€ e ${MAX_CENTS / 100}€.`,
      },
      { status: 400 },
    );
  }

  await connectDB();
  await ProductPrice.findOneAndUpdate(
    { product },
    { product, amount, currency: 'eur' },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return NextResponse.json({ ok: true, product, amount });
}

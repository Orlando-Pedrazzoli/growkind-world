// src/app/api/admin/orders/cancel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/access';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  // ── Autorização: tem de ser admin ──
  const session = await auth();
  const isAdmin =
    !!session?.user &&
    (session.user.role === 'admin' || isAdminEmail(session.user.email));

  if (!isAdmin) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
  }

  // ── Input ──
  let id: string | undefined;
  try {
    const body = await req.json();
    id = body?.id;
  } catch {
    /* body inválido */
  }
  if (!id) {
    return NextResponse.json(
      { error: 'ID do pedido em falta.' },
      { status: 400 },
    );
  }

  await connectDB();

  const purchase = await Purchase.findById(id);
  if (!purchase) {
    return NextResponse.json(
      { error: 'Pedido não encontrado.' },
      { status: 404 },
    );
  }

  // Só pendentes podem ser cancelados (nunca um pedido já pago).
  if (purchase.status !== 'pending') {
    return NextResponse.json(
      { error: 'Só é possível cancelar pedidos pendentes.' },
      { status: 409 },
    );
  }

  // Expira a sessão de checkout no Stripe (best-effort) para impedir um
  // pagamento tardio que reativasse o pedido. Se já expirou, ignora o erro.
  try {
    if (purchase.stripeSessionId) {
      await stripe.checkout.sessions.expire(purchase.stripeSessionId);
    }
  } catch (err) {
    console.warn(
      '[ADMIN CANCEL] expire da sessão Stripe falhou (provavelmente já expirou):',
      err,
    );
  }

  purchase.status = 'cancelled';
  await purchase.save();

  return NextResponse.json({ ok: true, status: 'cancelled' });
}

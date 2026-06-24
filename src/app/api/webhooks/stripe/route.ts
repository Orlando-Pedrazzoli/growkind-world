// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import User from '@/models/User';
import { sendEmail } from '@/lib/email/resend';
import { customerPurchaseEmail, adminSaleEmail } from '@/lib/email/templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header.' },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[WEBHOOK SIGNATURE ERROR]', message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await connectDB();

      const purchase = await Purchase.findOne({ stripeSessionId: session.id });

      // Idempotência: só processa se ainda estiver 'pending'.
      // Um pedido cancelado/falhado/já pago nunca é (re)processado.
      if (purchase && purchase.status === 'pending') {
        purchase.status = 'completed';
        purchase.stripePaymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id;
        await purchase.save();

        console.log(
          `[WEBHOOK] Purchase completed: ${purchase.userEmail} — ${purchase.product}`,
        );

        // ── Notificações (não devem fazer o webhook falhar) ──
        try {
          const user = await User.findOne({ email: purchase.userEmail })
            .select('name')
            .lean();

          // Email do João — usado no reply-to do cliente E no aviso de venda.
          const adminTo =
            process.env.ADMIN_NOTIFY_EMAIL ||
            process.env.ADMIN_EMAILS?.split(',')[0]?.trim();

          // 1) Confirmação ao cliente (enviada de noreply@ -> respostas vão para o João)
          const customer = customerPurchaseEmail({
            name: user?.name,
            product: purchase.product,
            amount: purchase.amount,
            currency: purchase.currency,
          });
          await sendEmail({
            to: purchase.userEmail,
            subject: customer.subject,
            html: customer.html,
            replyTo: adminTo,
          });

          // 2) Aviso de nova venda ao admin (João)
          if (adminTo) {
            const adminMail = adminSaleEmail({
              customerName: user?.name,
              customerEmail: purchase.userEmail,
              product: purchase.product,
              amount: purchase.amount,
              currency: purchase.currency,
            });
            await sendEmail({
              to: adminTo,
              subject: adminMail.subject,
              html: adminMail.html,
              replyTo: purchase.userEmail,
            });
          }
        } catch (emailErr) {
          // Falha de email não invalida a compra — só registamos.
          console.error('[WEBHOOK EMAIL ERROR]', emailErr);
        }
      }
    } catch (error) {
      console.error('[WEBHOOK DB ERROR]', error);
      return NextResponse.json(
        { error: 'Database update failed.' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}

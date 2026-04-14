import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';

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

      await Purchase.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: 'completed',
          stripePaymentIntentId:
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id,
        },
      );

      console.log(
        `[WEBHOOK] Purchase completed: ${session.metadata?.userEmail} — ${session.metadata?.product}`,
      );
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

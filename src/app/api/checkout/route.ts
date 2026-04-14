import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import User from '@/models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Precisas de fazer login para comprar.' },
        { status: 401 },
      );
    }

    await connectDB();

    // Verificar se já comprou
    const existingPurchase = await Purchase.findOne({
      userEmail: session.user.email.toLowerCase(),
      product: 'ebook',
      status: 'completed',
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Já tens acesso ao eBook.', redirect: '/a-minha-conta/livro' },
        { status: 400 },
      );
    }

    // Buscar user no MongoDB para o userId
    const dbUser = await User.findOne({
      email: session.user.email.toLowerCase(),
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'Utilizador não encontrado.' },
        { status: 404 },
      );
    }

    // Criar sessão Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Onde o Mundo Nasce Entre Nós — eBook',
              description: 'PDF + ePub · Acesso imediato no site',
            },
            unit_amount: 1200, // €12.00 em cêntimos
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: dbUser._id.toString(),
        userEmail: session.user.email.toLowerCase(),
        product: 'ebook',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/comprar/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/o-livro`,
    });

    // Registar purchase como pending
    await Purchase.create({
      userId: dbUser._id,
      userEmail: session.user.email.toLowerCase(),
      product: 'ebook',
      stripeSessionId: checkoutSession.id,
      amount: 1200,
      currency: 'eur',
      status: 'pending',
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error);
    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento.' },
      { status: 500 },
    );
  }
}

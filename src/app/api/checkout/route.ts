// src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import User from '@/models/User';
import { cursosPorProductKey } from '@/lib/data/cursos';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

type ProductRequest = 'ebook' | 'curso-prof' | 'curso-fam';

interface ProductCatalogEntry {
  name: string;
  description: string;
  amount: number; // cêntimos
  successPath: string;
  cancelPath: string;
  alreadyOwnedRedirect: string;
}

function getProductCatalog(product: ProductRequest): ProductCatalogEntry {
  switch (product) {
    case 'ebook':
      return {
        name: 'Onde o Mundo Nasce Entre Nós — eBook',
        description: 'Livro digital · Acesso vitalício no site',
        amount: 1400, // €14 (atualizado)
        successPath: '/comprar/sucesso?session_id={CHECKOUT_SESSION_ID}',
        cancelPath: '/o-livro',
        alreadyOwnedRedirect: '/a-minha-conta/livro',
      };
    case 'curso-prof': {
      const c = cursosPorProductKey['curso-prof'];
      return {
        name: `${c.nome} — Curso Completo`,
        description: 'Acesso aos módulos 2, 3 e 4 · Para Profissionais',
        amount: c.preco,
        successPath:
          '/comprar/sucesso?session_id={CHECKOUT_SESSION_ID}&product=curso-prof',
        cancelPath: '/cursos/profissionais',
        alreadyOwnedRedirect: '/a-minha-conta/cursos',
      };
    }
    case 'curso-fam': {
      const c = cursosPorProductKey['curso-fam'];
      return {
        name: `${c.nome} — Curso Completo`,
        description: 'Acesso aos módulos 2, 3 e 4 · Para Famílias',
        amount: c.preco,
        successPath:
          '/comprar/sucesso?session_id={CHECKOUT_SESSION_ID}&product=curso-fam',
        cancelPath: '/cursos/familias',
        alreadyOwnedRedirect: '/a-minha-conta/cursos',
      };
    }
    default: {
      const _exhaustive: never = product;
      throw new Error(`Produto desconhecido: ${_exhaustive}`);
    }
  }
}

function isValidProduct(p: unknown): p is ProductRequest {
  return p === 'ebook' || p === 'curso-prof' || p === 'curso-fam';
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Precisas de fazer login para comprar.' },
        { status: 401 },
      );
    }

    let product: ProductRequest = 'ebook';
    try {
      const body = await req.json();
      if (body?.product && isValidProduct(body.product)) {
        product = body.product;
      }
    } catch {
      // body vazio → mantém default 'ebook'
    }

    const catalog = getProductCatalog(product);

    await connectDB();

    const existingPurchase = await Purchase.findOne({
      userEmail: session.user.email.toLowerCase(),
      product,
      status: 'completed',
    });

    if (existingPurchase) {
      return NextResponse.json(
        {
          error: 'Já tens acesso a este produto.',
          redirect: catalog.alreadyOwnedRedirect,
        },
        { status: 400 },
      );
    }

    const dbUser = await User.findOne({
      email: session.user.email.toLowerCase(),
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'Utilizador não encontrado.' },
        { status: 404 },
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: catalog.name,
              description: catalog.description,
            },
            unit_amount: catalog.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: dbUser._id.toString(),
        userEmail: session.user.email.toLowerCase(),
        product,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}${catalog.successPath}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}${catalog.cancelPath}`,
    });

    await Purchase.create({
      userId: dbUser._id,
      userEmail: session.user.email.toLowerCase(),
      product,
      stripeSessionId: checkoutSession.id,
      amount: catalog.amount,
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

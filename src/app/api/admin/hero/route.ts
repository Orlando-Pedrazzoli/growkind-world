// src/app/api/admin/hero/route.ts
// GET  → lista de slides (admin)
// POST → cria um slide (ou, com { importDefaults: true }, importa os 3 do código)
import { NextResponse } from 'next/server';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { connectDB } from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';
import { getHeroSlidesRaw } from '@/lib/cms/content';
import { DEFAULT_HERO_SLIDES } from '@/lib/cms/registry';
import { revalidateHome } from '@/lib/cms/revalidate';
import {
  parseImageAsset,
  parseLocalized,
  parseHref,
  parseBoolean,
  ValidationError,
} from '@/lib/cms/validate';

const MAX_SLIDES = 8;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const slides = await getHeroSlidesRaw();
  return NextResponse.json({ slides });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<Record<string, unknown>>(req);
  await connectDB();

  // ── Importar os slides actuais do código (só se a colecção estiver vazia)
  if (body?.importDefaults === true) {
    const count = await HeroSlide.countDocuments();
    if (count > 0) {
      return NextResponse.json(
        { error: 'Já existem slides guardados.' },
        { status: 409 },
      );
    }
    await HeroSlide.insertMany(DEFAULT_HERO_SLIDES);
    revalidateHome();
    return NextResponse.json({ slides: await getHeroSlidesRaw() });
  }

  // ── Criar um slide novo
  try {
    const count = await HeroSlide.countDocuments();
    if (count >= MAX_SLIDES) {
      return NextResponse.json(
        { error: `Máximo de ${MAX_SLIDES} slides.` },
        { status: 400 },
      );
    }
    const desktop = parseImageAsset(body?.desktop, 'Imagem desktop');
    const mobile = parseImageAsset(body?.mobile, 'Imagem mobile');
    const alt = parseLocalized(body?.alt, 'Texto alternativo', {
      required: true,
      max: 300,
    });
    const href = parseHref(body?.href);
    const active = parseBoolean(body?.active, true);

    const last = await HeroSlide.findOne().sort({ order: -1 }).select('order');
    const order = last ? last.order + 1 : 0;

    const doc = await HeroSlide.create({
      order,
      active,
      desktop,
      mobile,
      alt,
      href,
    });
    revalidateHome();
    return NextResponse.json({ id: String(doc._id) }, { status: 201 });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/hero POST]', err);
    return NextResponse.json(
      { error: 'Erro ao criar slide.' },
      { status: 500 },
    );
  }
}

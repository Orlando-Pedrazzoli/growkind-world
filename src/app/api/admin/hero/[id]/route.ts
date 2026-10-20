// src/app/api/admin/hero/[id]/route.ts
// PATCH  → actualiza um slide (imagens, alt, link, activo)
// DELETE → remove o slide e apaga as imagens no Cloudinary
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { connectDB } from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';
import { destroyAsset } from '@/lib/cloudinary';
import { revalidateHome } from '@/lib/cms/revalidate';
import {
  parseImageAsset,
  parseLocalized,
  parseHref,
  parseBoolean,
  ValidationError,
} from '@/lib/cms/validate';

type Ctx = { params: Promise<{ id: string }> };

function badId(id: string) {
  return !mongoose.Types.ObjectId.isValid(id);
}

export async function PATCH(req: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  if (badId(id)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }
  const body = await readJson<Record<string, unknown>>(req);
  if (!body) {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  try {
    await connectDB();
    const doc = await HeroSlide.findById(id);
    if (!doc) {
      return NextResponse.json(
        { error: 'Slide não encontrado.' },
        { status: 404 },
      );
    }

    // Só actualiza o que vier no body (PATCH parcial)
    const toDestroy: string[] = [];

    if (body.desktop !== undefined) {
      const next = parseImageAsset(body.desktop, 'Imagem desktop');
      if (doc.desktop.publicId && doc.desktop.publicId !== next.publicId) {
        toDestroy.push(doc.desktop.publicId);
      }
      doc.desktop = next;
    }
    if (body.mobile !== undefined) {
      const next = parseImageAsset(body.mobile, 'Imagem mobile');
      if (doc.mobile.publicId && doc.mobile.publicId !== next.publicId) {
        toDestroy.push(doc.mobile.publicId);
      }
      doc.mobile = next;
    }
    if (body.alt !== undefined) {
      doc.alt = parseLocalized(body.alt, 'Texto alternativo', {
        required: true,
        max: 300,
      });
    }
    if (body.href !== undefined) doc.href = parseHref(body.href);
    if (body.active !== undefined)
      doc.active = parseBoolean(body.active, doc.active);

    await doc.save();
    await Promise.all(toDestroy.map(destroyAsset));
    revalidateHome();
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/hero PATCH]', err);
    return NextResponse.json({ error: 'Erro ao guardar.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  if (badId(id)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 });
  }

  await connectDB();
  const doc = await HeroSlide.findByIdAndDelete(id);
  if (!doc) {
    return NextResponse.json(
      { error: 'Slide não encontrado.' },
      { status: 404 },
    );
  }
  await Promise.all([
    destroyAsset(doc.desktop?.publicId),
    destroyAsset(doc.mobile?.publicId),
  ]);
  revalidateHome();
  return NextResponse.json({ ok: true });
}

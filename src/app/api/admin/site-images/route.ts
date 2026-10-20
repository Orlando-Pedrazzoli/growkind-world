// src/app/api/admin/site-images/route.ts
// GET    → { images: { [key]: ImageAsset | null } } (null = a usar o ficheiro original)
// PUT    → { key, image } substitui a imagem do slot
// DELETE → { key } repõe o ficheiro original (/public) e apaga o asset Cloudinary
import { NextResponse } from 'next/server';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { connectDB } from '@/lib/db';
import SiteImage from '@/models/SiteImage';
import { destroyAsset } from '@/lib/cloudinary';
import { getSlotDef, IMAGE_SLOT_KEYS } from '@/lib/cms/registry';
import { revalidatePaths, revalidateEverything } from '@/lib/cms/revalidate';
import { parseImageAsset, ValidationError } from '@/lib/cms/validate';
import type { ImageAsset } from '@/types/cms';

function revalidateFor(key: string) {
  const def = getSlotDef(key);
  if (!def) return;
  // Logos estão no layout (todas as páginas)
  if (key.startsWith('header.') || key.startsWith('footer.')) {
    revalidateEverything();
    return;
  }
  revalidatePaths(def.revalidate);
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  await connectDB();
  const docs = await SiteImage.find({ key: { $in: IMAGE_SLOT_KEYS } }).lean();
  const images: Record<string, ImageAsset | null> = {};
  for (const key of IMAGE_SLOT_KEYS) {
    const d = docs.find(x => x.key === key);
    images[key] = d
      ? {
          url: d.image.url,
          publicId: d.image.publicId ?? null,
          width: d.image.width ?? null,
          height: d.image.height ?? null,
        }
      : null;
  }
  return NextResponse.json({ images });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<{ key?: unknown; image?: unknown }>(req);
  const key = typeof body?.key === 'string' ? body.key : '';
  if (!getSlotDef(key)) {
    return NextResponse.json({ error: 'Slot inválido.' }, { status: 400 });
  }

  try {
    const image = parseImageAsset(body?.image, 'Imagem');
    await connectDB();
    const prev = (await SiteImage.findOne({ key }).lean()) as {
      image?: ImageAsset;
    } | null;
    await SiteImage.findOneAndUpdate(
      { key },
      { key, image },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    if (prev?.image?.publicId && prev.image.publicId !== image.publicId) {
      await destroyAsset(prev.image.publicId);
    }
    revalidateFor(key);
    return NextResponse.json({ ok: true, image });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/site-images PUT]', err);
    return NextResponse.json({ error: 'Erro ao guardar.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<{ key?: unknown }>(req);
  const key = typeof body?.key === 'string' ? body.key : '';
  if (!getSlotDef(key)) {
    return NextResponse.json({ error: 'Slot inválido.' }, { status: 400 });
  }

  await connectDB();
  const doc = await SiteImage.findOneAndDelete({ key });
  if (doc?.image?.publicId) await destroyAsset(doc.image.publicId);
  revalidateFor(key);
  return NextResponse.json({ ok: true });
}

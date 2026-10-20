// src/app/api/admin/upload/route.ts
// DELETE — apaga um asset Cloudinary que ficou órfão (ex.: upload feito mas
// o admin cancelou antes de guardar). Só aceita publicIds da nossa pasta.
import { NextResponse } from 'next/server';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { destroyAsset, CLOUDINARY_ROOT_FOLDER } from '@/lib/cloudinary';

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<{ publicId?: string }>(req);
  const publicId = body?.publicId;

  if (
    typeof publicId !== 'string' ||
    !publicId.startsWith(`${CLOUDINARY_ROOT_FOLDER}/`)
  ) {
    return NextResponse.json({ error: 'publicId inválido.' }, { status: 400 });
  }

  const ok = await destroyAsset(publicId);
  return NextResponse.json({ ok });
}

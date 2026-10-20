// src/app/api/admin/upload/sign/route.ts
// Devolve a assinatura para o browser fazer upload directo ao Cloudinary.
import { NextResponse } from 'next/server';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { buildUploadSignature, isCloudinaryConfigured } from '@/lib/cloudinary';

const ALLOWED_FOLDERS = ['hero', 'site', 'home'] as const;

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          'Cloudinary não configurado. Define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET.',
      },
      { status: 503 },
    );
  }

  const body = await readJson<{ folder?: string }>(req);
  const folder = (body?.folder || 'site') as (typeof ALLOWED_FOLDERS)[number];
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Pasta inválida.' }, { status: 400 });
  }

  return NextResponse.json(buildUploadSignature(folder));
}

// src/app/api/admin/hero/reorder/route.ts
// PUT { ids: string[] } → grava a nova ordem dos slides.
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { connectDB } from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';
import { revalidateHome } from '@/lib/cms/revalidate';

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<{ ids?: unknown }>(req);
  const ids = body?.ids;
  if (
    !Array.isArray(ids) ||
    ids.length === 0 ||
    !ids.every(
      id => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id),
    )
  ) {
    return NextResponse.json(
      { error: 'Lista de IDs inválida.' },
      { status: 400 },
    );
  }

  await connectDB();
  await HeroSlide.bulkWrite(
    ids.map((id: string, order: number) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    })),
  );
  revalidateHome();
  return NextResponse.json({ ok: true });
}

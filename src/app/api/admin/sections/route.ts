// src/app/api/admin/sections/route.ts
// GET ?key=home.bookSection → { texts: { campo: { pt, en } } }
// PUT { key, texts }        → grava os textos (campo vazio = volta ao JSON de traduções)
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, readJson } from '@/lib/admin/auth';
import { connectDB } from '@/lib/db';
import SectionContent from '@/models/SectionContent';
import { getSectionTextsRaw } from '@/lib/cms/content';
import { getSectionDef } from '@/lib/cms/registry';
import { revalidatePaths } from '@/lib/cms/revalidate';
import { parseLocalized, ValidationError } from '@/lib/cms/validate';
import type { LocalizedString } from '@/types/cms';

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const key = req.nextUrl.searchParams.get('key') || '';
  if (!getSectionDef(key)) {
    return NextResponse.json({ error: 'Secção inválida.' }, { status: 400 });
  }
  const texts = await getSectionTextsRaw(key);
  return NextResponse.json({ texts });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await readJson<{ key?: unknown; texts?: unknown }>(req);
  const key = typeof body?.key === 'string' ? body.key : '';
  const def = getSectionDef(key);
  if (!def) {
    return NextResponse.json({ error: 'Secção inválida.' }, { status: 400 });
  }

  try {
    const input = (
      body?.texts && typeof body.texts === 'object' ? body.texts : {}
    ) as Record<string, unknown>;

    // Só aceita os campos definidos no registo; descarta o resto.
    const texts: Record<string, LocalizedString> = {};
    for (const field of def.fields) {
      if (input[field.key] === undefined) continue;
      const ls = parseLocalized(input[field.key], field.label, { max: 3000 });
      if (ls.pt || ls.en) texts[field.key] = ls;
    }

    await connectDB();
    await SectionContent.findOneAndUpdate(
      { key },
      { key, texts },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    revalidatePaths(def.revalidate);
    return NextResponse.json({ ok: true, texts });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[admin/sections PUT]', err);
    return NextResponse.json({ error: 'Erro ao guardar.' }, { status: 500 });
  }
}

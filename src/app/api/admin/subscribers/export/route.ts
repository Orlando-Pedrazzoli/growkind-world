// src/app/api/admin/subscribers/export/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import EmailSubscriber from '@/models/EmailSubscriber';
import User from '@/models/User';

/**
 * Exporta a lista completa de subscritores em formato CSV.
 * Apenas acessível por utilizadores admin.
 *
 * Formato: email,source,status,subscribedAt
 * Compatível com Mailchimp, Brevo, Constant Contact, Excel, etc.
 */
export async function GET() {
  // 1. Autenticação
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  await connectDB();

  // 2. Verificar role admin
  const dbUser = await User.findOne({
    email: session.user.email.toLowerCase(),
  });
  if (!dbUser || dbUser.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
  }

  // 3. Obter todos os subscritores ativos
  const subscribers = await EmailSubscriber.find({ status: 'active' })
    .sort({ subscribedAt: -1 })
    .lean();

  // 4. Construir CSV (com cabeçalho)
  const lines = [
    'email,source,status,subscribedAt',
    ...subscribers.map(s => {
      const subscribedAt = new Date(s.subscribedAt).toISOString();
      // Escapar campos com vírgulas/aspas (CSV-safe)
      return `${escapeCSV(s.email)},${escapeCSV(s.source)},${escapeCSV(s.status)},${subscribedAt}`;
    }),
  ];

  const csv = '\ufeff' + lines.join('\n'); // BOM para Excel reconhecer UTF-8
  const today = new Date().toISOString().split('T')[0];

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="growkind-subscribers-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}

function escapeCSV(value: string): string {
  if (!value) return '';
  if (
    value.includes(',') ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

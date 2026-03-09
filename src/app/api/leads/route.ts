import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LeadModel from '@/models/Lead';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, perfil, origem, consentimento } = body;

    // Validação básica
    if (!nome || !email || !consentimento) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, email, consentimento' },
        { status: 400 }
      );
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Upsert: actualiza se já existe com mesmo email + origem
    const lead = await LeadModel.findOneAndUpdate(
      { email: email.toLowerCase(), origem },
      {
        nome,
        email: email.toLowerCase(),
        perfil: perfil || undefined,
        origem,
        consentimento,
      },
      { upsert: true, new: true }
    );

    // TODO: Integração Brevo
    // Quando a API key estiver disponível, enviar contacto para o Brevo:
    // await sendToBrevo({ nome, email, perfil, origem });

    return NextResponse.json(
      { success: true, id: lead._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Erro ao guardar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

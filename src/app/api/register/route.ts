import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'A password deve ter pelo menos 8 caracteres' },
        { status: 400 },
      );
    }

    await connectDB();

    // Verificar se email já existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está registado' },
        { status: 409 },
      );
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Verificar se é admin
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map(e => e.trim().toLowerCase());

    const isAdmin = adminEmails.includes(email.toLowerCase());

    // Criar utilizador
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      provider: 'credentials',
      role: isAdmin ? 'admin' : 'user',
    });

    return NextResponse.json(
      {
        message: 'Conta criada com sucesso',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro no registo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

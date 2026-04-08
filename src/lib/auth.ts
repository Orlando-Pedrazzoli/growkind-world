import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

// Emails com acesso admin (separados por vírgula no .env)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase());

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
        }).select('+password');

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await connectDB();

        const existingUser = await User.findOne({
          email: user.email?.toLowerCase(),
        });

        if (!existingUser) {
          // Criar utilizador na primeira vez que faz login com Google
          const isAdmin = ADMIN_EMAILS.includes(
            user.email?.toLowerCase() || '',
          );

          await User.create({
            name: user.name,
            email: user.email?.toLowerCase(),
            image: user.image,
            provider: 'google',
            role: isAdmin ? 'admin' : 'user',
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // Primeiro login — dados vêm do authorize ou do signIn
        token.role = (user as { role?: string }).role || 'user';
        token.id = user.id;
      } else if (token.email) {
        // Sessões seguintes — verificar role actual no DB
        // (só faz query se role não existir no token)
        if (!token.role) {
          await connectDB();
          const dbUser = await User.findOne({
            email: token.email.toLowerCase(),
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id.toString();
          }
        }
      }

      // Admin por email whitelist (override)
      if (token.email && ADMIN_EMAILS.includes(token.email.toLowerCase())) {
        token.role = 'admin';
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
  },
});

// middleware.ts  (na RAIZ do projeto, ao lado do package.json)
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// Só o next-intl. A autenticação de /admin e /a-minha-conta continua
// a ser feita server-side nos respetivos layout.tsx (como já é hoje).
export default createMiddleware(routing);

export const config = {
  // Corre em tudo MENOS: /api, ficheiros internos do Next e ficheiros com extensão.
  // Isto garante que as tuas rotas /api/* NÃO são afetadas pelo locale.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

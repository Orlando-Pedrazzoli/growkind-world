import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary — imagens do projeto
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Google — fotos de perfil de utilizadores Google OAuth
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // SAMEORIGIN permite iframes apenas do MESMO domínio.
            // Necessário porque /a-minha-conta/livro e /a-minha-conta/cursos/...
            // usam iframe para servir HTML do site (book.html, módulos).
            // Continua a proteger contra clickjacking de domínios externos.
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

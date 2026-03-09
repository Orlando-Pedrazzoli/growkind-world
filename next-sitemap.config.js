/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://growkindworld.com',
  generateRobotsTxt: true,
  exclude: [
    '/obrigado',
    '/obrigado-compra',
    '/membros',
    '/privacidade',
    '/termos',
    '/cookies',
    '/devolucoes',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/membros/', '/obrigado', '/obrigado-compra'],
      },
    ],
  },
};

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { playfairDisplay, dmSans } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://growkindworld.com',
  ),
  title: {
    default: 'GrowKind World — Educação que cresce com a criança',
    template: '%s | GrowKind World',
  },
  description:
    'Projecto educativo e editorial dedicado à infância neurodivergente. Livro, cursos e recursos para famílias e profissionais.',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'GrowKind World',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GrowKind World',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <body className='flex min-h-screen flex-col'>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className='flex-1 pt-20 md:pt-24'>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

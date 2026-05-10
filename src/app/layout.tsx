// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { playfairDisplay, dmSans } from '@/lib/fonts';
import SessionProvider from '@/components/auth/SessionProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import JsonLd from '@/components/seo/JsonLd';
import { SEO_CONFIG, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.siteName,
  authors: [{ name: SEO_CONFIG.founder.name }],
  creator: SEO_CONFIG.founder.name,
  publisher: SEO_CONFIG.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  // Verificações dos motores de busca (preenche em src/lib/seo/config.ts)
  verification: {
    ...(SEO_CONFIG.verification.google
      ? { google: SEO_CONFIG.verification.google }
      : {}),

    ...(SEO_CONFIG.verification.yandex
      ? { yandex: SEO_CONFIG.verification.yandex }
      : {}),

    ...(SEO_CONFIG.verification.bing
      ? {
          other: {
            'msvalidate.01': SEO_CONFIG.verification.bing,
          },
        }
      : {}),
  },
  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.locale,
    siteName: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    title: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    description: SEO_CONFIG.defaultDescription,
    images: [
      {
        url: SEO_CONFIG.defaultOgImage.url,
        width: SEO_CONFIG.defaultOgImage.width,
        height: SEO_CONFIG.defaultOgImage.height,
        alt: SEO_CONFIG.defaultOgImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#1a5c2a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='pt-PT'
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <body className='flex min-h-screen flex-col'>
        {/* JSON-LD global — Organization + WebSite */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

        {/* Google Analytics 4 — só carrega se tiveres preenchido o ID */}
        {SEO_CONFIG.analytics.ga4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SEO_CONFIG.analytics.ga4}`}
              strategy='afterInteractive'
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SEO_CONFIG.analytics.ga4}', {
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}

        {/* Plausible Analytics — só carrega se tiveres preenchido o domain */}
        {SEO_CONFIG.analytics.plausible && (
          <Script
            defer
            data-domain={SEO_CONFIG.analytics.plausible}
            src='https://plausible.io/js/script.js'
            strategy='afterInteractive'
          />
        )}

        <SessionProvider>
          <Header />
          <main className='flex-1 pt-20 md:pt-24'>{children}</main>
          <Footer />
          <CookieBanner />
        </SessionProvider>
      </body>
    </html>
  );
}

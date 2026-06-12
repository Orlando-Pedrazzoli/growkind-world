// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale, type Locale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { playfairDisplay, dmSans } from '@/lib/fonts';
import SessionProvider from '@/components/auth/SessionProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import JsonLd from '@/components/seo/JsonLd';
import { SEO_CONFIG, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import '../globals.css'; // ⚠️ agora é UM nível mais fundo: ../globals.css

// Pré-gera as versões PT e EN em build (SSG).
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'seo',
  });
  const isDefault = locale === routing.defaultLocale;

  return {
    metadataBase: new URL(SEO_CONFIG.baseUrl),
    title: {
      default: t('title'),
      template: `%s | ${SEO_CONFIG.siteName}`,
    },
    description: t('description'),
    applicationName: SEO_CONFIG.siteName,
    authors: [{ name: SEO_CONFIG.founder.name }],
    creator: SEO_CONFIG.founder.name,
    publisher: SEO_CONFIG.siteName,
    formatDetection: { email: false, address: false, telephone: false },
    // 👇 hreflang: cada idioma com a sua URL (PT na raiz, EN em /en)
    alternates: {
      canonical: isDefault ? '/' : `/${locale}`,
      languages: {
        pt: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/apple-icon.png',
    },
    verification: {
      ...(SEO_CONFIG.verification.google
        ? { google: SEO_CONFIG.verification.google }
        : {}),
      ...(SEO_CONFIG.verification.yandex
        ? { yandex: SEO_CONFIG.verification.yandex }
        : {}),
      ...(SEO_CONFIG.verification.bing
        ? { other: { 'msvalidate.01': SEO_CONFIG.verification.bing } }
        : {}),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_PT' : 'en_GB',
      siteName: SEO_CONFIG.siteName,
      url: isDefault ? SEO_CONFIG.baseUrl : `${SEO_CONFIG.baseUrl}/${locale}`,
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
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
}

export const viewport: Viewport = {
  themeColor: '#1a5c2a',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale); // necessário para SSG com next-intl

  return (
    <html
      lang={locale === 'pt' ? 'pt-PT' : 'en'}
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <body className='flex min-h-screen flex-col'>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

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

        {SEO_CONFIG.analytics.plausible && (
          <Script
            defer
            data-domain={SEO_CONFIG.analytics.plausible}
            src='https://plausible.io/js/script.js'
            strategy='afterInteractive'
          />
        )}

        {/* 👇 Disponibiliza as traduções aos Client Components (Header, etc.) */}
        <NextIntlClientProvider>
          <SessionProvider>
            <Header />
            <main className='flex-1 pt-20 md:pt-24'>{children}</main>
            <Footer />
            <CookieBanner />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// src/app/[locale]/rdf/diagrama/layout.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('rdf.diagramaMeta');

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/rdf/diagrama',
    ogImage: {
      url: '/images/rdf-diagrama.jpg',
      alt: t('ogAlt'),
    },
  });
}

export default function DiagramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

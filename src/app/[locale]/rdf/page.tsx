// src/app/[locale]/rdf/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import RDFHero from '@/components/rdf/RDFHero';
import RDFQuestion from '@/components/rdf/RDFQuestion';
import RDFDiagram from '@/components/rdf/RDFDiagram';
import RDFMovements from '@/components/rdf/RDFMovements';
import RDFWhatIsNot from '@/components/rdf/RDFWhatIsNot';
import RDFAxiom from '@/components/rdf/RDFAxiom';
import RDFCta from '@/components/rdf/RDFCta';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('rdf.meta');

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/rdf',
    ogImage: {
      url: '/images/rdf-principal.jpg',
      alt: t('ogAlt'),
    },
    keywords: t.raw('keywords') as string[],
  });
}

export default function RDFPage() {
  return (
    <>
      <RDFHero />
      <RDFQuestion />
      <RDFDiagram />
      <RDFMovements />
      <RDFWhatIsNot />
      <RDFAxiom />
      <RDFCta />
    </>
  );
}

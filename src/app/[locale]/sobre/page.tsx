// src/app/sobre/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata, personJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import SobreHero from '@/components/sobre/SobreHero';
import SobreOrigem from '@/components/sobre/SobreOrigem';
import SobreRDF from '@/components/sobre/SobreRDF';
import SobreParaQuem from '@/components/sobre/SobreParaQuem';
import SobreCTA from '@/components/sobre/SobreCTA';
import { getSiteImage } from '@/lib/cms/content';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre João Pereira',
  description:
    'Três décadas de trabalho com crianças autistas, famílias e educadores em Portugal, Brasil e Reino Unido. Educador, terapeuta e criador do Relational Development Framework.',
  path: '/sobre',
  ogType: 'profile',
  ogImage: {
    url: '/images/joao-profile.jpeg',
    alt: 'João Pereira — Fundador da GrowKind World',
  },
  keywords: [
    'João Pereira',
    'educador autismo',
    'terapeuta infantil',
    'GrowKind fundador',
    'Relational Development Framework criador',
  ],
});

export default async function SobrePage() {
  const photoUrl = await getSiteImage('about.photo'); // editável no admin

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <SobreHero photoUrl={photoUrl} />
      <SobreOrigem />
      <SobreRDF />
      <SobreParaQuem />
      <SobreCTA />
    </>
  );
}

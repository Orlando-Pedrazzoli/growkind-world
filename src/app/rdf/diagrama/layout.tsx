// src/app/rdf/diagrama/layout.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Diagrama RDF — O Campo Relacional',
  description:
    'Explora o diagrama interactivo do Relational Development Framework — os três movimentos e o campo relacional entre criança, adulto e ambiente.',
  path: '/rdf/diagrama',
  ogImage: {
    url: '/images/rdf-diagrama.jpg',
    alt: 'Diagrama RDF — O Campo Relacional',
  },
});

export default function DiagramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

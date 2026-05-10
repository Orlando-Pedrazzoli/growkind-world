// src/app/rdf/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import RDFHero from '@/components/rdf/RDFHero';
import RDFQuestion from '@/components/rdf/RDFQuestion';
import RDFDiagram from '@/components/rdf/RDFDiagram';
import RDFMovements from '@/components/rdf/RDFMovements';
import RDFWhatIsNot from '@/components/rdf/RDFWhatIsNot';
import RDFAxiom from '@/components/rdf/RDFAxiom';
import RDFCta from '@/components/rdf/RDFCta';

export const metadata: Metadata = buildPageMetadata({
  title: 'Relational Development Framework — RDF',
  description:
    'Uma forma de ler o que está a acontecer entre a criança e o ambiente, antes de qualquer decisão de resposta. Não é terapia. Não é protocolo. É uma lente.',
  path: '/rdf',
  ogImage: {
    url: '/images/rdf-principal.jpg',
    alt: 'Relational Development Framework — GrowKind World',
  },
  keywords: [
    'Relational Development Framework',
    'RDF',
    'framework desenvolvimento infantil',
    'autismo lente observação',
    'João Pereira RDF',
    'campo relacional criança',
  ],
});

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

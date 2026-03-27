import type { Metadata } from 'next';
import RDFHero from '@/components/rdf/RDFHero';
import RDFQuestion from '@/components/rdf/RDFQuestion';
import RDFDiagram from '@/components/rdf/RDFDiagram';
import RDFMovements from '@/components/rdf/RDFMovements';
import RDFWhatIsNot from '@/components/rdf/RDFWhatIsNot';
import RDFAxiom from '@/components/rdf/RDFAxiom';
import RDFCta from '@/components/rdf/RDFCta';

export const metadata: Metadata = {
  title: 'Relational Development Framework — RDF',
  description:
    'Uma forma de ler o que está a acontecer entre a criança e o ambiente — antes de qualquer decisão de resposta. Não é terapia. Não é protocolo. É uma lente.',
  openGraph: {
    title: 'Relational Development Framework | GrowKind World',
    description:
      'O RDF é uma lente de leitura do campo relacional. Uma linguagem comum entre adultos.',
    images: ['/images/rdf-principal.jpg'],
  },
};

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

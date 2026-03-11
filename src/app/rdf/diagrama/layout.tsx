import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagrama RDF — O Campo Relacional',
  description:
    'Explora o diagrama interactivo do Relational Development Framework — os três movimentos e o campo relacional entre criança, adulto e ambiente.',
};

export default function DiagramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

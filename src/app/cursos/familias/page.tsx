// src/app/cursos/familias/page.tsx

import type { Metadata } from 'next';
import CursoDetalhe from '@/components/cursos/CursoDetalhe';
import { cursoFamilias } from '@/lib/data/cursos';

export const metadata: Metadata = {
  title: 'GrowKind Famílias',
  description:
    'Formação para pais, mães e cuidadores de crianças neurodivergentes. Quatro módulos para acompanhar o desenvolvimento no dia-a-dia. Primeiro módulo gratuito.',
  robots: { index: false, follow: true },
};

export default function CursoFamiliasPage() {
  return <CursoDetalhe curso={cursoFamilias} />;
}

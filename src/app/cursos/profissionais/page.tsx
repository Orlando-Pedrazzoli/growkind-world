// src/app/cursos/profissionais/page.tsx

import type { Metadata } from 'next';
import CursoDetalhe from '@/components/cursos/CursoDetalhe';
import { cursoProfissionais } from '@/lib/data/cursos';

export const metadata: Metadata = {
  title: 'GrowKind TA — Para Profissionais',
  description:
    'Formação para educadores, teaching assistants e profissionais de apoio educativo. Quatro módulos sobre o Relational Development Framework. Primeiro módulo gratuito.',
  robots: { index: false, follow: true },
};

export default function CursoProfissionaisPage() {
  return <CursoDetalhe curso={cursoProfissionais} />;
}

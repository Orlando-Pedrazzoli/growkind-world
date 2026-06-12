// src/app/cursos/profissionais/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata, courseJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import CursoDetalhe from '@/components/cursos/CursoDetalhe';
import { cursoProfissionais } from '@/lib/data/cursos';

export const metadata: Metadata = buildPageMetadata({
  title: 'GrowKind TA — Formação para Profissionais',
  description:
    'Formação para educadores, teaching assistants e profissionais de apoio educativo. Quatro módulos sobre o Relational Development Framework. Primeiro módulo gratuito.',
  path: '/cursos/profissionais',
  ogImage: {
    url: '/cursos/capas/cz-m1-prof.svg',
    alt: 'GrowKind TA — Formação para Profissionais',
  },
  // Mantém noindex até M2-M4 estarem prontos.
  // Para abrir ao Google: muda para noIndex: false.
  noIndex: true,
});

export default function CursoProfissionaisPage() {
  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: 'GrowKind TA — Para Profissionais',
          description: cursoProfissionais.descricao,
          path: '/cursos/profissionais',
          coverImage: cursoProfissionais.capaPrincipal,
          price: '98.00',
          audience: cursoProfissionais.publico,
        })}
      />
      <CursoDetalhe curso={cursoProfissionais} />
    </>
  );
}

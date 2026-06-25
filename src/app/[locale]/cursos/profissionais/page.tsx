// src/app/[locale]/cursos/profissionais/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata, courseJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import CursoDetalhe from '@/components/cursos/CursoDetalhe';
import { cursoProfissionais } from '@/lib/data/cursos';
import { getPrice } from '@/lib/prices';

export const metadata: Metadata = buildPageMetadata({
  title: 'GrowKind TA — Formação para Profissionais',
  description:
    'Formação para educadores, teaching assistants e profissionais de apoio educativo. Quatro módulos sobre o Relational Development Framework. Primeiro módulo gratuito.',
  path: '/cursos/profissionais',
  ogImage: {
    url: '/cursos/capas/cz-m1-prof.svg',
    alt: 'GrowKind TA — Formação para Profissionais',
  },
  noIndex: true,
});

export default async function CursoProfissionaisPage() {
  const price = ((await getPrice('curso-prof')) / 100).toFixed(2);

  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: 'GrowKind TA — Para Profissionais',
          description: cursoProfissionais.descricao,
          path: '/cursos/profissionais',
          coverImage: cursoProfissionais.capaPrincipal,
          price,
          audience: cursoProfissionais.publico,
        })}
      />
      <CursoDetalhe curso={cursoProfissionais} />
    </>
  );
}

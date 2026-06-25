// src/app/[locale]/cursos/familias/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata, courseJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import CursoDetalhe from '@/components/cursos/CursoDetalhe';
import { cursoFamilias } from '@/lib/data/cursos';
import { getPrice } from '@/lib/prices';

export const metadata: Metadata = buildPageMetadata({
  title: 'GrowKind Famílias — Formação para Pais e Cuidadores',
  description:
    'Formação para pais, mães e cuidadores de crianças neurodivergentes. Quatro módulos para acompanhar o desenvolvimento no dia-a-dia. Primeiro módulo gratuito.',
  path: '/cursos/familias',
  ogImage: {
    url: '/cursos/capas/cz-m1-fam.svg',
    alt: 'GrowKind Famílias — Formação para Pais e Cuidadores',
  },
  noIndex: true,
});

export default async function CursoFamiliasPage() {
  // Preço real (BD) para o JSON-LD ficar igual ao cobrado. Formato schema.org: "58.00"
  const price = ((await getPrice('curso-fam')) / 100).toFixed(2);

  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: 'GrowKind Famílias',
          description: cursoFamilias.descricao,
          path: '/cursos/familias',
          coverImage: cursoFamilias.capaPrincipal,
          price,
          audience: cursoFamilias.publico,
        })}
      />
      <CursoDetalhe curso={cursoFamilias} />
    </>
  );
}

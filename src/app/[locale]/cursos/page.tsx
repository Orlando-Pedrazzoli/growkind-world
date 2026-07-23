// src/app/cursos/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import CursosHero from '@/components/cursos/CursosHero';
import CursosEmBreve from '@/components/cursos/CursosEmBreve';
import { getPricesMap } from '@/lib/prices';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cursos — Formações para acompanhar a infância neurodivergente',
  description:
    'Formações GrowKind World para famílias, teaching assistants e profissionais que acompanham crianças neurodivergentes. Quatro módulos por curso, primeiro módulo gratuito.',
  path: '/cursos',
  keywords: [
    'curso autismo',
    'formação neurodivergência',
    'curso teaching assistants',
    'formação para pais autismo',
    'curso desenvolvimento infantil',
    'GrowKind cursos',
  ],
});

export default async function CursosPage() {
  // Preços atuais da BD (sincronizados com o admin e com o checkout).
  // Passados por prop ao CursosEmBreve, que é client component.
  const precos = await getPricesMap();

  return (
    <>
      <CursosHero />
      <CursosEmBreve
        precos={{
          profissionais: precos['curso-prof'],
          familias: precos['curso-fam'],
        }}
      />
    </>
  );
}

// src/app/cursos/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import CursosHero from '@/components/cursos/CursosHero';
import CursosEmBreve from '@/components/cursos/CursosEmBreve';

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

export default function CursosPage() {
  return (
    <>
      <CursosHero />
      <CursosEmBreve />
    </>
  );
}

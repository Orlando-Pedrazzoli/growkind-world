// src/app/cursos/page.tsx

import type { Metadata } from 'next';
import CursosHero from '@/components/cursos/CursosHero';
import CursosEmBreve from '@/components/cursos/CursosEmBreve';

export const metadata: Metadata = {
  title: 'Cursos',
  description:
    'Formações GrowKind World para famílias e profissionais que acompanham a infância neurodivergente. Em preparação.',
  // SEO a implementar futuramente — por agora noindex enquanto não há cursos publicados
  robots: { index: false, follow: true },
};

export default function CursosPage() {
  return (
    <>
      <CursosHero />
      <CursosEmBreve />
    </>
  );
}

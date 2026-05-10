// src/app/termos/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { termos } from '@/lib/data/legal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Termos e Condições',
  description:
    'Termos e condições de utilização do website e serviços da GrowKind World, incluindo a venda do livro e cursos online.',
  path: '/termos',
});

export default function TermosPage() {
  return <LegalPageLayout policy={termos} />;
}

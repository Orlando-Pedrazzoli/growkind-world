// src/app/devolucoes/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { devolucoes } from '@/lib/data/legal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Devoluções',
  description:
    'Condições de devolução e reembolso para o livro digital e cursos da GrowKind World. Direito de retractação ao abrigo da legislação europeia.',
  path: '/devolucoes',
});

export default function DevolucoesPage() {
  return <LegalPageLayout policy={devolucoes} />;
}

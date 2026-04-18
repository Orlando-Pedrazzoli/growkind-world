// src/app/devolucoes/page.tsx

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { devolucoes } from '@/lib/data/legal';

export const metadata: Metadata = {
  title: 'Política de Devoluções',
  description:
    'Como funcionam reembolsos e devoluções de conteúdos digitais na GrowKind World. Regras para UE, Reino Unido, Brasil e outros países.',
  robots: { index: true, follow: true },
};

export default function DevolucoesPage() {
  return <LegalPageLayout policy={devolucoes} />;
}

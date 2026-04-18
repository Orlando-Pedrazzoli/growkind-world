// src/app/termos/page.tsx

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { termos } from '@/lib/data/legal';

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description:
    'As regras aplicáveis à utilização do site GrowKind World e à aquisição dos nossos conteúdos digitais.',
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return <LegalPageLayout policy={termos} />;
}

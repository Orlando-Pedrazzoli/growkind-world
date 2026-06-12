// src/app/privacidade/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { privacidade } from '@/lib/data/legal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Privacidade',
  description:
    'Como a GrowKind World recolhe, utiliza e protege os teus dados pessoais. Em conformidade com o RGPD, UK GDPR e LGPD.',
  path: '/privacidade',
});

export default function PrivacidadePage() {
  return <LegalPageLayout policy={privacidade} />;
}

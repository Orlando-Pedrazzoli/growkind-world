// src/app/cookies/page.tsx

import type { Metadata } from 'next';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { cookies } from '@/lib/data/legal';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Que cookies utilizamos no site GrowKind World e como os podes gerir. Usamos apenas cookies estritamente necessários.',
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return <LegalPageLayout policy={cookies} />;
}

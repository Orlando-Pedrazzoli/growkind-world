// src/app/cookies/page.tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { cookies } from '@/lib/data/legal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Cookies',
  description:
    'Como a GrowKind World utiliza cookies e tecnologias semelhantes. Em conformidade com o RGPD e a directiva ePrivacy.',
  path: '/cookies',
});

export default function CookiesPage() {
  return <LegalPageLayout policy={cookies} />;
}

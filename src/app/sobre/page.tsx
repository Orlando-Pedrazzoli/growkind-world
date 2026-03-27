import type { Metadata } from 'next';
import SobreHero from '@/components/sobre/SobreHero';
import SobreOrigem from '@/components/sobre/SobreOrigem';
import SobreRDF from '@/components/sobre/SobreRDF';
import SobreParaQuem from '@/components/sobre/SobreParaQuem';
import SobreCTA from '@/components/sobre/SobreCTA';

export const metadata: Metadata = {
  title: 'Sobre João Pereira',
  description:
    'Três décadas de trabalho com crianças autistas, famílias e educadores em Portugal, Brasil e Reino Unido. Criador do Relational Development Framework.',
  openGraph: {
    title: 'Sobre João Pereira — GrowKind World',
    description:
      'Educador, terapeuta e fundador da GrowKind World. Criador do Relational Development Framework.',
    images: [{ url: '/images/joao-profile.jpeg' }],
  },
};

export default function SobrePage() {
  return (
    <>
      <SobreHero />
      <SobreOrigem />
      <SobreRDF />
      <SobreParaQuem />
      <SobreCTA />
    </>
  );
}

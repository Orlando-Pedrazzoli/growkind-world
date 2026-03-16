import Image from 'next/image';

export default function Hero() {
  return (
    <section id='hero' className='relative -mt-20 md:-mt-24'>
      {/* Desktop */}
      <Image
        src='/images/hero-home.jpg'
        alt='GrowKind World — Um mundo criado a partir da experiência neurodivergente'
        width={1536}
        height={1024}
        priority
        className='hidden w-full md:block'
        sizes='100vw'
      />
      {/* Mobile */}
      <Image
        src='/images/hero-mobile.png'
        alt='GrowKind World — Um mundo criado a partir da experiência neurodivergente'
        width={768}
        height={1024}
        priority
        className='block w-full md:hidden'
        sizes='100vw'
      />
      {/* Gradiente subtil no topo para legibilidade da navbar */}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent' />
    </section>
  );
}

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative -mt-16 md:-mt-20">
      <Image
        src="/images/hero-home.jpg"
        alt="GrowKind World — Um mundo criado a partir da experiência neurodivergente"
        width={1536}
        height={1024}
        priority
        className="w-full"
        sizes="100vw"
        quality={90}
      />
      {/* Gradiente subtil no topo para legibilidade da navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />
    </section>
  );
}
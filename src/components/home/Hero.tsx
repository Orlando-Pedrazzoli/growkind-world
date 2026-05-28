// components/home/Hero.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  alt: string;
  desktop: string;
  mobile: string;
  href: string | null;
}

const SLIDES: Slide[] = [
  {
    id: 'home',
    alt: 'GrowKind World — Um mundo criado a partir da experiência neurodivergente',
    desktop: '/images/hero-home.jpg',
    mobile: '/images/hero-mobile.png',
    href: null,
  },
  {
    id: 'livro',
    alt: 'Onde o Mundo Nasce Entre Nós — o livro de João Pereira',
    desktop: '/images/hero-livro.jpg',
    mobile: '/images/hero-livro.jpg',
    href: '/o-livro',
  },
  {
    id: 'rdf',
    alt: 'Relational Development Framework (RDF) — uma nova forma de olhar o desenvolvimento',
    desktop: '/images/hero-rdf.jpg',
    mobile: '/images/hero-rdf.jpg',
    href: '/rdf',
  },
];

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slideCount = SLIDES.length;

  const goTo = useCallback(
    (next: number) => setIndex((next + slideCount) % slideCount),
    [slideCount],
  );
  const goNext = useCallback(
    () => setIndex(i => (i + 1) % slideCount),
    [slideCount],
  );
  const goPrev = useCallback(
    () => setIndex(i => (i - 1 + slideCount) % slideCount),
    [slideCount],
  );

  const shouldAutoplay = !isHovered;
  useEffect(() => {
    if (!shouldAutoplay) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [shouldAutoplay, goNext]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  return (
    <section
      id='hero'
      aria-roledescription='carrossel'
      aria-label='Destaques GrowKind World'
      className='relative -mt-20 overflow-hidden md:-mt-24'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      onKeyDown={onKeyDown}
    >
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {`Slide ${index + 1} de ${slideCount}: ${SLIDES[index].alt}`}
      </div>

      <div className='relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[16/9]'>
        {SLIDES.map((slide, i) => {
          const isActive = i === index;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <SlideMedia
                slide={slide}
                isActive={isActive}
                priority={i === 0}
              />
            </div>
          );
        })}

        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/45 to-transparent' />
      </div>

      <button
        type='button'
        onClick={goPrev}
        aria-label='Slide anterior'
        className='absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-5'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        type='button'
        onClick={goNext}
        aria-label='Próximo slide'
        className='absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-5'
      >
        <ChevronRight className='h-6 w-6' />
      </button>
    </section>
  );
}

function SlideMedia({
  slide,
  isActive,
  priority,
}: {
  slide: Slide;
  isActive: boolean;
  priority: boolean;
}) {
  const media = (
    <>
      <Image
        src={slide.desktop}
        alt={slide.alt}
        fill
        priority={priority}
        sizes='100vw'
        className='hidden object-cover object-center md:block'
      />
      <Image
        src={slide.mobile}
        alt={slide.alt}
        fill
        priority={priority}
        sizes='100vw'
        className='block object-cover object-center md:hidden'
      />
    </>
  );

  if (!slide.href) return media;

  return (
    <Link
      href={slide.href}
      aria-label={slide.alt}
      tabIndex={isActive ? 0 : -1}
      className='absolute inset-0 block focus:outline-none'
    >
      {media}
    </Link>
  );
}

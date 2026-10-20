// components/home/Hero.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Os slides vêm da BD (admin → Homepage → Hero) através de page.tsx.
// Shape: ver HeroSlideView em @/types/cms. Se a BD estiver vazia, page.tsx
// envia os 3 slides originais (DEFAULT_HERO_SLIDES em lib/cms/registry.ts).
//
// Medidas das imagens (proporções FIXAS do carrossel, ver abaixo):
//   desktop 1920 × 800 px (12:5) · mobile 1080 × 1440 px (3:4)
import type { HeroSlideView as Slide } from '@/types/cms';

const AUTOPLAY_MS = 5000;

export default function Hero({ slides }: { slides: Slide[] }) {
  const t = useTranslations('home.hero');
  const SLIDES = slides;

  const [index, setIndex] = useState(0);

  const slideCount = Math.max(SLIDES.length, 1);

  const goNext = useCallback(
    () => setIndex(i => (i + 1) % slideCount),
    [slideCount],
  );
  const goPrev = useCallback(
    () => setIndex(i => (i - 1 + slideCount) % slideCount),
    [slideCount],
  );

  // Autoplay contínuo: NÃO pausa com hover/foco (pedido do João).
  const shouldAutoplay = slideCount > 1;
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
      aria-roledescription={t('carouselRole')}
      aria-label={t('carouselLabel')}
      className='relative -mt-20 overflow-hidden md:-mt-24'
      style={{ backgroundColor: '#1b140c' }}
      onKeyDown={onKeyDown}
    >
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {t('slideStatus', {
          current: index + 1,
          total: slideCount,
          alt: SLIDES[index]?.alt ?? '',
        })}
      </div>

      {/*
        Proporções fixas — sem max-h, para o enquadramento ser idêntico em qualquer largura:
        - mobile: 3:4  → imagens 1080×1440 (encaixe exato, mais imersivo)
        - sm:     16/7 → meio-termo em tablets
        - md+:    12/5 (2.4:1) → imagens 1920×800 (encaixe exato, zero corte)
      */}
      <div className='relative aspect-[3/4] w-full sm:aspect-[16/7] md:aspect-[12/5]'>
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
                alt={slide.alt}
                isActive={isActive}
                priority={i === 0}
              />
            </div>
          );
        })}

        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/45 to-transparent' />
      </div>

      {slideCount > 1 && (
        <button
          type='button'
          onClick={goPrev}
          aria-label={t('prevSlide')}
          className='absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-5'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>
      )}
      {slideCount > 1 && (
        <button
          type='button'
          onClick={goNext}
          aria-label={t('nextSlide')}
          className='absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-5'
        >
          <ChevronRight className='h-6 w-6' />
        </button>
      )}
    </section>
  );
}

function SlideMedia({
  slide,
  alt,
  isActive,
  priority,
}: {
  slide: Slide;
  alt: string;
  isActive: boolean;
  priority: boolean;
}) {
  const media = (
    <>
      <Image
        src={slide.desktop}
        alt={alt}
        fill
        priority={priority}
        sizes='100vw'
        className='hidden object-cover object-center md:block'
      />
      <Image
        src={slide.mobile}
        alt={alt}
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
      aria-label={alt}
      tabIndex={isActive ? 0 : -1}
      className='absolute inset-0 block focus:outline-none'
    >
      {media}
    </Link>
  );
}

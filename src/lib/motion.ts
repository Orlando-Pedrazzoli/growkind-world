// src/lib/motion.ts
// ============================================================
// GrowKind World — Variants partilhadas de scroll-reveal
// Fade + subida, escalonado (stagger). Usar com framer-motion.
//
// Acessibilidade: prefers-reduced-motion é tratado globalmente
// via <MotionConfig reducedMotion="user"> no layout — com isso,
// o transform "y" é automaticamente ignorado para quem tem
// movimento reduzido (fica só o fade).
// ============================================================

import type { Variants } from 'framer-motion';

// Curva de easing partilhada (a mesma já usada nos componentes do livro)
export const REVEAL_EASE: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

// ── Container ─────────────────────────────────────────────
// Orquestra o aparecimento em sequência dos filhos.
// Pode ser aninhado: um container dentro de outro reescalona
// os seus próprios filhos quando recebe 'visible'.
export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ── Item ──────────────────────────────────────────────────
// Fade + subida de 20px. Filho de um elemento com revealContainer.
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: REVEAL_EASE },
  },
};

// ── Fade leve (sem subida) ────────────────────────────────
// Para imagens — só opacidade, mais suave.
export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
};

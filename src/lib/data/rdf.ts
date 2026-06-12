// ============================================
// GrowKind World — Dados da página /rdf
// Textos aprovados pelo João Pereira
//
// i18n: os TEXTOS vivem em messages/pt.json e en.json
// (namespace rdf.data). Este ficheiro guarda a ESTRUTURA
// (ícones, cores, números, chaves) e expõe o hook
// useRdfData() que junta as duas partes.
// ============================================

import { useTranslations } from 'next-intl';

export interface RDFElement {
  key: string;
  icon: string;
  title: string;
  subtitle: string;
  role: string;
  desc: string;
  reads: string[];
  quote: string;
}

export interface RDFMovement {
  number: number;
  color: string;
  title: string;
  role: string;
  when: string;
  desc: string;
  items: string[];
  quote: string;
}

export interface RDFPillar {
  label: string;
  title: string;
  refs: string;
  desc: string;
}

export interface RDFApproach {
  name: string;
  level: string;
  relation: string;
}

export interface RDFGlossaryEntry {
  term: string;
  alt: string;
  def: string;
}

const ELEMENT_CONFIG = [
  { key: 'child', icon: '🧒' },
  { key: 'environment', icon: '🏠' },
  { key: 'adult', icon: '🧑' },
] as const;

const MOVEMENT_CONFIG = [
  { number: 1, color: '#4a7c59', key: 'm1' },
  { number: 2, color: '#3a5f8a', key: 'm2' },
  { number: 3, color: '#8b6914', key: 'm3' },
  { number: 4, color: '#a07828', key: 'm4' },
] as const;

export function useRdfData() {
  const t = useTranslations('rdf.data');

  const question = t('question');
  const axiom = t('axiom');

  const elements: RDFElement[] = ELEMENT_CONFIG.map(({ key, icon }) => ({
    key,
    icon,
    title: t(`elements.${key}.title`),
    subtitle: t(`elements.${key}.subtitle`),
    role: t(`elements.${key}.role`),
    desc: t(`elements.${key}.desc`),
    reads: t.raw(`elements.${key}.reads`) as string[],
    quote: t(`elements.${key}.quote`),
  }));

  const movements: RDFMovement[] = MOVEMENT_CONFIG.map(
    ({ number, color, key }) => ({
      number,
      color,
      title: t(`movements.${key}.title`),
      role: t(`movements.${key}.role`),
      when: t(`movements.${key}.when`),
      desc: t(`movements.${key}.desc`),
      items: t.raw(`movements.${key}.items`) as string[],
      quote: t(`movements.${key}.quote`),
    }),
  );

  const definition = {
    isNot: t.raw('definition.isNot') as string[],
    is: t.raw('definition.is') as string[],
  };

  const pillars = t.raw('pillars') as RDFPillar[];
  const approaches = t.raw('approaches') as RDFApproach[];
  const glossary = t.raw('glossary') as RDFGlossaryEntry[];

  return {
    question,
    axiom,
    elements,
    movements,
    definition,
    pillars,
    approaches,
    glossary,
  };
}

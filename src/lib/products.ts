// src/lib/products.ts
// Fonte única de verdade para nome/links/preço-display dos produtos.
// Usado pelo admin (pedidos/dashboard) e pelos emails do Resend.

import type { ProductType } from '@/models/Purchase';

export const PRODUCT_INFO: Record<
  ProductType,
  { label: string; accessPath: string }
> = {
  ebook: {
    label: 'Onde o Mundo Nasce Entre Nós — eBook',
    accessPath: '/a-minha-conta/livro',
  },
  'curso-prof': {
    label: 'Curso para Profissionais',
    accessPath: '/a-minha-conta/cursos',
  },
  'curso-fam': {
    label: 'Curso para Famílias',
    accessPath: '/a-minha-conta/cursos',
  },
};

export function productLabel(product: ProductType): string {
  return PRODUCT_INFO[product]?.label ?? product;
}

// Formata cêntimos -> "14,00 €"
export function formatMoney(cents: number, currency = 'eur'): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100);
}

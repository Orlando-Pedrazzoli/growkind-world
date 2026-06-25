// src/lib/prices.ts
// Preços geridos na BD, com fallback para os valores de código.
import { connectDB } from '@/lib/db';
import ProductPrice from '@/models/ProductPrice';
import type { ProductType } from '@/models/Purchase';

// Defaults — espelham os valores que estavam fixos no código.
// (ebook: checkout/route.ts · cursos: cursos.ts)
export const DEFAULT_PRICES: Record<ProductType, number> = {
  ebook: 1400, // €14,00
  'curso-prof': 9800, // €98,00
  'curso-fam': 5800, // €58,00
};

export const ALL_PRODUCTS: ProductType[] = ['ebook', 'curso-prof', 'curso-fam'];

// Mapa completo dos preços atuais (BD sobre defaults).
export async function getPricesMap(): Promise<Record<ProductType, number>> {
  await connectDB();
  const docs = await ProductPrice.find().select('product amount').lean();

  const map: Record<ProductType, number> = { ...DEFAULT_PRICES };
  for (const d of docs) {
    if ((d.product as ProductType) in map) {
      map[d.product as ProductType] = d.amount;
    }
  }
  return map;
}

// Preço de um produto (cêntimos).
export async function getPrice(product: ProductType): Promise<number> {
  const map = await getPricesMap();
  return map[product] ?? DEFAULT_PRICES[product];
}

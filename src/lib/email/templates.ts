// src/lib/email/templates.ts
import type { ProductType } from '@/models/Purchase';
import { PRODUCT_INFO, productLabel, formatMoney } from '@/lib/products';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.growkindworld.com';
const GREEN = '#1a5c2a';
const OCRE = '#c4a44a';
const INK = '#1e1e1e';
const MUTED = '#6b6b6b';

function shell(inner: string): string {
  return `
  <div style="background:#f5f0e8;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(26,92,42,0.10);">
      <div style="padding:24px 32px;border-bottom:1px solid rgba(26,92,42,0.08);">
        <span style="font-size:18px;font-weight:700;color:${GREEN};">GrowKind <span style="font-weight:400;color:${OCRE};">World</span></span>
      </div>
      <div style="padding:32px;">${inner}</div>
      <div style="padding:20px 32px;border-top:1px solid rgba(26,92,42,0.08);">
        <p style="margin:0;font-size:12px;color:${MUTED};">growkindworld.com</p>
      </div>
    </div>
  </div>`;
}

function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${GREEN};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">${label}</a>`;
}

// ── Email ao CLIENTE: confirmação de compra ──────────────
export function customerPurchaseEmail(p: {
  name?: string | null;
  product: ProductType;
  amount: number;
  currency: string;
}) {
  const info = PRODUCT_INFO[p.product];
  const accessUrl = `${SITE}${info.accessPath}`;
  const greeting = p.name ? `Olá ${p.name},` : 'Olá,';

  const subject = `Confirmação de compra · ${info.label}`;
  const html = shell(`
    <p style="margin:0 0 16px;font-size:16px;">${greeting}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${INK};">
      A tua compra foi confirmada com sucesso. Já tens acesso vitalício ao conteúdo na tua conta.
    </p>
    <div style="background:#f5f0e8;border-radius:12px;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0 0 4px;font-size:13px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;">Produto</p>
      <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:${INK};">${info.label}</p>
      <p style="margin:0 0 4px;font-size:13px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;">Valor</p>
      <p style="margin:0;font-size:15px;font-weight:600;color:${INK};">${formatMoney(p.amount, p.currency)}</p>
    </div>
    <p style="margin:0 0 24px;">${btn(accessUrl, 'Aceder ao conteúdo')}</p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:${MUTED};">
      Se o botão não funcionar, copia este link: <br/>
      <a href="${accessUrl}" style="color:${GREEN};">${accessUrl}</a>
    </p>
  `);

  return { subject, html };
}

// ── Email ao ADMIN (João): nova venda ────────────────────
export function adminSaleEmail(p: {
  customerName?: string | null;
  customerEmail: string;
  product: ProductType;
  amount: number;
  currency: string;
}) {
  const subject = `💰 Nova venda · ${formatMoney(p.amount, p.currency)} · ${productLabel(p.product)}`;
  const html = shell(`
    <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:${GREEN};">Nova venda concluída</p>
    <div style="background:#f5f0e8;border-radius:12px;padding:16px 20px;margin:0 0 20px;">
      <p style="margin:0 0 10px;font-size:14px;"><strong style="color:${MUTED};">Cliente:</strong> ${p.customerName || '—'}</p>
      <p style="margin:0 0 10px;font-size:14px;"><strong style="color:${MUTED};">Email:</strong> <a href="mailto:${p.customerEmail}" style="color:${GREEN};">${p.customerEmail}</a></p>
      <p style="margin:0 0 10px;font-size:14px;"><strong style="color:${MUTED};">Produto:</strong> ${productLabel(p.product)}</p>
      <p style="margin:0;font-size:14px;"><strong style="color:${MUTED};">Valor:</strong> ${formatMoney(p.amount, p.currency)}</p>
    </div>
    <p style="margin:0;">${btn(`${SITE}/admin/pedidos`, 'Ver todos os pedidos')}</p>
  `);

  return { subject, html };
}

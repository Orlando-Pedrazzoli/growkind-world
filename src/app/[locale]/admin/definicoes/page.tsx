// src/app/[locale]/admin/definicoes/page.tsx
import {
  Database,
  Mail,
  CreditCard,
  Shield,
  Webhook,
  AlertTriangle,
} from 'lucide-react';

// Helper: a env var existe e não está vazia?
const has = (v?: string) => !!v && v.trim().length > 0;

export default function AdminSettingsPage() {
  // ── Estado real, derivado das env vars (não hardcoded) ──
  const stripeKey = process.env.STRIPE_SECRET_KEY || '';
  const stripeMode = stripeKey.startsWith('sk_live_')
    ? 'Live'
    : stripeKey.startsWith('sk_test_')
      ? 'Teste'
      : null;

  // Remetente de email (extrai o endereço de "Nome <email>")
  const resendFrom = process.env.RESEND_FROM || '';
  const fromMatch = resendFrom.match(/<([^>]+)>/);
  const fromAddress = fromMatch?.[1] || resendFrom || '—';
  const emailDomain = fromAddress.includes('@')
    ? fromAddress.split('@')[1]
    : '—';

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  const integrations = [
    {
      name: 'MongoDB Atlas',
      ok: has(process.env.MONGODB_URI),
      description: 'Base de dados principal',
      icon: Database,
    },
    {
      name: 'Google OAuth',
      ok:
        has(process.env.GOOGLE_CLIENT_ID) &&
        has(process.env.GOOGLE_CLIENT_SECRET),
      description: 'Login com Google',
      icon: Shield,
    },
    {
      name: 'Stripe',
      ok: has(process.env.STRIPE_SECRET_KEY),
      description: stripeMode
        ? `Pagamentos · modo ${stripeMode}`
        : 'Pagamentos',
      icon: CreditCard,
    },
    {
      name: 'Stripe Webhook',
      ok: has(process.env.STRIPE_WEBHOOK_SECRET),
      description: 'Confirmação automática de compras',
      icon: Webhook,
    },
    {
      name: 'Resend',
      ok: has(process.env.RESEND_API_KEY),
      description: `Emails transacionais · ${emailDomain}`,
      icon: Mail,
    },
  ];

  const siteInfo = [
    {
      label: 'Nome',
      value: process.env.NEXT_PUBLIC_SITE_NAME || 'GrowKind World',
    },
    {
      label: 'URL',
      value:
        process.env.NEXT_PUBLIC_SITE_URL || 'https://www.growkindworld.com',
    },
    { label: 'Remetente de email', value: fromAddress },
    {
      label: 'Notificações de venda',
      value: process.env.ADMIN_NOTIFY_EMAIL || '—',
    },
    {
      label: 'Administradores',
      value: `${adminEmails.length}`,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Configuração</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Definições</h1>
      </div>

      {/* Aviso: Stripe em modo de teste */}
      {stripeMode === 'Teste' && (
        <div className='mb-6 flex items-start gap-3 border border-[var(--color-gk-ocre)]/30 bg-[var(--color-gk-ocre)]/[0.06] px-4 py-3'>
          <AlertTriangle
            size={18}
            strokeWidth={1.8}
            className='mt-0.5 flex-shrink-0 text-[var(--color-gk-ocre)]'
          />
          <p className='text-[13px] leading-relaxed text-[var(--color-gk-black)]/75'>
            O Stripe está em <strong>modo Teste</strong> — as compras não cobram
            dinheiro real. Para vendas reais, muda a{' '}
            <code>STRIPE_SECRET_KEY</code> para a chave <strong>Live</strong> na
            Vercel.
          </p>
        </div>
      )}

      {/* Informações do site */}
      <div className='mb-6 border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <h2 className='text-[clamp(1rem,1.8vw,1.25rem)]'>
          Informações do site
        </h2>
        <div className='mt-5 space-y-4'>
          {siteInfo.map(item => (
            <div
              key={item.label}
              className='flex items-start justify-between gap-6 border-b border-[var(--color-gk-green-dark)]/5 pb-4 last:border-0 last:pb-0'
            >
              <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                {item.label}
              </p>
              <p className='break-all text-right text-[14px] text-[var(--color-gk-black)]'>
                {item.value}
              </p>
            </div>
          ))}

          {/* Lista de admins (se houver) */}
          {adminEmails.length > 0 && (
            <div className='border-t border-[var(--color-gk-green-dark)]/5 pt-4'>
              <p className='mb-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                Emails admin
              </p>
              <div className='flex flex-wrap gap-2'>
                {adminEmails.map(email => (
                  <span
                    key={email}
                    className='inline-block bg-[var(--color-gk-creme)] px-2.5 py-1 text-[12px] text-[var(--color-gk-green-dark)]'
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Integrações — status real */}
      <div className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <h2 className='text-[clamp(1rem,1.8vw,1.25rem)]'>Integrações</h2>
        <p className='mt-1 text-[12px] text-[var(--color-gk-cinza)]'>
          Estado verificado automaticamente a partir das variáveis de ambiente.
        </p>
        <div className='mt-5 space-y-3'>
          {integrations.map(integration => (
            <div
              key={integration.name}
              className='flex items-center gap-4 border-b border-[var(--color-gk-green-dark)]/5 pb-4 last:border-0 last:pb-0'
            >
              <div
                className='flex h-10 w-10 flex-shrink-0 items-center justify-center'
                style={{
                  backgroundColor: integration.ok
                    ? 'rgba(26,92,42,0.08)'
                    : 'rgba(107,107,107,0.08)',
                }}
              >
                <integration.icon
                  size={20}
                  strokeWidth={1.5}
                  style={{
                    color: integration.ok
                      ? 'var(--color-gk-green-dark)'
                      : 'var(--color-gk-cinza)',
                  }}
                />
              </div>
              <div className='flex-1'>
                <p className='text-[14px] font-medium text-[var(--color-gk-black)]'>
                  {integration.name}
                </p>
                <p className='text-[12px] text-[var(--color-gk-cinza)]'>
                  {integration.description}
                </p>
              </div>
              <span
                className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${
                  integration.ok
                    ? 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                    : 'bg-[var(--color-gk-cinza)]/10 text-[var(--color-gk-cinza)]'
                }`}
              >
                {integration.ok ? 'Activo' : 'Pendente'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

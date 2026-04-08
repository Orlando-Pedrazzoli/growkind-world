import { Settings, Database, Mail, CreditCard, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const integrations = [
    {
      name: 'MongoDB Atlas',
      status: 'connected',
      description: 'Base de dados principal',
      icon: Database,
    },
    {
      name: 'Google OAuth',
      status: 'connected',
      description: 'Autenticação com Google',
      icon: Shield,
    },
    {
      name: 'Stripe',
      status: 'pending',
      description: 'Pagamentos — por configurar',
      icon: CreditCard,
    },
    {
      name: 'Resend',
      status: 'pending',
      description: 'Emails transaccionais — por configurar',
      icon: Mail,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Configuração</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Definições</h1>
      </div>

      {/* Site info */}
      <div className='mb-6 border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <h2 className='text-[clamp(1rem,1.8vw,1.25rem)]'>
          Informações do site
        </h2>
        <div className='mt-5 space-y-4'>
          {[
            {
              label: 'Nome',
              value: process.env.NEXT_PUBLIC_SITE_NAME || 'GrowKind World',
            },
            {
              label: 'URL',
              value:
                process.env.NEXT_PUBLIC_SITE_URL || 'https://growkindworld.com',
            },
            { label: 'Admin emails', value: process.env.ADMIN_EMAILS || '—' },
          ].map(item => (
            <div
              key={item.label}
              className='flex items-center justify-between border-b border-[var(--color-gk-green-dark)]/5 pb-4 last:border-0 last:pb-0'
            >
              <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                {item.label}
              </p>
              <p className='text-[14px] text-[var(--color-gk-black)]'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrações */}
      <div className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <h2 className='text-[clamp(1rem,1.8vw,1.25rem)]'>Integrações</h2>
        <div className='mt-5 space-y-3'>
          {integrations.map(integration => (
            <div
              key={integration.name}
              className='flex items-center gap-4 border-b border-[var(--color-gk-green-dark)]/5 pb-4 last:border-0 last:pb-0'
            >
              <div
                className='flex h-10 w-10 flex-shrink-0 items-center justify-center'
                style={{
                  backgroundColor:
                    integration.status === 'connected'
                      ? 'rgba(26,92,42,0.08)'
                      : 'rgba(107,107,107,0.08)',
                }}
              >
                <integration.icon
                  size={20}
                  strokeWidth={1.5}
                  style={{
                    color:
                      integration.status === 'connected'
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
                  integration.status === 'connected'
                    ? 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                    : 'bg-[var(--color-gk-cinza)]/10 text-[var(--color-gk-cinza)]'
                }`}
              >
                {integration.status === 'connected' ? 'Activo' : 'Pendente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap técnico */}
      <div className='mt-6 border border-[var(--color-gk-green-dark)]/8 bg-white p-6'>
        <h2 className='text-[clamp(1rem,1.8vw,1.25rem)]'>Roadmap técnico</h2>
        <div className='mt-5 space-y-3'>
          {[
            { phase: '1', task: 'Auth + Admin panel', status: 'done' },
            { phase: '2', task: 'Curso Zero (SPA imersiva)', status: 'next' },
            {
              phase: '3',
              task: 'Livro web (capítulos HTML)',
              status: 'planned',
            },
            { phase: '4', task: 'Cursos pagos (modular)', status: 'planned' },
            { phase: '5', task: 'Stripe + pagamentos', status: 'planned' },
            { phase: '6', task: 'Certificados + Resend', status: 'planned' },
          ].map(item => (
            <div key={item.phase} className='flex items-center gap-4'>
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center text-[12px] font-semibold ${
                  item.status === 'done'
                    ? 'bg-[var(--color-gk-green-dark)] text-white'
                    : item.status === 'next'
                      ? 'bg-[var(--color-gk-ocre)] text-white'
                      : 'bg-[var(--color-gk-cinza)]/10 text-[var(--color-gk-cinza)]'
                }`}
              >
                {item.phase}
              </span>
              <p
                className={`text-[14px] ${
                  item.status === 'done'
                    ? 'font-medium text-[var(--color-gk-green-dark)] line-through'
                    : item.status === 'next'
                      ? 'font-medium text-[var(--color-gk-ocre)]'
                      : 'text-[var(--color-gk-cinza)]'
                }`}
              >
                {item.task}
              </p>
              {item.status === 'done' && (
                <span className='text-[11px] font-medium uppercase tracking-wider text-[var(--color-gk-green-dark)]'>
                  ✓ Concluído
                </span>
              )}
              {item.status === 'next' && (
                <span className='text-[11px] font-medium uppercase tracking-wider text-[var(--color-gk-ocre)]'>
                  Em progresso
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

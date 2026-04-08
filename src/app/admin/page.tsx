import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';

async function getStats() {
  await connectDB();

  const totalUsers = await User.countDocuments();
  const recentUsers = await User.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  });

  return {
    totalUsers,
    recentUsers,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: 'Utilizadores',
      value: stats.totalUsers,
      sub: `+${stats.recentUsers} esta semana`,
      icon: Users,
      color: 'var(--color-gk-green-dark)',
    },
    {
      label: 'Capítulos Livro',
      value: '—',
      sub: 'Por configurar',
      icon: BookOpen,
      color: 'var(--color-rdf-m2)',
    },
    {
      label: 'Cursos',
      value: '—',
      sub: 'Por configurar',
      icon: GraduationCap,
      color: 'var(--color-rdf-m3)',
    },
    {
      label: 'Certificados',
      value: '—',
      sub: 'Por configurar',
      icon: Award,
      color: 'var(--color-gk-ocre)',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Visão geral</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Dashboard</h1>
      </div>

      {/* Stats grid */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {cards.map(card => (
          <div
            key={card.label}
            className='border border-[var(--color-gk-green-dark)]/8 bg-white p-6'
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
                  {card.label}
                </p>
                <p
                  className='mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold'
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <p className='mt-1 text-[12px] text-[var(--color-gk-cinza)]'>
                  {card.sub}
                </p>
              </div>
              <card.icon
                size={24}
                strokeWidth={1.5}
                style={{ color: card.color, opacity: 0.4 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className='mt-10'>
        <h2 className='text-[clamp(1.125rem,2vw,1.375rem)]'>
          Últimos registos
        </h2>
        <RecentUsersTable />
      </div>
    </div>
  );
}

async function RecentUsersTable() {
  await connectDB();

  const users = await User.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email provider role createdAt')
    .lean();

  if (users.length === 0) {
    return (
      <p className='mt-4 text-[14px] text-[var(--color-gk-cinza)]'>
        Nenhum utilizador registado ainda.
      </p>
    );
  }

  return (
    <div className='mt-4 overflow-x-auto'>
      <table className='w-full text-left'>
        <thead>
          <tr className='border-b border-[var(--color-gk-green-dark)]/10'>
            {['Nome', 'Email', 'Provider', 'Role', 'Data'].map(h => (
              <th
                key={h}
                className='pb-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user._id.toString()}
              className='border-b border-[var(--color-gk-green-dark)]/5'
            >
              <td className='py-3 text-[14px] text-[var(--color-gk-black)]'>
                {user.name}
              </td>
              <td className='py-3 text-[14px] text-[var(--color-gk-cinza)]'>
                {user.email}
              </td>
              <td className='py-3'>
                <span
                  className={`inline-block px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${
                    user.provider === 'google'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-[var(--color-gk-creme)] text-[var(--color-gk-green-dark)]'
                  }`}
                >
                  {user.provider}
                </span>
              </td>
              <td className='py-3'>
                <span
                  className={`inline-block px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${
                    user.role === 'admin'
                      ? 'bg-[var(--color-gk-ocre)]/10 text-[var(--color-gk-ocre)]'
                      : 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className='py-3 text-[13px] text-[var(--color-gk-cinza)]'>
                {new Date(user.createdAt).toLocaleDateString('pt-PT')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

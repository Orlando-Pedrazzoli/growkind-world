import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { Users } from 'lucide-react';

export default async function AdminUsersPage() {
  await connectDB();

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select('name email provider role createdAt')
    .lean();

  const totalUsers = users.length;
  const totalGoogle = users.filter(u => u.provider === 'google').length;
  const totalCredentials = users.filter(
    u => u.provider === 'credentials',
  ).length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <span className='eyebrow'>Gestão</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>Utilizadores</h1>
      </div>

      {/* Stats resumo */}
      <div className='mb-8 grid gap-4 sm:grid-cols-4'>
        {[
          { label: 'Total', value: totalUsers },
          { label: 'Google', value: totalGoogle },
          { label: 'Email/Password', value: totalCredentials },
          { label: 'Admins', value: totalAdmins },
        ].map(stat => (
          <div
            key={stat.label}
            className='border border-[var(--color-gk-green-dark)]/8 bg-white px-5 py-4'
          >
            <p className='text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'>
              {stat.label}
            </p>
            <p className='mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-gk-green-dark)]'>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabela */}
      {users.length === 0 ? (
        <div className='flex flex-col items-center border border-[var(--color-gk-green-dark)]/8 bg-white px-6 py-16 text-center'>
          <Users
            size={32}
            strokeWidth={1.5}
            className='text-[var(--color-gk-cinza)] opacity-40'
          />
          <p className='mt-4 text-[15px] text-[var(--color-gk-cinza)]'>
            Nenhum utilizador registado ainda.
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto border border-[var(--color-gk-green-dark)]/8 bg-white'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-[var(--color-gk-green-dark)]/10'>
                {['Nome', 'Email', 'Provider', 'Role', 'Registo'].map(h => (
                  <th
                    key={h}
                    className='px-5 py-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-gk-cinza)]'
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
                  className='border-b border-[var(--color-gk-green-dark)]/5 transition-colors hover:bg-[var(--color-gk-creme)]/30'
                >
                  <td className='px-5 py-4 text-[14px] font-medium text-[var(--color-gk-black)]'>
                    {user.name}
                  </td>
                  <td className='px-5 py-4 text-[14px] text-[var(--color-gk-cinza)]'>
                    {user.email}
                  </td>
                  <td className='px-5 py-4'>
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${
                        user.provider === 'google'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-[var(--color-gk-creme)] text-[var(--color-gk-green-dark)]'
                      }`}
                    >
                      {user.provider}
                    </span>
                  </td>
                  <td className='px-5 py-4'>
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${
                        user.role === 'admin'
                          ? 'bg-[var(--color-gk-ocre)]/10 text-[var(--color-gk-ocre)]'
                          : 'bg-[var(--color-gk-green-light)]/40 text-[var(--color-gk-green-dark)]'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className='px-5 py-4 text-[13px] text-[var(--color-gk-cinza)]'>
                    {new Date(user.createdAt).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

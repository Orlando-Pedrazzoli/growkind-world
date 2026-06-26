// src/app/[locale]/admin/layout.tsx
import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const userName = session.user.name || 'Admin';

  return (
    <div className='flex min-h-[calc(100vh-80px)]'>
      {/* Sidebar — desktop */}
      <AdminSidebar userName={userName} />

      {/* Conteúdo */}
      <div className='flex min-w-0 flex-1 flex-col'>
        {/* Barra de navegação — mobile */}
        <AdminMobileNav userName={userName} />

        <main className='flex-1 bg-[var(--color-gk-creme)]/40 p-4 sm:p-6 md:p-10'>
          {children}
        </main>
      </div>
    </div>
  );
}

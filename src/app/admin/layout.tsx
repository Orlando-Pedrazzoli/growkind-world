import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

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

  return (
    <div className='flex min-h-[calc(100vh-80px)]'>
      <AdminSidebar userName={session.user.name || 'Admin'} />
      <main className='flex-1 bg-[var(--color-gk-creme)]/40 p-6 md:p-10'>
        {children}
      </main>
    </div>
  );
}

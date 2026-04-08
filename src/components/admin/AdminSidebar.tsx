'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Utilizadores', href: '/admin/utilizadores', icon: Users },
  { label: 'Livro', href: '/admin/livro', icon: BookOpen },
  { label: 'Cursos', href: '/admin/cursos', icon: GraduationCap },
  { label: 'Definições', href: '/admin/definicoes', icon: Settings },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className='hidden w-[240px] flex-shrink-0 border-r border-[var(--color-gk-green-dark)]/8 bg-white md:block'>
      {/* Admin badge */}
      <div className='border-b border-[var(--color-gk-green-dark)]/8 px-6 py-5'>
        <span className='eyebrow'>Admin</span>
        <p className='mt-1 text-[14px] text-[var(--color-gk-cinza)]'>
          {userName}
        </p>
      </div>

      {/* Nav */}
      <nav className='flex flex-col gap-1 p-3'>
        {navItems.map(item => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--color-gk-green-dark)] text-white'
                  : 'text-[var(--color-gk-black)]/60 hover:bg-[var(--color-gk-creme)] hover:text-[var(--color-gk-green-dark)]'
              }`}
            >
              <item.icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Voltar ao site */}
      <div className='mt-auto border-t border-[var(--color-gk-green-dark)]/8 p-3'>
        <Link
          href='/'
          className='flex items-center gap-3 px-4 py-3 text-[13px] text-[var(--color-gk-cinza)] transition-colors hover:text-[var(--color-gk-green-dark)]'
        >
          ← Voltar ao site
        </Link>
      </div>
    </aside>
  );
}

'use client';

import {
  LayoutDashboard,
  Receipt,
  Tag,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
} from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Pedidos', href: '/admin/pedidos', icon: Receipt },
  { label: 'Preços', href: '/admin/precos', icon: Tag },
  { label: 'Utilizadores', href: '/admin/utilizadores', icon: Users },
  { label: 'Livro', href: '/admin/livro', icon: BookOpen },
  { label: 'Cursos', href: '/admin/cursos', icon: GraduationCap },
  { label: 'Definições', href: '/admin/definicoes', icon: Settings },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className='hidden w-[240px] flex-shrink-0 flex-col border-r border-black/[0.06] bg-white md:flex'>
      {/* Admin badge */}
      <div className='border-b border-black/[0.06] px-6 py-5'>
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
            (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-150 ${
                isActive
                  ? 'bg-[#1a5c2a]/[0.10] text-[#1a5c2a]'
                  : 'text-[#1e1e1e]/60 hover:bg-black/[0.04] hover:text-[#1a5c2a]'
              }`}
              style={
                isActive ? { boxShadow: 'inset 3px 0 0 #1a5c2a' } : undefined
              }
            >
              <item.icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Voltar ao site */}
      <div className='mt-auto border-t border-black/[0.06] p-3'>
        <Link
          href='/'
          className='flex items-center gap-3 px-4 py-3 text-[13px] text-[var(--color-gk-cinza)] transition-colors hover:text-[#1a5c2a]'
        >
          ← Voltar ao site
        </Link>
      </div>
    </aside>
  );
}

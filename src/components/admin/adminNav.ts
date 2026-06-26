// src/components/admin/adminNav.ts
import {
  LayoutDashboard,
  Receipt,
  Tag,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Fonte única — usada pela sidebar (desktop) e pelo menu mobile.
export const adminNavItems: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Pedidos', href: '/admin/pedidos', icon: Receipt },
  { label: 'Preços', href: '/admin/precos', icon: Tag },
  { label: 'Utilizadores', href: '/admin/utilizadores', icon: Users },
  { label: 'Livro', href: '/admin/livro', icon: BookOpen },
  { label: 'Cursos', href: '/admin/cursos', icon: GraduationCap },
  { label: 'Definições', href: '/admin/definicoes', icon: Settings },
];

// Helper partilhado: o link está ativo?
export function isAdminLinkActive(pathname: string, href: string): boolean {
  return (
    pathname === href || (href !== '/admin' && pathname.startsWith(`${href}/`))
  );
}

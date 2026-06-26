'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { adminNavItems, isAdminLinkActive } from './adminNav';

export default function AdminMobileNav({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fecha o drawer ao mudar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloqueia o scroll do body quando o drawer está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  return (
    <>
      {/* Barra superior — só mobile */}
      <div className='sticky top-0 z-40 flex items-center justify-between border-b border-black/[0.06] bg-white px-4 py-3 md:hidden'>
        <div>
          <span className='eyebrow'>Admin</span>
          <p className='text-[13px] text-[var(--color-gk-cinza)]'>{userName}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label='Abrir menu de administração'
          aria-expanded={open}
          className='flex h-10 w-10 items-center justify-center rounded-lg text-[#1a5c2a] transition-colors hover:bg-black/[0.04]'
        >
          <Menu size={22} strokeWidth={1.8} />
        </button>
      </div>

      {/* Overlay + Drawer */}
      {open && (
        <div className='fixed inset-0 z-50 md:hidden'>
          {/* Overlay escuro */}
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => setOpen(false)}
            aria-hidden='true'
          />

          {/* Drawer */}
          <div className='absolute right-0 top-0 flex h-full w-[280px] max-w-[85vw] flex-col bg-white shadow-xl'>
            {/* Cabeçalho do drawer */}
            <div className='flex items-center justify-between border-b border-black/[0.06] px-5 py-4'>
              <div>
                <span className='eyebrow'>Admin</span>
                <p className='text-[13px] text-[var(--color-gk-cinza)]'>
                  {userName}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label='Fechar menu'
                className='flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-gk-cinza)] transition-colors hover:bg-black/[0.04]'
              >
                <X size={22} strokeWidth={1.8} />
              </button>
            </div>

            {/* Links */}
            <nav className='flex flex-1 flex-col gap-1 overflow-y-auto p-3'>
              {adminNavItems.map(item => {
                const isActive = isAdminLinkActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium tracking-wide transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#1a5c2a]/[0.10] text-[#1a5c2a]'
                        : 'text-[#1e1e1e]/70 hover:bg-black/[0.04] hover:text-[#1a5c2a]'
                    }`}
                    style={
                      isActive
                        ? { boxShadow: 'inset 3px 0 0 #1a5c2a' }
                        : undefined
                    }
                  >
                    <item.icon size={19} strokeWidth={1.8} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Ver site */}
            <div className='border-t border-black/[0.06] p-3'>
              <Link
                href='/'
                className='flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] text-[var(--color-gk-cinza)] transition-colors hover:bg-black/[0.04] hover:text-[#1a5c2a]'
              >
                <ExternalLink size={18} strokeWidth={1.8} />
                Ver site
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

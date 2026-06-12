import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Usa SEMPRE estes em vez de 'next/link' e 'next/navigation'.
// O Link/useRouter daqui aplicam automaticamente o prefixo de locale (/en).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

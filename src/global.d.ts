import { routing } from '@/i18n/routing';
import messages from '../messages/pt.json';

// Dá autocomplete e type-safety às chaves de tradução em todo o projeto.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

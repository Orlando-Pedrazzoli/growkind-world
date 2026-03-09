import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Fase 1: apenas português
  // Fase 2: detectar locale via header/cookie/path
  const locale = 'pt';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

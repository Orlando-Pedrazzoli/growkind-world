// src/lib/safeRedirect.ts

/**
 * Valida se um caminho recebido como parâmetro `?next=` é seguro para redirect.
 *
 * Aceita APENAS caminhos relativos internos do site:
 *   - Tem de começar com "/"
 *   - Não pode começar com "//" (URL externa: //example.com)
 *   - Não pode começar com "/\" (truque para escapar a validação)
 *   - Não pode conter "://" (protocolo embutido)
 *
 * Bloqueia tentativas comuns de open redirect:
 *   - https://malicious.com/...
 *   - //malicious.com/...
 *   - /\malicious.com/...
 *   - javascript:alert(1)
 *
 * @param next valor potencialmente vindo de query string ou body
 * @param fallback caminho a usar se o valor for inválido (default '/')
 * @returns caminho seguro
 */
export function safeNext(
  next: string | null | undefined,
  fallback: string = '/',
): string {
  if (typeof next !== 'string') return fallback;

  const trimmed = next.trim();
  if (trimmed.length === 0) return fallback;
  if (trimmed.length > 500) return fallback; // sanity cap

  // Tem de começar com "/"
  if (!trimmed.startsWith('/')) return fallback;

  // Não pode começar com "//" (protocolo-relative URL)
  if (trimmed.startsWith('//')) return fallback;

  // Não pode começar com "/\" (truque que alguns navegadores interpretam como //)
  if (trimmed.startsWith('/\\')) return fallback;

  // Não pode conter "://" em lado nenhum (protocolo embutido)
  if (trimmed.includes('://')) return fallback;

  return trimmed;
}

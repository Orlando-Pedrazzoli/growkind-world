// src/lib/cloudinary.ts
// Helpers server-side do Cloudinary — sem SDK extra, só REST + assinatura SHA-1.
//
// Variáveis de ambiente necessárias (Vercel + .env.local):
//   CLOUDINARY_CLOUD_NAME   (ou NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET
//
// Fluxo de upload (direto do browser → Cloudinary, com progresso real):
//   1. Admin pede assinatura a /api/admin/upload/sign
//   2. Browser faz POST multipart para https://api.cloudinary.com/v1_1/{cloud}/image/upload
//   3. Cloudinary devolve { secure_url, public_id, width, height }
//   4. Admin guarda esse ImageAsset na BD através da rota da secção
import { createHash } from 'crypto';

export const CLOUDINARY_ROOT_FOLDER = 'growkind';

export function getCloudinaryConfig() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    '';
  const apiKey = process.env.CLOUDINARY_API_KEY || '';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
  return { cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured(): boolean {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  return !!(cloudName && apiKey && apiSecret);
}

/**
 * Assinatura Cloudinary: SHA-1 de "k1=v1&k2=v2…" (chaves ordenadas) + api_secret.
 * `file`, `api_key`, `resource_type` e `cloud_name` NÃO entram na assinatura.
 */
export function signParams(params: Record<string, string | number>): string {
  const { apiSecret } = getCloudinaryConfig();
  const toSign = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1')
    .update(toSign + apiSecret)
    .digest('hex');
}

/** Dados que o browser precisa para fazer o upload assinado. */
export function buildUploadSignature(folder: string) {
  const { cloudName, apiKey } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);
  const safeFolder = `${CLOUDINARY_ROOT_FOLDER}/${folder.replace(/[^a-z0-9/_-]/gi, '')}`;
  const params = { folder: safeFolder, timestamp };
  const signature = signParams(params);
  return {
    cloudName,
    apiKey,
    timestamp,
    folder: safeFolder,
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  };
}

/** Apaga um asset. Nunca lança — apagar é best-effort (o registo na BD é o que manda). */
export async function destroyAsset(
  publicId: string | null | undefined,
): Promise<boolean> {
  if (!publicId || !isCloudinaryConfigured()) return false;
  const { cloudName, apiKey } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = signParams({ public_id: publicId, timestamp });

  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  });

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: 'POST', body },
    );
    const data = (await res.json().catch(() => ({}))) as { result?: string };
    return data.result === 'ok' || data.result === 'not found';
  } catch (err) {
    console.error('[cloudinary] destroy falhou', publicId, err);
    return false;
  }
}

/** Só aceitamos URLs do nosso Cloudinary ou caminhos locais /images/… */
export function isAllowedImageUrl(url: unknown): url is string {
  if (typeof url !== 'string' || !url) return false;
  if (url.startsWith('/')) return true; // ficheiro local em /public
  const { cloudName } = getCloudinaryConfig();
  return (
    url.startsWith('https://res.cloudinary.com/') &&
    (!cloudName || url.includes(`/${cloudName}/`))
  );
}

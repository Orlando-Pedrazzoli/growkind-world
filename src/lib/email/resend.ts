// src/lib/email/resend.ts
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Remetente. Em produção usa um domínio verificado no Resend,
// ex.: "GrowKind World <ola@send.growkindworld.com>".
// Sem isso, o fallback onboarding@resend.dev só entrega para o teu próprio email.
const FROM =
  process.env.RESEND_FROM || 'GrowKind World <onboarding@resend.dev>';

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.warn(
      '[EMAIL] RESEND_API_KEY em falta — email NÃO enviado:',
      subject,
    );
    return { skipped: true as const };
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error('[EMAIL] Falha no envio:', error);
    throw new Error(error.message);
  }

  return { id: data?.id };
}

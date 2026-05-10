// src/components/seo/JsonLd.tsx
/**
 * Componente reutilizável para injectar JSON-LD em qualquer página.
 * Sanitiza '<' para evitar XSS injection (recomendação oficial Next.js).
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

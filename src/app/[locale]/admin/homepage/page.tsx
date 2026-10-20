// src/app/[locale]/admin/homepage/page.tsx
// CMS — imagens e textos das secções com imagem (Hero, Livro, RDF) + outras imagens do site.
import { AlertTriangle } from 'lucide-react';
import { connectDB } from '@/lib/db';
import SiteImage from '@/models/SiteImage';
import { getHeroSlidesRaw, getSectionTextsRaw } from '@/lib/cms/content';
import { IMAGE_SLOTS, SECTIONS } from '@/lib/cms/registry';
import { isCloudinaryConfigured } from '@/lib/cloudinary';
import HeroSlidesEditor from '@/components/admin/media/HeroSlidesEditor';
import SectionEditor from '@/components/admin/media/SectionEditor';
import SiteImagesEditor from '@/components/admin/media/SiteImagesEditor';
import ptMessages from '../../../../../messages/pt.json';
import enMessages from '../../../../../messages/en.json';
import type { ImageAsset } from '@/types/cms';

export const dynamic = 'force-dynamic';

// Lê um namespace ('home.bookSection') de um JSON de mensagens → { campo: string }
function readNamespace(
  messages: Record<string, unknown>,
  ns: string,
): Record<string, string> {
  const node = ns.split('.').reduce<unknown>((acc, part) => {
    return acc && typeof acc === 'object'
      ? (acc as Record<string, unknown>)[part]
      : undefined;
  }, messages);
  if (!node || typeof node !== 'object') return {};
  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).filter(
      (e): e is [string, string] => typeof e[1] === 'string',
    ),
  );
}

const NAV = [
  { id: 'hero', label: 'Hero' },
  ...SECTIONS.map(s => ({ id: s.key.replace(/\./g, '-'), label: s.label })),
  { id: 'outras', label: 'Outras imagens' },
];

export default async function AdminHomepagePage() {
  await connectDB();

  const [slides, imageDocs, ...sectionTexts] = await Promise.all([
    getHeroSlidesRaw(),
    SiteImage.find().lean(),
    ...SECTIONS.map(s => getSectionTextsRaw(s.key)),
  ]);

  const images: Record<string, ImageAsset | null> = {};
  for (const slot of IMAGE_SLOTS) {
    const d = imageDocs.find(x => x.key === slot.key);
    images[slot.key] = d
      ? {
          url: d.image.url,
          publicId: d.image.publicId ?? null,
          width: d.image.width ?? null,
          height: d.image.height ?? null,
        }
      : null;
  }

  const cloudinaryOk = isCloudinaryConfigured();
  const otherSlots = IMAGE_SLOTS.filter(s => s.group === 'site');

  return (
    <div>
      <div className='mb-8'>
        <span className='eyebrow'>Conteúdo</span>
        <h1 className='mt-3 text-[clamp(1.5rem,2.5vw,2rem)]'>
          Homepage e imagens
        </h1>
        <p className='mt-2 text-[15px] text-[var(--color-gk-cinza)]'>
          Imagens e textos das secções com imagem. Cada alteração guardada
          actualiza o site público de imediato.
        </p>
      </div>

      {!cloudinaryOk && (
        <div className='mb-6 flex items-start gap-3 border border-amber-300 bg-amber-50 p-4 text-[13px] text-amber-900'>
          <AlertTriangle size={18} className='mt-0.5 shrink-0' />
          <div>
            <p className='font-medium'>Cloudinary não configurado.</p>
            <p className='mt-1'>
              Podes editar textos, links e ordem, mas o upload de imagens só
              funciona depois de definir <code>CLOUDINARY_CLOUD_NAME</code>,{' '}
              <code>CLOUDINARY_API_KEY</code> e{' '}
              <code>CLOUDINARY_API_SECRET</code> nas variáveis de ambiente
              (Vercel → Settings → Environment Variables) e fazer redeploy.
            </p>
          </div>
        </div>
      )}

      {/* Navegação interna */}
      <nav className='mb-8 flex flex-wrap gap-2'>
        {NAV.map(n => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className='border border-[var(--color-gk-green-dark)]/15 bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--color-gk-green-dark)] hover:bg-[var(--color-gk-green-dark)]/5'
          >
            {n.label}
          </a>
        ))}
      </nav>

      <div className='space-y-14'>
        <section id='hero' className='scroll-mt-6'>
          <HeroSlidesEditor initial={slides} />
        </section>

        {SECTIONS.map((def, i) => (
          <section
            key={def.key}
            id={def.key.replace(/\./g, '-')}
            className='scroll-mt-6'
          >
            <SectionEditor
              def={def}
              initialTexts={sectionTexts[i]}
              defaults={{
                pt: readNamespace(
                  ptMessages as Record<string, unknown>,
                  def.key,
                ),
                en: readNamespace(
                  enMessages as Record<string, unknown>,
                  def.key,
                ),
              }}
              initialImage={def.imageSlot ? images[def.imageSlot] : null}
            />
          </section>
        ))}

        <section id='outras' className='scroll-mt-6'>
          <SiteImagesEditor slots={otherSlots} initial={images} />
        </section>
      </div>
    </div>
  );
}

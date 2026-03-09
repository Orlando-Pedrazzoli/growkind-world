import dbConnect from '@/lib/mongodb';
import ContentBlockModel from '@/models/ContentBlock';
import type { ContentBlock } from '@/types';

/**
 * Busca todos os blocos de conteúdo de uma página, ordenados.
 * Usado nos Server Components para renderizar conteúdo dinâmico.
 */
export async function getPageBlocks(
  pageSlug: string,
  lang: string = 'pt'
): Promise<ContentBlock[]> {
  await dbConnect();

  const blocks = await ContentBlockModel.find({
    pageSlug,
    lang,
    activo: true,
  })
    .sort({ ordem: 1 })
    .lean<ContentBlock[]>();

  return blocks;
}

/**
 * Busca um bloco específico de uma página.
 */
export async function getBlock(
  pageSlug: string,
  blockId: string,
  lang: string = 'pt'
): Promise<ContentBlock | null> {
  await dbConnect();

  const block = await ContentBlockModel.findOne({
    pageSlug,
    blockId,
    lang,
    activo: true,
  }).lean<ContentBlock>();

  return block;
}

/**
 * Helper para transformar array de blocos num mapa por blockId.
 * Facilita o acesso nos componentes: blocks['hero'].titulo
 */
export function blocksToMap(
  blocks: ContentBlock[]
): Record<string, ContentBlock> {
  return blocks.reduce(
    (acc, block) => {
      acc[block.blockId] = block;
      return acc;
    },
    {} as Record<string, ContentBlock>
  );
}

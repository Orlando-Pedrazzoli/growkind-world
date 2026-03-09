import mongoose, { Schema, Model } from 'mongoose';
import type { ContentBlock } from '@/types';

const ContentBlockSchema = new Schema<ContentBlock>(
  {
    pageSlug: { type: String, required: true, index: true },
    blockId: { type: String, required: true },
    lang: { type: String, enum: ['pt', 'en'], default: 'pt' },
    titulo: String,
    subtitulo: String,
    corpo: String,
    ctaTexto: String,
    ctaLink: String,
    imagemId: String,
    ordem: { type: Number, default: 0 },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Índice composto para queries eficientes
ContentBlockSchema.index({ pageSlug: 1, lang: 1, ordem: 1 });

const ContentBlockModel: Model<ContentBlock> =
  mongoose.models.ContentBlock ||
  mongoose.model<ContentBlock>('ContentBlock', ContentBlockSchema);

export default ContentBlockModel;

import mongoose, { Schema, Model } from 'mongoose';
import type { BlogPost } from '@/types';

const BlogPostSchema = new Schema<BlogPost>(
  {
    slug: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    resumo: { type: String, required: true },
    corpo: { type: String, required: true },
    autor: { type: String, default: 'João Pereira' },
    dataPublicacao: { type: Date, required: true },
    categoria: String,
    tags: [String],
    imagemDestaque: String,
    estado: {
      type: String,
      enum: ['publicado', 'rascunho'],
      default: 'rascunho',
    },
    lang: { type: String, enum: ['pt', 'en'], default: 'pt' },
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ estado: 1, dataPublicacao: -1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ lang: 1 });

const BlogPostModel: Model<BlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<BlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;

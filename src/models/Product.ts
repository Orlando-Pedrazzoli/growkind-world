import mongoose, { Schema, Model } from 'mongoose';
import type { Product } from '@/types';

const ProductVariantSchema = new Schema(
  {
    tamanho: { type: String, required: true },
    cor: String,
    printfulVariantId: { type: String, required: true },
    preco: { type: Number, required: true },
    disponivel: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<Product>(
  {
    slug: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    categoria: {
      type: String,
      enum: ['vestuario', 'acessorios'],
      required: true,
    },
    variantes: [ProductVariantSchema],
    imagens: [String],
    printfulProductId: { type: String, required: true },
    preco: { type: Number, required: true },
    moeda: { type: String, default: 'EUR' },
    estado: {
      type: String,
      enum: ['activo', 'inactivo', 'esgotado'],
      default: 'activo',
    },
    destaque: { type: Boolean, default: false },
    ordem: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ categoria: 1, estado: 1, ordem: 1 });

const ProductModel: Model<Product> =
  mongoose.models.Product ||
  mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;

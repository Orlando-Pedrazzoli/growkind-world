// src/models/ProductPrice.ts
import mongoose, { Schema, Document } from 'mongoose';
import type { ProductType } from '@/models/Purchase';

export interface IProductPrice extends Document {
  _id: mongoose.Types.ObjectId;
  product: ProductType;
  amount: number; // cêntimos
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductPriceSchema = new Schema<IProductPrice>(
  {
    product: {
      type: String,
      enum: ['ebook', 'curso-prof', 'curso-fam'],
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true, min: 0 }, // cêntimos
    currency: { type: String, required: true, default: 'eur' },
  },
  { timestamps: true },
);

export default mongoose.models.ProductPrice ||
  mongoose.model<IProductPrice>('ProductPrice', ProductPriceSchema);

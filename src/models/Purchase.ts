// src/models/Purchase.ts

import mongoose, { Schema, Document } from 'mongoose';

export type ProductType = 'ebook' | 'curso-prof' | 'curso-fam';

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  product: ProductType;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    product: {
      type: String,
      enum: ['ebook', 'curso-prof', 'curso-fam'],
      required: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    stripePaymentIntentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'eur',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Índice composto: queries rápidas por utilizador + produto + status
PurchaseSchema.index({ userEmail: 1, product: 1, status: 1 });

export default mongoose.models.Purchase ||
  mongoose.model<IPurchase>('Purchase', PurchaseSchema);

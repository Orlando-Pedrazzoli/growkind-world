// src/models/EmailSubscriber.ts

import mongoose, { Schema, Document } from 'mongoose';

export type SubscriberSource =
  | 'homepage'
  | 'sobre'
  | 'cursos'
  | 'o-livro'
  | 'other';
export type SubscriberStatus = 'active' | 'unsubscribed';

export interface IEmailSubscriber extends Document {
  email: string;
  source: SubscriberSource;
  status: SubscriberStatus;
  // Metadados de auditoria (RGPD: prova de consentimento)
  ipAddress?: string;
  userAgent?: string;
  // Quando foi feita a inscrição (consentimento)
  subscribedAt: Date;
  // Quando cancelou (se for o caso)
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EmailSubscriberSchema = new Schema<IEmailSubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    source: {
      type: String,
      enum: ['homepage', 'sobre', 'cursos', 'o-livro', 'other'],
      required: true,
      default: 'homepage',
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      required: true,
      default: 'active',
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    subscribedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Índices para queries do admin
EmailSubscriberSchema.index({ status: 1, createdAt: -1 });
EmailSubscriberSchema.index({ source: 1, createdAt: -1 });

export default mongoose.models.EmailSubscriber ||
  mongoose.model<IEmailSubscriber>('EmailSubscriber', EmailSubscriberSchema);

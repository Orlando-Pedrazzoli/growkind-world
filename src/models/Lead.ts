import mongoose, { Schema, Model } from 'mongoose';
import type { Lead } from '@/types';

const LeadSchema = new Schema<Lead>(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, index: true },
    perfil: {
      type: String,
      enum: ['pai-mae', 'educador', 'psicologo', 'terapeuta', 'outro-profissional'],
    },
    origem: { type: String, required: true },
    brevoContactId: String,
    consentimento: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Evitar leads duplicados do mesmo email + origem
LeadSchema.index({ email: 1, origem: 1 }, { unique: true });

const LeadModel: Model<Lead> =
  mongoose.models.Lead ||
  mongoose.model<Lead>('Lead', LeadSchema);

export default LeadModel;

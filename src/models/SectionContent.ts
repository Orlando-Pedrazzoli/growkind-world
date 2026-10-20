// src/models/SectionContent.ts
// Textos editáveis de uma secção do site (ex.: 'home.bookSection').
// Só os campos guardados aqui sobrepõem os de messages/{pt,en}.json —
// campo vazio na BD → o site continua a usar a tradução do JSON.
import mongoose, { Schema, Document } from 'mongoose';
import type { LocalizedString } from '@/types/cms';

export interface ISectionContent extends Document {
  _id: mongoose.Types.ObjectId;
  key: string;
  texts: Map<string, LocalizedString>;
  createdAt: Date;
  updatedAt: Date;
}

const LocalizedSchema = new Schema<LocalizedString>(
  {
    pt: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  { _id: false },
);

const SectionContentSchema = new Schema<ISectionContent>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    texts: { type: Map, of: LocalizedSchema, default: () => new Map() },
  },
  { timestamps: true },
);

export default mongoose.models.SectionContent ||
  mongoose.model<ISectionContent>('SectionContent', SectionContentSchema);

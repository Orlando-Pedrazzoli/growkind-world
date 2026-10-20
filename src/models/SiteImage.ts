// src/models/SiteImage.ts
// Um documento por "slot" fixo de imagem (ex.: capa do livro, foto do João).
// Se não existir documento para um slot, o site usa o ficheiro de /public.
import mongoose, { Schema, Document } from 'mongoose';
import type { ImageAsset } from '@/types/cms';

export interface ISiteImage extends Document {
  _id: mongoose.Types.ObjectId;
  key: string;
  image: ImageAsset;
  createdAt: Date;
  updatedAt: Date;
}

const ImageAssetSchema = new Schema<ImageAsset>(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  { _id: false },
);

const SiteImageSchema = new Schema<ISiteImage>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    image: { type: ImageAssetSchema, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.SiteImage ||
  mongoose.model<ISiteImage>('SiteImage', SiteImageSchema);

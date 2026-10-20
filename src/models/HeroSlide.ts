// src/models/HeroSlide.ts
import mongoose, { Schema, Document } from 'mongoose';
import type { ImageAsset, LocalizedString } from '@/types/cms';

export interface IHeroSlide extends Document {
  _id: mongoose.Types.ObjectId;
  order: number;
  active: boolean;
  desktop: ImageAsset;
  mobile: ImageAsset;
  alt: LocalizedString;
  href: string | null;
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

const LocalizedSchema = new Schema<LocalizedString>(
  {
    pt: { type: String, default: '', trim: true },
    en: { type: String, default: '', trim: true },
  },
  { _id: false },
);

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    order: { type: Number, required: true, default: 0, index: true },
    active: { type: Boolean, default: true },
    desktop: { type: ImageAssetSchema, required: true },
    mobile: { type: ImageAssetSchema, required: true },
    alt: { type: LocalizedSchema, default: () => ({ pt: '', en: '' }) },
    href: { type: String, default: null, trim: true },
  },
  { timestamps: true },
);

export default mongoose.models.HeroSlide ||
  mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);

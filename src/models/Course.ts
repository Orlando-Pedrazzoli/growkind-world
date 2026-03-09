import mongoose, { Schema, Model } from 'mongoose';
import type { Course } from '@/types';

const CourseSchema = new Schema<Course>(
  {
    slug: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    movimento: {
      type: String,
      enum: ['M1', 'M2', 'M3', 'eixo'],
      required: true,
    },
    publico: [{ type: String, enum: ['familias', 'profissionais'] }],
    duracao: String,
    formato: {
      type: String,
      enum: ['online', 'presencial', 'hibrido'],
      default: 'online',
    },
    estado: {
      type: String,
      enum: ['em-breve', 'inscricoes-abertas', 'a-decorrer', 'concluido'],
      default: 'em-breve',
    },
    descricao: { type: String, required: true },
    descricaoLonga: String,
    ctaTexto: { type: String, default: 'Entrar na lista de espera' },
    ctaLink: { type: String, default: '#lista-espera' },
    imagemId: String,
    preco: Number,
    moeda: { type: String, default: 'EUR' },
    lang: { type: String, enum: ['pt', 'en'], default: 'pt' },
    ordem: { type: Number, default: 0 },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const CourseModel: Model<Course> =
  mongoose.models.Course ||
  mongoose.model<Course>('Course', CourseSchema);

export default CourseModel;

import mongoose, { Schema, Model } from 'mongoose';
import type { User } from '@/types';

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    cursosInscritos: [{ type: String }],
    plano: {
      type: String,
      enum: ['gratuito', 'basico', 'premium'],
      default: 'gratuito',
    },
    authProvider: String,
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User> =
  mongoose.models.User ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;

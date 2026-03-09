import mongoose, { Schema, Model } from 'mongoose';
import type { Order } from '@/types';

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    nome: { type: String, required: true },
    variante: String,
    quantidade: { type: Number, required: true, min: 1 },
    precoUnitario: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<Order>(
  {
    stripeSessionId: { type: String, required: true, unique: true },
    printfulOrderId: String,
    email: { type: String, required: true },
    nome: { type: String, required: true },
    itens: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    envio: { type: Number, default: 0 },
    total: { type: Number, required: true },
    moeda: { type: String, default: 'EUR' },
    estado: {
      type: String,
      enum: ['pendente', 'pago', 'em-producao', 'enviado', 'entregue', 'cancelado'],
      default: 'pendente',
    },
    morada: {
      linha1: { type: String, required: true },
      linha2: String,
      cidade: { type: String, required: true },
      codigoPostal: { type: String, required: true },
      pais: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ email: 1, createdAt: -1 });
OrderSchema.index({ estado: 1 });

const OrderModel: Model<Order> =
  mongoose.models.Order ||
  mongoose.model<Order>('Order', OrderSchema);

export default OrderModel;

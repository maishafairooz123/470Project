import { model, Schema } from 'mongoose';
import { OrderStatus } from '../constants/orderStatus.js';
import { OrderItemStatus } from '../constants/orderItemStatus.js';
import { FoodModel } from './food.model.js';

export const OrderItemSchema = new Schema(
  {
    food: { type: FoodModel.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    status: {type: String, default: OrderItemStatus.NEW}
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre('validate', function (next) {
  this.price = this.food.price * this.quantity;
  next();
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true, index: false},
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model('order', orderSchema);

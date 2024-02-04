import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;

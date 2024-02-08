import { Schema, model, models } from "mongoose";

export type TOrder = {
  buyerId: string;
  products: {
    productId: string; //this is the id
    qty: string;
  }[];
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
};

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
        type: String,
        required: true,
        default: "1",
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

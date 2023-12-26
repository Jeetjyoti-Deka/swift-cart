import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  price: { type: String, required: true },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Event = models.Event || model("Event", ProductSchema);

export default Event;

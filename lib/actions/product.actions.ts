"use server";

import { connectToDatabase } from "../mongodb";
import Product from "../mongodb/models/product.model";

export const createProduct = async (product: {
  name: string;
  img: string;
  stockQty: number;
  price: number;
  description: string;
}) => {
  try {
    await connectToDatabase();

    const newProduct = await Product.create(product);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (productId: string) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(productId);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
};

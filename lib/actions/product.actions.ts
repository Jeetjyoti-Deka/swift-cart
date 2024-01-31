"use server";

import { connectToDatabase } from "../mongodb";
import Category from "../mongodb/models/category.model";
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

    const newProduct = await Product.create({
      ...product,
      categories: ["65ba15cd13516cde1422e5d1"],
    });
    console.log(newProduct);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find().populate({
      path: "categories",
      model: Category,
      select: "_id name",
    });

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

export const getProductByCategoryId = async (categoryId: string) => {
  try {
    await connectToDatabase();

    const products = await Product.find({
      categories: { $in: [categoryId] },
    }).populate({
      path: "categories",
      model: Category,
      select: "_id name",
    });

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

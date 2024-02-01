"use server";

import { connectToDatabase } from "../mongodb";
import Category from "../mongodb/models/category.model";
import Product from "../mongodb/models/product.model";

type getAllProductsProps = {
  page: number | string;
  limit: number;
};

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

export const getAllProducts = async ({
  page,
  limit = 6,
}: getAllProductsProps) => {
  const skipAmount = (Number(page) - 1) * limit;

  try {
    await connectToDatabase();
    const products = await Product.find()
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "categories",
        model: Category,
        select: "_id name",
      });

    const productsCount = await Product.countDocuments();

    const totalPages = Math.ceil(productsCount / limit);

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages,
    };
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

type getRelatedProductsProps = {
  productId: string;
  page: number | string;
  limit?: number;
};

export const getRelatedProducts = async ({
  productId,
  page,
  limit = 3,
}: getRelatedProductsProps) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId).select("categories");

    const condition = {
      categories: { $in: product.categories },
      _id: { $ne: product._id },
    };

    const skipAmount = (Number(page) - 1) * limit;

    const relatedProducts = await Product.find(condition)
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "categories",
        model: Category,
        select: "_id name",
      });

    const productsCount = await Product.countDocuments(condition);
    const totalPages = Math.ceil(productsCount / limit);

    return {
      data: JSON.parse(JSON.stringify(relatedProducts)),
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

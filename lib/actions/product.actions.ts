"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongodb";
import Category from "../mongodb/models/category.model";
import Product from "../mongodb/models/product.model";
import { UpdateProductParams, reduceStockQtyProps } from "../types";

type getAllProductsProps = {
  page: number | string;
  limit: number;
};

type getRelatedProductsProps = {
  productId: string;
  page: number | string;
  limit?: number;
};

type getProductsByCategoryIdProps = {
  categoryId: string;
  page: number;
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
    const product = await Product.findById(productId).populate({
      path: "categories",
      model: Category,
      select: "_id name",
    });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategoryId = async ({
  categoryId,
  page,
  limit = 6,
}: getProductsByCategoryIdProps) => {
  try {
    await connectToDatabase();

    const skipAmount = (page - 1) * limit;

    const condition = {
      categories: { $in: [categoryId] },
    };

    const products = await Product.find(condition)
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
      data: JSON.parse(JSON.stringify(products)),
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
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

export const reduceStockQty = async ({
  productId,
  qty,
}: reduceStockQtyProps) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const newStockQty = product.stockQty - Number(qty);

    product.stockQty = newStockQty;

    await product.save();

    return { message: "Reduced Quantity successfully" };
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async ({ values }: UpdateProductParams) => {
  try {
    await connectToDatabase();

    const product = await Product.findByIdAndUpdate(values._id, values);

    if (!product) {
      throw new Error("Could not update Product");
    }

    revalidatePath("/update");

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
};

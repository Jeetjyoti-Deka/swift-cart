"use server";

import { connectToDatabase } from "../mongodb";
import Category from "../mongodb/models/category.model";

export const createCategory = async (name: string) => {
  const categoryName = name.trim().toLowerCase();

  try {
    const categoryExist = await Category.findOne({ name: categoryName });

    if (categoryExist) {
      return JSON.stringify({ message: "Category already exist" });
    }

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryName = async (categoryId: string) => {
  try {
    await connectToDatabase();
    const category = await Category.findById(categoryId);

    return category.name;
  } catch (error) {
    console.log(error);
  }
};

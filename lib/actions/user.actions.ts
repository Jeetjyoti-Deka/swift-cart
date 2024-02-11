"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongodb";
import User from "../mongodb/models/user.model";
import {
  CreateUserParams,
  AddToWishListParams,
  DeleteWishListItemParams,
} from "../types";
import Order from "../mongodb/models/order.model";
import Product from "../mongodb/models/product.model";
import { getSingleProduct } from "./product.actions";

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
};

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    if (user.email === "jeetjyoti2020@gmail.com") {
      user.isAdmin = true;
    }

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId: id });

    if (!userToDelete) {
      throw new Error("User not found");
    }
    await Order.updateMany(
      { _id: { $in: userToDelete.orders } },
      { $unset: { buyer: 1 } }
    );

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(error);
  }
};

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}

export const getUserIdByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user._id));
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = async ({
  productId,
  userId,
}: AddToWishListParams) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.wishList && user.wishList.length >= 1) {
      const itemExist = user.wishList.some(
        (itemId: any) => itemId.toString() === productId
      );

      if (itemExist) {
        return { message: "Product already exist in the wishlist" };
      } else {
        user.wishList = [...user.wishList, productId];
      }
    } else {
      user.wishList = [productId];
    }

    user.save();
    revalidatePath("/profile", "layout");
    return { message: "Product added to wishlist" };
  } catch (error) {
    console.log(error);
  }
};

export const getWishListProducts = async ({
  userId,
  page,
  limit = 3,
}: {
  userId: string;
  page: number;
  limit?: number;
}) => {
  try {
    await connectToDatabase();

    let user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const start = (page - 1) * limit;
    const end = page * limit;

    let products = user.wishList.slice(start, end);

    const totalPages = Math.ceil(user.wishList.length / limit);

    const newProducts = [];

    for (const productId of products) {
      const product = await getSingleProduct(productId);
      newProducts.push(product);
    }

    return {
      data: JSON.parse(JSON.stringify(newProducts)),
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishListItem = async ({
  userId,
  productId,
}: DeleteWishListItemParams) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    user.wishList = user.wishList.filter(
      (item: any) => item.toString() !== productId
    );

    await user.save();

    revalidatePath("/profile");

    return { message: "Product removed from the wishlist" };
  } catch (error) {
    console.log(error);
  }
};

export const checkAdminWithUserId = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    return user.isAdmin;
  } catch (error) {
    console.log(error);
  }
};

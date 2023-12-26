"use server";

import { CreateUserParams, updateUserParams } from "@/types";
import User from "../mongodb/database/models/user.model";
import connectToDB from "../mongodb/database";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Order from "../mongodb/database/models/order.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: updateUserParams) => {
  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updateUser) throw new Error("User Update Failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Order.updateMany(
      { _id: { $in: userToDelete.orders } },
      { $unset: { buyer: 1 } }
    );

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

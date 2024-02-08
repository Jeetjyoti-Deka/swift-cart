import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongodb";
import User from "../mongodb/models/user.model";

type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
};

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

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
    // TODO:
    //   await Order.updateMany(
    //     { _id: { $in: userToDelete.orders } },
    //     { $unset: { buyer: 1 } }
    //   ),

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

    return JSON.parse(JSON.stringify(user._id));
  } catch (error) {
    console.log(error);
  }
};

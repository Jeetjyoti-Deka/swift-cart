import { connectToDatabase } from "../mongodb";
import User from "../mongodb/models/user.model";

type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
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

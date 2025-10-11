import { queryObjects } from 'v8';
import { User } from '../../entities/User';
import { UserModel } from '../../models/UserModel';
import { UserRepositories } from './../UserRepositories';
import { Types } from "mongoose";

export class UserRepositoryMongo implements UserRepositories {
  async createUser(user: User): Promise<User> {
    const newUserDoc = await UserModel.create(user);
  
    // ✅ Safely convert _id to string for your entity
    return new User({
      ...newUserDoc.toObject(),
      _id: (newUserDoc._id as Types.ObjectId)?.toString() ?? null,
    });
  }
  

  async deleteUser(userId: string): Promise<void> {
    await UserModel.deleteOne({ _id: userId });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ username });
    if (!userDoc) return null;

    return new User({
      ...userDoc.toObject(),
      _id: (userDoc._id as Types.ObjectId)?.toString() ?? null,
    });
  }

  async findUserByEmail(email: string, isVerified?: boolean): Promise<User | null> {
    const query: any = { email };

    if (typeof isVerified === "boolean") {
      query.isVerified = isVerified;
    }
    const userDoc = await UserModel.findOne(query);
    if (!userDoc) return null;

    return new User({
      ...userDoc.toObject(),
      _id: (userDoc._id as Types.ObjectId)?.toString() ?? null,
    });
  }

  async updateUser(user: User): Promise<User> {
    if (!user._id) {
      throw new Error("Cannot update user without _id");
    }

    const updatedUserDoc = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          username: user.username,
          password: user.password,
          role: user.role,
          isVerified: user.isVerified,
          verifyCode: user.verifyCode,
          isExpiried: user.isExpiried,
          resumes: user.resumes,
        },
      },
      { new: true, runValidators: false }
    );

    if (!updatedUserDoc) {
      throw new Error("User not found");
    }

    return new User({
      ...updatedUserDoc.toObject(),
      _id: (updatedUserDoc._id as Types.ObjectId)?.toString() ?? null,
    });
  }
}
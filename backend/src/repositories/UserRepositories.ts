import { User } from "../entities/User";

export interface UserRepositories {
  // define the operation you want to perfome on database

  // create a new user 
  createUser(user: User) : Promise<User>;

  // delete a user
  deleteUser(userId: string): Promise<void>;

  // find user by username
  findUserByUsername(username: string) : Promise<User | null>;

  // find user by email
  findUserByEmail(email: string) : Promise<User | null>;

  // update user
  updateUser(user: User) : Promise<User>;
}
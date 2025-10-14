import { UserRepositoryMongo } from "../repositories/mongo/User";

const userRepository = new UserRepositoryMongo();

export async function generateUniqueUsername(baseUsername: string) {
  let username = baseUsername;
  let count = 1;

  // Check if the username exists
  while (await userRepository.findUserByUsername(username)) {
    username = `${baseUsername}${count}`; // e.g., "john1", "john2"
    count++;
  }

  return username;
}

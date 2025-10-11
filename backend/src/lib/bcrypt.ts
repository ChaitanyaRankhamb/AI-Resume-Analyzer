const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt with 10 salt rounds.
 * @param password - The plain text password to hash.
 * @returns Promise<string> - The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hash - The hashed password.
 * @returns Promise<boolean> - True if the password matches the hash.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

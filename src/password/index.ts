import bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt.
 * 
 * @param password - The password to hash.
 * @param saltRounds - The number of salt rounds (default is 10).
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async(password: string, saltRounds: number = 10): Promise<string> => {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      throw new Error(`Error hashing password: ${err}`);
    }
}

/**
 * Compares a password with a hashed password using bcrypt.
 * 
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns A promise that resolves to a boolean indicating whether the password matches the hash.
 */
export const comparePassword = async(password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

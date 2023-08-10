import dotenv from "dotenv";
dotenv.config();
import bcrypyjs from "bcryptjs";

interface GetSecretKey {
  (): never | string;
}
export const getSecretKey: GetSecretKey = () => {
  const SECRET = process.env.SECRET;
  if (!SECRET) throw new Error("SECRET enviroment variable is required");
  return SECRET;
};

interface HashPassword {
  (password: string): Promise<string>;
}
export const hashPassword: HashPassword = async (password) => {
  const hash = await bcrypyjs.hash(password, 12);
  return hash;
};

interface CompareHash {
  (st: string, hash: string): Promise<boolean>;
}
export const compareHash: CompareHash = async (str, hash) => {
  const hashIsCorrect = await bcrypyjs.compare(str, hash);
  return hashIsCorrect;
};

// express
import { Router } from "express";
// libs
import UserModel from "../models/user.model";
import { sign } from "jsonwebtoken";

// utils
import { hashPassword, compareHash, getSecretKey } from "../utils/hashing";
// types & interfaces
import type { UserDocument } from "../models/user.model";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.get("/users", async (req, res) => {
  const users = await UserModel.find();
  if (users.length === 0) return res.json({ message: "There is no users" });
  return res.json(users);
});

router.get("/profile", (req, res) => {
  const { user } = req as any;
  res.json({ message: "Profile page", user });
});

router.post("/auth/register", async (req, res) => {
  const { name, password } = req.body;
  const userData = { name: name ?? "", password: password ?? "" };
  try {
    if (userData.name.length < 3 ?? userData.name.length > 20) {
      throw new Error("name must have a length between 3 and 20");
    } else if (userData.password.length < 6) {
      throw new Error("password must have 6 characters at least");
    }
    const user = await UserModel.create({
      ...userData,
      password: await hashPassword(userData.password),
    });
    res.json({ user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/auth/login", async (req, res) => {
  const { name, password } = req.body;
  const user: UserDocument | null = await UserModel.findOne({ name });
  if (!user) {
    return res.status(404).json({ error: "User does't exist" });
  }
  const userPassword: string = user.password!;
  const passwordIsCorrect = await compareHash(password, userPassword);
  if (!passwordIsCorrect) {
    return res.status(401).json({ error: "Invalid name or password" });
  }
  const payload = {
    _id: user._id,
    name: user.name,
  };
  const token = sign(payload, getSecretKey(), { expiresIn: 86400 });

  return res.status(200).json({ success: true, user, token });
});

export default router;

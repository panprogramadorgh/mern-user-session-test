import { Handler } from "express";
import { verify } from "jsonwebtoken";
import { getSecretKey } from "../utils/hashing";

interface Payload {
  _id: string;
  name: string;
}

const handler: Handler = (req, res, next) => {
  const token = req.headers["token"] as string | undefined;
  if (!token) {
    (req as any).user = null;
    return next();
  }
  try {
    const payload: Payload = verify(token, getSecretKey()) as Payload;
    (req as any).user = { ...payload, exp: undefined };
    return next();
  } catch (error) {
    (req as any).user = null;
    next();
  }
};

export default handler;

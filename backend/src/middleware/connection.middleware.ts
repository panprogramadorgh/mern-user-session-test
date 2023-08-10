import { Handler } from "express";
import { connection } from "mongoose";

const handler: Handler = (req, res, next) => {
  const isConnected = connection.readyState === 1;
  if (!isConnected)
    return res.status(500).json({ error: "Error connecting to database" });

  next();
};

export default handler;

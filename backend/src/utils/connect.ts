import { connect } from "mongoose";

export default async () => {
  return await connect("mongodb://127.0.0.1:27017/test");
};

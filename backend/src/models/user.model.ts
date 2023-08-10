import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name already exists"],
    min: [3, "name must be 3 chars long at leasst"],
    max: [20, "name must be smoller than 20 chars"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: [true, "password already exists"],
    min: [6, "password must be 3 chars long at leasst"],
  },
});

export type UserType = InferSchemaType<typeof userSchema>;
export interface UserDocument extends UserType {
  _id: string;
  __v: number;
}
const UserModel = models.user ?? model("user", userSchema, "users");
export default UserModel;

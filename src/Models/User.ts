import { Schema, model } from "mongoose";

export interface IUsers {
    name: string,
    email: string,
    password: string,
}
const UserSchema = new Schema<IUsers>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
export const User = model("User", UserSchema);
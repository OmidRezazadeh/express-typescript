import { ObjectId, Schema, model } from "mongoose";

export interface IPost {
  _id: ObjectId;
  description: string;
  title: string;
  image?: string;
  user: Schema.Types.ObjectId;
  deletedAt?: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: { type: String, default: null },
  deletedAt: { type: Date, default: null },
});
export const Post = model("Post", PostSchema);

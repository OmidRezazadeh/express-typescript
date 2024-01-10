import { Schema, model } from "mongoose";

export const ROLE_ADMIN="admin"
interface IRoles {
  name: string;
  // other role properties if needed
}


const RoleSchema = new Schema<IRoles>({
  name: {type:String, required:true}
  // other role properties if needed
});

export const Role = model("Role", RoleSchema);


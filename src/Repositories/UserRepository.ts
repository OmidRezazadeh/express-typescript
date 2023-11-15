import { DefaultSchemaOptions, Document, FlatRecord, Model, Schema, Types } from "mongoose";
import { IUsers, User } from "../Models/User"
import { UserInterface } from "../interface/UserInterFace";


export class UserRepository implements UserInterface {

  async create(data:any)  {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error(`Error creating user in the repository: ${error.message}`);
    }

  }

  async login(data: any): Promise<any> {
    console.log("ok");
  }

  async findByEmail(email: string): Promise<IUsers | null> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}


import { DefaultSchemaOptions, Document, FlatRecord, Model, Schema, Types } from "mongoose";
import { IUsers, User } from "../Models/User"
import { UserInterface } from "../interface/UserInterFace";

export  class UserRepository implements UserInterface {

  async create(data: IUsers) {
      
            const user= await User.create(data);
          return user;
    
    }
}



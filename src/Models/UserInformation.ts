import { Schema,model } from "mongoose";

// Define UserInformation Interface
export interface IUserInformation{
    image?:string, // Optional field to store image
    bio?:string, // Optional field to store user bio
    link?:string, // Optional field to store any link user shared
    phone:number, // Optional field to store user's phone number
    user: { 
        // Field to store reference to User
        type: Schema.Types.ObjectId, // The reference is stored as an ObjectId
        ref: 'User' // The reference points to the User model
    }
}

// Defining UserInformation Schema mapping interface IUserInformation
const UserInformationSchema = new Schema<IUserInformation>({
    phone:{type:Number, required: true}, // Mandatory field to store user's phone number
    bio :{type:String, default: null}, // Optional field with default value null for user bio
    link:{type:String, default: null}, // Optional field with default value null for user link
    image:{type:String,default:null}, // Optional field with default value null for user image
    user: { // Reference field to User 
        type: Schema.Types.ObjectId, // The reference is an ObjectId
        ref: 'User' // The reference points to User schema
    }
});

// Export UserInformation schema as a mongoose model to be used in the application
export const UserInformation = model("UserInformation", UserInformationSchema); 
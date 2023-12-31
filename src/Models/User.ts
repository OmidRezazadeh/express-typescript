import {ObjectId, Schema, model } from "mongoose";

// Define an interface representing the structure of a user document
export interface IUsers {
    _id: ObjectId,
    name: string;
    email: string;
    password: string;
    userInformation: Schema.Types.ObjectId;
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // Array of role references
}

// Create a Mongoose schema for the User model using the defined interface
const UserSchema = new Schema<IUsers>({
    // User's name is a required string field
    name: { type: String, required: true },

    // User's email is a required string field
    email: { type: String, required: true },

    // User's password is a required string field
    password: { type: String, required: true },
    userInformation: {
        type: Schema.Types.ObjectId,
        ref: 'UserInformation'
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // Array of role references

});

// Create a Mongoose model named "User" based on the UserSchema
export const User = model("User", UserSchema);

import mongoose, { Schema } from "mongoose";

// Define the structure of the confirmation code
export interface IConfirmationCode {
    code: string;
    email: string;
    createdAt: Date;
}

// Define the Mongoose schema for the confirmation code
const ConfirmationCodeSchema = new Schema<IConfirmationCode>({
    code: { type: String, required: true }, // Confirmation code field
    email: { type: String, required: true }, // Email field
    createdAt: { type: Date, default: Date.now, expires:3600} // Creation date with expiration set to 180 mins
});

// Create the ConfirmationCode model based on the schema
export const ConfirmationCode = mongoose.model("ConfirmationCode", ConfirmationCodeSchema);

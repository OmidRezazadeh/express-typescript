import mongoose, { Schema, model } from "mongoose";

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
    createdAt: { type: Date, default: Date.now, expires: `180` } // Creation date with expiration set to 1 hour
});

// Create the ConfirmationCode model based on the schema
export const ConfirmationCode = mongoose.model("ConfirmationCode", ConfirmationCodeSchema);

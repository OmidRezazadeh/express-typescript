import { ConfirmationCode, IConfirmationCode } from "../Models/ConfirmationCode";
import { ConfirmationCodeInterface } from "../interface/ConfirmationCodeInterface";

// ConfirmationCodeRepository implements the ConfirmationCodeInterface
export class ConfirmationCodeRepository implements ConfirmationCodeInterface {

    // Method to create a new confirmation code
    async create(data: any) {
        try {
            const confirmationCode = await ConfirmationCode.create(data); // Create a new confirmation code using the ConfirmationCode model
            return confirmationCode; // Return the created confirmation code object
        } catch (error) {
            // If an error occurs during confirmation code creation, throw an error with a specific message
            throw new Error(`Error creating confirmation code in the repository: ${error.message}`);
        }
    }

    async find(code: string, email: string) {
        try {
            const newConfirmationCode = await ConfirmationCode.findOne({ code: code, email: email });
            // Find a ConfirmationCode in the database by their email,code
            return newConfirmationCode; // Return the found ConfirmationCode or null if not found
        } catch (error) {
            console.log(error); // Log any errors that occur during the process

        }
    }
}

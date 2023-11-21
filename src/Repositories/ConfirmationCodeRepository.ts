
import { ConfirmationCode, IConfirmationCode } from "../Models/ConfirmationCode"
import { ConfirmationCodeInterface } from "../interface/ConfirmationCodeInterface";


export class ConfirmationCodeRepository implements ConfirmationCodeInterface {

    async create(data: any) {
        try {
            const confirmationCode = await ConfirmationCode.create(data);
            return confirmationCode;
        } catch (error) {
            throw new Error(`Error creating user in the repository: ${error.message}`);
        }

    }

}
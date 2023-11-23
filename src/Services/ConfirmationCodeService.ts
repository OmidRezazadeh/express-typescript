import { ConfirmationCodeRepository } from "../Repositories/ConfirmationCodeRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { validationConfirmationCode } from "../Validations/ConfirmationCodeValidate";
import {sendEmail} from "../utils/mailer";
import crypto from 'crypto';

export class ConfirmationCodeService {
    private confirmationCodeRepository: ConfirmationCodeRepository;
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository, confirmationCodeRepository: ConfirmationCodeRepository) {
        this.userRepository = userRepository;
        this.confirmationCodeRepository = confirmationCodeRepository;
    }

    // Method to validate confirmation code
    async validationConfirmationCode(data: any) {
        // Validate the data using Joi schema
        const { error } = validationConfirmationCode.validate(data);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw errors;
        }

        // Check if user exists with the provided email
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            const errorUser = new Error("کاربری با این ایمیل یافت نشد"); // User with this email not found
            (errorUser as any).status = 400;
            throw errorUser;
        }
        // If everything is valid, proceed further
    }

    // Method to generate and store a confirmation code
    async store(data: any) {
        try {
            // Generate a random 6-character code using crypto
            const code = crypto.randomBytes(6).toString('hex');
            const email = data.email;
            const dataConfirmationCode = { code, email };
            const user = await this.userRepository.findByEmail(data.email);
            // Create a new confirmation code entry in the repository
            const newConfirmationCode = await this.confirmationCodeRepository.create(dataConfirmationCode);
            sendEmail(email,"پیام از طرف وبلاگ",code,user.name);
            return newConfirmationCode; // Return the newly created confirmation code object
        } catch (err) {
            console.log(err); // Log any errors that occur during the process
        }
    }
}

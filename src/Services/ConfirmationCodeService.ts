import { date } from "joi";
import { ConfirmationCodeRepository } from "../Repositories/ConfirmationCodeRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { validationConfirmationCode } from "../Validations/ConfirmationCodeValidate";
import crypto from 'crypto';
export class ConfirmationCodeService {
    private confirmationCodeRepository: ConfirmationCodeRepository;
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository, confirmationCodeRepository: ConfirmationCodeRepository) {
        this.userRepository = userRepository;
        this.confirmationCodeRepository = confirmationCodeRepository;
    }


    async validationConfirmationCode(email:any) {
console.log(email)
        const { error } =  validationConfirmationCode.validate(email);
        console.log(error);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw errors;
        }
      console.log("ok1");
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            const errorUser = new Error("کاربری بااین ایمیل یافت نشد");
            (errorUser as any).status = 400;
            throw errorUser;
        }

    }
    async store(email: any) {
        try {
            const code = crypto.randomBytes(6).toString('hex');
            const data ={code,email};
            const newConfirmationCode = await this.confirmationCodeRepository.create(data);
            return newConfirmationCode;

        } catch (err) {
            console.log(err);
        }
    }
}
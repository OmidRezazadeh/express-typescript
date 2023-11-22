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


    async validationConfirmationCode(data:any) {

        const { error } =  validationConfirmationCode.validate(data);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw errors;
        }

        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            const errorUser = new Error("کاربری بااین ایمیل یافت نشد");
            (errorUser as any).status = 400;
            throw errorUser;
        }

    }
    async store(data: any) {
  
        try {
            const code = crypto.randomBytes(6).toString('hex');
            const  email = data.email; 
            const dataConfirmationCode ={code,email};
            const newConfirmationCode = await this.confirmationCodeRepository.create(dataConfirmationCode);
            return newConfirmationCode;

        } catch (err) {
            console.log(err);
        }
    }
}
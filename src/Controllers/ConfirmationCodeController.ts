import { Request, Response, NextFunction } from "express";
import { ConfirmationCodeService } from '../Services/ConfirmationCodeService';
import { ConfirmationCodeRepository } from "../Repositories/ConfirmationCodeRepository";
import { UserRepository } from "../Repositories/UserRepository";
class confirmationCodeController {
    private confirmationCodeService: ConfirmationCodeService;

    // Constructor to initialize the UserService
    constructor(userService: ConfirmationCodeService) {
        this.confirmationCodeService = userService;
    }
    confirmationCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
         
            await this.confirmationCodeService.validationConfirmationCode(req.body.email);
            await this.confirmationCodeService.store(req.body.email);

            res.status(200).json({ "message": "success" });
        } catch (err) {
            next(err);
        }
    }
}
const confirmationCodeRepository = new ConfirmationCodeRepository();
const userRepository = new UserRepository();
const confirmationCodeService = new ConfirmationCodeService(userRepository, confirmationCodeRepository);

// Creating an instance of the UserController and exporting it
const ConfirmationCodeController = new confirmationCodeController(confirmationCodeService);

export { confirmationCodeRepository, confirmationCodeService, ConfirmationCodeController };
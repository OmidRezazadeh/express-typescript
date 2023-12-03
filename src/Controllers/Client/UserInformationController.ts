import { Request, Response, NextFunction } from "express";
import { UserInformationService } from "../../Services/UserInformationService";
import { UserInformationRepository } from "../../Repositories/UserInformationRepository";
import { getDecodedToken } from "../../utils/token"
import { UserRepository } from "../../Repositories/UserRepository";

class userInformationController {
    private userInformationService: UserInformationService;
    constructor(userInformationService: UserInformationService) {
        this.userInformationService = userInformationService;
    }
    update = async (req: Request, res: Response, next: NextFunction) => {
        const token = getDecodedToken(req.get('Authorization'));
        const data = { link: req.body.link, bio: req.body.bio, image: req.body.image };
        await this.userInformationService.validateUserInformationImage(data.image);
        const userInformation = await this.userInformationService.findUserInformationByEmail(token.user.email);
        const updateUserInformation = await this.userInformationService.updateUserInformation(userInformation, data);

    }

}
const userInformationRepository = new UserInformationRepository()
const userRepository = new UserRepository();
const userInformationService = new UserInformationService(userInformationRepository, userRepository);
const UserInformationController = new userInformationController(userInformationService);
export { UserInformationController, userInformationService, userInformationRepository };
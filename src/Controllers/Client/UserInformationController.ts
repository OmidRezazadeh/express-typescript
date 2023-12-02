import { Request, Response, NextFunction } from "express";
import { UserInformationService } from "../../Services/UserInformationService";
import { UserInformationRepository } from "../../Repositories/UserInformationRepository";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../../Repositories/UserRepository";

class userInformationController {
    private userInformationService: UserInformationService;
    constructor(userInformationService: UserInformationService) {
        this.userInformationService = userInformationService;
    }
    update = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);

        const email = decodedToken.user.email;
        const data = { link: req.body.link, bio: req.body.bio, image: req.body.image };
        const userInformation = await this.userInformationService.findUserInformationByEmail(email);
        const updateUserInformation = await this.userInformationService.updateUserInformation(userInformation,data);

    }

}
const userInformationRepository = new UserInformationRepository()
const userRepository = new UserRepository();
const userInformationService = new UserInformationService(userInformationRepository, userRepository);
const UserInformationController = new userInformationController(userInformationService);
export { UserInformationController, userInformationService, userInformationRepository };
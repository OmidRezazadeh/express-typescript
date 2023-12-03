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

    // Controller method to update user information
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get and decode the token from the request header
            const token = getDecodedToken(req.get('Authorization'));

            // Prepare data to be updated (with optional fields)
            const data = {
                link: req.body.link || null,
                bio: req.body.bio || null,
                image: req.body.image || null
            };

            // Validate user information data received in the request
            await this.userInformationService.validateUserInformation(data);

            // Find user information by email from the decoded token
            const userInformation = await this.userInformationService.findUserInformationByEmail(token.user.email);

            // Validate user image and ensure it's valid for update
            await this.userInformationService.validateUserInformationImage(data.image, userInformation);

            // Update user information based on the data received
            await this.userInformationService.updateUserInformation(userInformation, data);

            // Send success response if everything is updated successfully
            res.status(200).json({ "message": "success user information update" });
        } catch (error) {
            // Forward error to Express error handler middleware
            next(error);
        }
    }
}

// Instantiate repositories and services
const userInformationRepository = new UserInformationRepository()
const userRepository = new UserRepository();
const userInformationService = new UserInformationService(userInformationRepository, userRepository);

// Instantiate userInformationController with userInformationService
const UserInformationController = new userInformationController(userInformationService);

export { UserInformationController, userInformationService, userInformationRepository };

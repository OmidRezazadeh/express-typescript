import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../Repositories/UserRepository";
import { UserService } from '../../Services/UserService';
import { ConfirmationCodeService } from "../../Services/ConfirmationCodeService";
import { ConfirmationCodeRepository } from "../../Repositories/ConfirmationCodeRepository";
import { UserInformationRepository } from "../../Repositories/UserInformationRepository";
import { UserInformationService } from "../../Services/UserInformationService";

// Controller handling user-related operations
class userController {
  private userService: UserService;
  private confirmationCodeService: ConfirmationCodeService;
  private userInformationService: UserInformationService


  // Constructor to initialize the UserService
  constructor(
    userService: UserService,
    confirmationCodeService: ConfirmationCodeService,
    userInformationService: UserInformationService
  ) {
    this.userService = userService;
    this.confirmationCodeService = confirmationCodeService;
    this.userInformationService = userInformationService;
  }

  // Method to handle user registration
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const data = req.body;

      // // Validating user data before creating a new user
      await this.userService.validation(data);
      const user = await this.userService.create(data);
      const userInformation = await this.userInformationService.create(user._id, data);
      await this.userService.updateUser(userInformation._id,user);

      //Sending a successful response with the created user data
        await userInformation.populate('user');
      res.status(201).json({userInformation});
    } catch (err) {

      next(err);
      // Passing any errors to the error handling middleware
    }
  }

  // Method to handle user login
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { email: req.body.email, password: req.body.password };
      // Validating login data before attempting authentication
      await this.userService.validationLogin(data);
      // Authenticating user and generating a token upon successful login
      const token = await this.userService.auth(data);
      // Sending the generated token in the response
      res.status(200).json({ "token": token });
    } catch (err) {
      next(err); // Passing any errors to the error handling middleware
    }
  }
  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email;
      await this.confirmationCodeService.validationConfirmationCode(req.body.code, email);
      const data = { email, password: req.body.password };
      await this.userService.updatePassword(data);
      res.status(200).json({ "message": "success" });

    } catch (err) {
      console.log(err);
      next(err);
    }
  }



}

// Creating instances of UserRepository and UserService
const userRepository = new UserRepository();
const userInformationRepository = new UserInformationRepository();
const confirmationCodeRepository = new ConfirmationCodeRepository();
const userService = new UserService(userRepository);
const userInformationService = new UserInformationService(userInformationRepository,userRepository);
const confirmationCodeService = new ConfirmationCodeService(userRepository, confirmationCodeRepository);
// Creating an instance of the UserController and exporting it
const UserController = new userController(userService, confirmationCodeService, userInformationService);

export { userRepository, userService, UserController };

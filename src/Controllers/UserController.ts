import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../Repositories/UserRepository";
import { UserService } from '../Services/UserService';
import { ConfirmationCodeService } from "../Services/ConfirmationCodeService";
import { ConfirmationCodeRepository } from "../Repositories/ConfirmationCodeRepository";
// Controller handling user-related operations
class userController {
  private userService: UserService;
  private confirmationCodeService: ConfirmationCodeService;


  // Constructor to initialize the UserService
  constructor(
    userService: UserService,
    confirmationCodeService: ConfirmationCodeService,
  ) {
    this.userService = userService;
    this.confirmationCodeService = confirmationCodeService;
  }

  // Method to handle user registration
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      // Validating user data before creating a new user
      await this.userService.validation(data);
      const user = await this.userService.create(data);

      // Sending a successful response with the created user data
      res.status(201).json(user);
    } catch (err) {
      next(err); // Passing any errors to the error handling middleware
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
      await this.userService.updatePassword(req.body.password, email);
      res.status(200).json({ "message": "success" });

    } catch (err) {
      next(err);
    }
  }



}

// Creating instances of UserRepository and UserService
const userRepository = new UserRepository();
const confirmationCodeRepository = new ConfirmationCodeRepository();
const userService = new UserService(userRepository);
const confirmationCodeService = new ConfirmationCodeService(userRepository, confirmationCodeRepository);
// Creating an instance of the UserController and exporting it
const UserController = new userController(userService, confirmationCodeService);

export { userRepository, userService, UserController };

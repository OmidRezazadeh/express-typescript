import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../Repositories/UserRepository";
import { UserService } from '../Services/UserService';

// Controller handling user-related operations
class userController {
  private userService: UserService;

  // Constructor to initialize the UserService
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Method to handle user registration
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      // Validating user data before creating a new user
      await this.userService.validation(data);
      const user = await this.userService.create(data);
      console.log(user);
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
      res.status(200).json({"token": token});
    } catch (err) {
      next(err); // Passing any errors to the error handling middleware
    }
  }
}

// Creating instances of UserRepository and UserService
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

// Creating an instance of the UserController and exporting it
const UserController = new userController(userService);

export { userRepository, userService, UserController };

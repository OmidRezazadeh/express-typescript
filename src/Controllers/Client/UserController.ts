import { Request, Response, NextFunction } from "express";
import mongoose, { Document, ClientSession } from 'mongoose';
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

  // Open a session
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction(); // Start a transaction using the session

  try {
    const data = req.body;

    // Validating user data before creating a new user
    await this.userService.validation(data);

    // Creating a new user using the user service and within the session
    const user = await this.userService.create(data, session);

    // Creating user information associated with the user
    const userId = (user as any)._id;
    const userInformation = await this.userInformationService.create(userId, data, session);

    // Updating user data with the user information
    const userInformationId = (userInformation as any)._id;
    await this.userService.updateUser(userInformationId, user, session);

    // Commit the transaction after successful operations
    await session.commitTransaction();
    session.endSession();

    // Sending a successful response with the created user data
    res.status(201).json({ "userInformation": userInformation, "user": user });
  } catch (err) {
    // If an error occurs, abort the transaction and pass the error to the error handling middleware
    await session.abortTransaction();
    next(err);
  } finally {
    // End the session after the transaction is completed or aborted
    session.endSession();
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
const userInformationService = new UserInformationService(userInformationRepository, userRepository);
const confirmationCodeService = new ConfirmationCodeService(userRepository, confirmationCodeRepository);
// Creating an instance of the UserController and exporting it
const UserController = new userController(userService, confirmationCodeService, userInformationService);

export { userRepository, userService, UserController };

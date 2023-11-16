import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../Repositories/UserRepository";
import { UserService } from '../Services/UserService';



class userController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const data = req.body;
      await this.userService.validation(data);
      const user = await this.userService.create(data);
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { email: req.body.email, password: req.body.password };
      await this.userService.validationLogin(data);
     const token = await this.userService.auth(data); 
     res.status(200).json({"token":token});
    } catch (err) {
      next(err);
    }

  }
}
const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const UserController = new userController(userService);

export { userRepository, userService, UserController };
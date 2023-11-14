import { UserService } from '../Services/UserService';

import { UserRepository } from "../Repositories/UserRepository";
import { Request, Response,NextFunction } from "express";
import bcrypt from "bcrypt";

class userController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response,next: NextFunction) => {

try{
     await this.userService.validation(req.body);
  }catch(err){
    next(err);
  }
  }
  login = async (req: Request, res: Response) => {
    const data={
      email: req.body.email,
      password: req.body.password
    }

  }
}
const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const UserController = new userController(userService);

export { userRepository, userService, UserController };
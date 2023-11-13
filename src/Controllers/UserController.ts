import { UserService } from '../Services/UserService';
import { userValidate } from "../Validations/UserValidate";
import {UserRepository} from "../Repositories/UserRepository";
import { Request, Response } from "express";
 class userController {
    private userService: UserService;

    constructor(userService: UserService) {
      this.userService = userService;
    }

      store = async (req: Request, res: Response)=> {
       
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const { error } = userValidate.validate(req.body);
       
        if (error) {
            res.status(400).json(error.message)
       
        } else {
            const newUser = await this.userService.createUser(data);
            res.json(newUser);
          
        }
    }
}
const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const UserController = new userController(userService);

export { userRepository, userService, UserController };
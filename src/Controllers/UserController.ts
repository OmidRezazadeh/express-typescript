import { UserService } from '../Services/UserService';
import { userValidate } from "../Validations/UserValidate";
import { Request, Response } from "express";
 class UserController {
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


export {UserController};
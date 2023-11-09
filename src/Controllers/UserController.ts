import { userService } from "../Services/UserService";
import { userValidate } from "../Validations/UserValidate";
import { Request, Response } from "express";

class userController {
    store = async (req: Request, res: Response) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const { error } = userValidate.validate(req.body);
        if (error) {
            res.status(400).json(error.message)
        } else {
            const user = await userService.create(data);
            res.status(201).json(user);
        }
    }
}
export const UserController = new userController()

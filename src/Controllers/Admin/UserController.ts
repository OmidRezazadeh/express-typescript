import { Request, Response, NextFunction } from "express";
import { UserService } from "../../Services/UserService";
import { UserRepository } from "../../Repositories/UserRepository";

class usersController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async list(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    try {
      if (userId) {
        const user = await this.userService.findById(userId);
        if (user) {
          return res.status(200).json({ user: user });
        } else {
          return res.status(404).json({ message: " کاربری یافت نشده" });
        }
    }
        const data = req.body;
        const reqData= req.query;
        const users = await this.userService.list(data ,reqData);
        return res.status(200).json({ users: users });
      
    } catch (error) {
        next(error)
    }
  }
}
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const UsersController = new usersController(userService);
export { userRepository, userService, UsersController };

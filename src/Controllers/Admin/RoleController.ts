import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../Services/RoleService";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { UserRepository } from "../../Repositories/UserRepository";
import { UserService } from "../../Services/UserService";

class roleController {
    private roleService: RoleService;
    private userService: UserService
    constructor(
        roleService: RoleService,
        userService: UserService

    ) {
        this.roleService = roleService;
        this.userService = userService;
    }
    assignRole = async (req: Request, res: Response, next: NextFunction) => {
       

        try {  
            const userId = req.params.id;
            await this.userService.findById(userId);
            const data = req.body;
            await this.roleService.validateAssignRole(data);
            await this.roleService.assignRole(data, userId);
            res.status(201).json({"message":" بروز رسانی با موفقیت انجام شد"});
        } catch (error) {
            next(error);
        }
    }

    store = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const data = req.body;
            await this.roleService.storeValidate(data);
            const role = await this.roleService.store(data);
            res.status(201).json({ "role": role });
        } catch (error) {
            next(error);
        }
    }
}

const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository, userRepository);
const RoleController = new roleController(roleService, userService);
export { roleRepository, roleService, RoleController }
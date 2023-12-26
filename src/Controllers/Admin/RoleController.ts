import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../Services/RoleService";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { UserRepository } from "../../Repositories/UserRepository";
class roleController {
    private roleService: RoleService;
    constructor(roleService: RoleService) {
        this.roleService = roleService;
    }
    assignRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            await this.roleService.validate(data);
            await this.roleService.assignRole(data);

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
const roleService = new RoleService(roleRepository, userRepository);
const RoleController = new roleController(roleService);
export { roleRepository, roleService, RoleController, }
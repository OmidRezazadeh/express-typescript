import { Request, Response, NextFunction } from "express";
import {RoleService} from "../../Services/RoleService";
class RoleController {
   private roleService:RoleService;
   constructor(roleService:RoleService){
    this.roleService= roleService;
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

}
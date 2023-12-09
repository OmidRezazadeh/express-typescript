import { RoleInterface } from "../interface/RoleInterface";
import { Role } from "../Models/Role";
export class RoleRepository implements RoleInterface {
    async findByName(name: string): Promise<any> {
        const role = await Role.findOne({ name });
        return role;
    }
}
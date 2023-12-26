import { RoleInterface } from "../interface/RoleInterface";
import { Role } from "../Models/Role";
export class RoleRepository implements RoleInterface {
    async findByName(name: string): Promise<any> {
        const role = await Role.findOne({ name });
        return role;
    }
    async store(data: any) {
        try {
            const role = await Role.create(data);
            return role;
        } catch (error) {
            throw new Error(`Error creating role in the repository: ${error.message}`);
        }
    }
}
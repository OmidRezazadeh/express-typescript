import { assignRole } from "../Validations/RoleValidate"
import { RoleRepository } from "../Repositories/RoleRepository";
import { UserRepository } from "../Repositories/UserRepository";


export class RoleService {
    private roleRepository: RoleRepository;
    private userRepository: UserRepository;
    constructor(
        roleRepository: RoleRepository,
        userRepository: UserRepository
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    async validate(data: any) {

        const roleExists = await this.roleRepository.findByName(data.role);
        if (!roleExists) {
            const roleError = new Error("نقشی یافت نشد");
            (roleError as any).status = 400;
            throw roleError;
        }

        const { error } = assignRole.validate(data.role);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw error;
        }
        const userExit = await this.userRepository.findById(data.user_id);
        if (!userExit) {
            const roleError = new Error("نقشی یافت نشد");
            (roleError as any).status = 400;
            throw roleError;
        }
    }

    async storeValidate(data: any) {
        const roleExists = await this.roleRepository.findByName(data.role);
        if (roleExists) {
            const roleError = new Error(" این نقش موجود میباشد");
            (roleError as any).status = 400;
            throw roleError;
        }

        const { error } = assignRole.validate(data.role);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw error;
        }

    }

    async store(data: any) {
        const role = await this.roleRepository.store(data);
        return role;

    }
    async assignRole(data: any) {
        await this.userRepository

    }

}
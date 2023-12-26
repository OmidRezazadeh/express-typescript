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
    async validateAssignRole(data: any) {
        // Extract the role IDs from the data
        const roleIdes = data.roles;
      
        // Iterate through each role ID
        for (let roleId of roleIdes) {
          // Check if the role exists in the repository
          const roleExists = await this.roleRepository.findById(roleId);
          
          // If the role doesn't exist, throw an error
          if (!roleExists) {
            const roleError = new Error("نقشی یافت نشد");
            (roleError as any).status = 400;
            throw roleError;
          }
        }
      }
    
      async storeValidate(data: any) {
        // Check if the role already exists in the repository
        const roleExists = await this.roleRepository.findByName(data.role);
        if (roleExists) {
            const roleError = new Error(" این نقش موجود میباشد");
            (roleError as any).status = 400;
            throw roleError;
        }
      
        // Validate the role data
        const { error } = assignRole.validate(data.role);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw error;
        }
      }
      
      async store(data: any) {
        // Store the role data in the repository
        const role = await this.roleRepository.store(data);
        return role;
      }
      
      async assignRole(data: any, userId: any) {
        // Update the role for the user in the repository
        await this.userRepository.updateRole(data,userId);
      }

}
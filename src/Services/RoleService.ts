import { assignRole } from "../Validations/RoleValidate";
import { RoleRepository } from "../Repositories/RoleRepository";
import { UserRepository } from "../Repositories/UserRepository";


export class RoleService {
  private roleRepository: RoleRepository;
  private userRepository: UserRepository;
  constructor(roleRepository: RoleRepository, userRepository: UserRepository) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
  }

  async findById(roleId: string) {
   return await this.roleRepository.findById(roleId);

  }

  async list(data: any, reqData:any) {
    return await this.roleRepository.list(data,reqData);
  }
  // Validate and edit data for a given role
  async editValidate(data: object, roleId: string) {
    // Retrieve the role by ID from the repository
    const role = await this.roleRepository.findById(roleId);

    // Check if the role exists
    if (!role) {
      // If the role does not exist, throw an error indicating it was not found
      const roleError = new Error("نقشی یافت نشد"); // Error message in Persian
      (roleError as any).status = 400; // Set a status code for the error
      throw roleError; // Throw the error to be handled by the caller
    }

    // Extract the role name from the provided data object
    const roleName = Object.values(data)[0];

    // Check if the provided role name matches the existing role's name
    if (role.name === roleName) {
      // If the role name matches, throw an error indicating the role already exists
      const roleNameError = new Error(" این نقش در سیستم وجود دارد"); // Error message in Persian
      (roleNameError as any).status = 400; // Set a status code for the error
      throw roleNameError; // Throw the error to be handled by the caller
    }

    // Validate the data using the 'assignRole' validation schema
    const { error } = assignRole.validate(data);

    // If validation fails, throw an error with the validation details
    if (error) {
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400; // Set a status code for the error
      throw error; // Throw the error to be handled by the caller
    }
  }

  async edit(data: object, roleId: string) {
    return this.roleRepository.update(data, roleId);
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
    await this.userRepository.updateRole(data, userId);
  }
}

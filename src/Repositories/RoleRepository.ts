import { RoleInterface } from "../interface/RoleInterface"; // Importing the RoleInterface
import { Role } from "../Models/Role"; // Importing the Role model

export class RoleRepository implements RoleInterface {
  // Implementing the findByName method defined in RoleInterface
  async findByName(name: string): Promise<any> {
    // Finding a role by its name using the Role model
    const role = await Role.findOne({ name: name });
    return role; // Returning the found role
  }

  // Implementing the findById method defined in RoleInterface
  async findById(roleId: string): Promise<any> {
    // Finding a role by its ID using the Role model
    const role = await Role.findById({ _id: roleId });
    return role; // Returning the found role
  }

  // Implementing the store method to create a new role
  async store(data: any) {
    try {
      // Creating a new role using the Role model and the provided data
      const role = await Role.create(data);
      return role; // Returning the created role
    } catch (error) {
      // Throwing an error if there's an issue creating the role
      throw new Error(
        `Error creating role in the repository: ${error.message}`
      );
    }
  }
  async update(data: object, roleId: string) {
    console.log(data, roleId);

    await Role.findOneAndUpdate({_id:roleId},data,{new: true});
  }
}

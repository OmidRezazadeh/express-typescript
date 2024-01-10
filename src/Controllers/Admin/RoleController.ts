import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../Services/RoleService";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { UserRepository } from "../../Repositories/UserRepository";
import { UserService } from "../../Services/UserService";

class roleController {
  private roleService: RoleService;
  private userService: UserService;
  constructor(roleService: RoleService, userService: UserService) {
    this.roleService = roleService;
    this.userService = userService;
  }
  assignRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract user ID from request parameters
      const userId = req.params.id;

      // Find user by ID
      await this.userService.findById(userId);

      // Extract data from request body
      const data = req.body;

      // Validate the assigned role
      await this.roleService.validateAssignRole(data);

      // Assign role to the user
      await this.roleService.assignRole(data, userId);

      // Send success response
      res.status(201).json({ message: " بروز رسانی با موفقیت انجام شد" });
    } catch (error) {
      // Pass any errors to the next middleware
      console.log(error);
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extracting data from the request body
      const data = req.body;

      // Validating the data using the roleService's storeValidate method
      await this.roleService.storeValidate(data);

      // Storing the role using the roleService's store method
      const role = await this.roleService.store(data);

      // Sending a success response with the stored role in JSON format
      res.status(201).json({ role: role });
    } catch (error) {
      // If any error occurs during the process, passing it to the error handler middleware
      next(error);
    }
  };

  // Handler for editing a role
  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract data from the request body and the role ID from request parameters
      const data = req.body;
      const roleId = req.params.id;
   

      // Validate the data for editing the role using the editValidate method from roleService
      await this.roleService.editValidate(data, roleId);

      // If validation succeeds, perform the actual edit operation using the edit method from roleService
      const role = await this.roleService.edit(data, roleId);

      // Respond with a success message upon successful editing
      res.status(201).json({ role: role });
    } catch (error) {
      // If an error occurs during the editing process, pass it to the error handling middleware
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    const RoleId = req.params.id;

    try {
      if (RoleId) {
        const role = await this.roleService.findById(RoleId);
        if (role) {
          return res.status(200).json({ role: role });
        } else {
          // If role is not found, send a 404 Not Found response
          return res.status(404).json({ message: " نقشی یافت نشده" });
        }
      }
      const data = req.body;
      const reqData= req.query;
      const roles = await this.roleService.list(data ,reqData);

      return res.status(200).json({ roles: roles });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository, userRepository);
const RoleController = new roleController(roleService, userService);
export { roleRepository, roleService, RoleController };

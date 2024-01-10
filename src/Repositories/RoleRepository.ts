import { RoleInterface } from "../interface/RoleInterface"; // Importing the RoleInterface
import { Role } from "../Models/Role"; // Importing the Role model
import {paginate} from "../utils/paginate"; // Importing the

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
    return await Role.findOneAndUpdate({ _id: roleId }, data, { new: true });
  }

  
  async list(data: any, reqData: any) {
    try {
      // Fetch total count of documents in the Role collection
      const totalCount = await Role.countDocuments({});
  
      let query: any = {};
      // Check if 'name' field exists in the data object and create a query for case-insensitive name search
      if (data.name !== undefined) {
        const regex = new RegExp(`^${data.name}.*|.*${data.name}.*$`, 'i');
        query = { 'name': regex };
      }
  
     const paginateData= paginate(reqData,totalCount);
      // Fetch paginated items based on the query, skipping items based on startIndex, limiting by pageSize, and sorting by _id in descending order
      const paginatedItems = await Role.find(query)
        .skip(paginateData['startIndex'])
        .limit(paginateData['pageSize'])
        .sort({ _id: -1 })
        .exec();
  
      // Calculate total number of pages for pagination  
      // Prepare response object containing pagination information and fetched data
      const response = {
        page:paginateData['page'],
        total_pages: paginateData['totalPages'],
        data:paginatedItems,
      };
      return response; // Return the response object
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
    }
  }
}

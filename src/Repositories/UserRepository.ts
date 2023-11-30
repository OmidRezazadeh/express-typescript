import { IUsers, User } from "../Models/User";
import { UserInterface } from "../interface/UserInterFace";

// UserRepository implements the UserInterface
export class UserRepository implements UserInterface {

  // Method to create a new user
  async create(data: any) {
    try {

      const user = await User.create(data); // Create a new user using the User model
      return user; // Return the created user object
    } catch (error) {
      // If an error occurs during user creation, throw an error with a specific message
      throw new Error(`Error creating user in the repository: ${error.message}`);
    }
  }

  // Method for user login (currently doesn't return anything)
  async login(data: any): Promise<any> {
    console.log("ok"); // Placeholder - currently logs "ok" but doesn't perform login logic
  }

  async updatePassword(password: string, email: string): Promise<any> {
    try {
      const user = await User.findOne({ email }); // Find a user in the database by their email
      user.password = password;
      user.save();
      return user;
    } catch (err) {
      console.log(err)
    }
  }

  // Method to find a user by their email
  async findByEmail(email: string): Promise<IUsers | null> {
    try {
      const user = await User.findOne({ email }); // Find a user in the database by their email
      return user; // Return the found user or null if not found
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
      return null; // Return null in case of an error
    }
  }
}

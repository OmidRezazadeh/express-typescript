import { IUsers, User } from "../Models/User";
import { UserInterface } from "../interface/UserInterFace";

// UserRepository implements the UserInterface
export class UserRepository implements UserInterface {

  async updateUser(userInformationId: string, user: any, session: any) {
    try {
      // user.userInformation = userInformationId;
      const userInformation = { userInformation: userInformationId };
      // const updateUser = await user.save({ session: session });
      const updateUser = await User.updateOne({ _id: user._id }, userInformation).session(session)
      return updateUser
    } catch (error) {
      throw new Error(`Error creating user in the repository: ${error.message}`);
    }
  }
  // Method to create a new user
  async create(data: any, session: any) {
    try {

      const user = await User.create([data], { session: session }); // Create a new user using the User model
      return user; // Return the created user object
    } catch (error) {
      // If an error occurs during user creation, throw an error with a specific message
      throw new Error(`Error creating user in the repository: ${error.message}`);
    }
  }


  async findById(userId: any): Promise<any> {
    try {
      const user = await User.findOne({ _id: userId }); // Find a user in the database by their email
      return user; // Return the found user or null if not found
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
    }

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


  async findUserInformationByEmail(email: string) {
    try {
      const userInformation = await User.findOne({ email }).populate("userInformation"); // Find a user in the database by their email
      return userInformation; // Return the found user or null if not found
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
      return null; // Return null in case of an error
    }
  }
}

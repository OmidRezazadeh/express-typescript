import { UserInformation } from "../Models/UserInformation";
import { UserInformationInterface } from "../interface/UserInformationInterface";
export class UserInformationRepository implements UserInformationInterface {
  async create(data: any) {
    try {

      const userInformation = await UserInformation.create(data); // Create a new UserInformation using the UserInformation model
      return userInformation; // Return the created UserInformation object
    } catch (error) {
      // If an error occurs during user creation, throw an error with a specific message
      throw new Error(`Error creating user information  in the repository: ${error.message}`);
    }
  }

  async update(userInformation: any, data: any) {
    userInformation.link = data.link;
    userInformation.bio = data.bio;
    userInformation.image = data.image;
    const updateUserInformation = await userInformation.save();
    return updateUserInformation;

  }
}
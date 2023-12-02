import { UserInformationRepository } from "../Repositories/UserInformationRepository";
import fs from 'fs';
import { tempImage, destinationFolder } from "../configs/config";
import path from 'path';
import { UserRepository } from "../Repositories/UserRepository";
import { User } from "../Models/User";

export class UserInformationService {
    private userInformationRepository: UserInformationRepository;
    private userRepository: UserRepository;
    constructor(
        userInformationRepository: UserInformationRepository,
        userRepository: UserRepository
    ) {
        this.userInformationRepository = userInformationRepository;
        this.userRepository = userRepository;
    }

    // Method to move user image from temporary location to a destination folder
    async moveUserImage(imageName: string) {
        const tempImagePath = path.join(tempImage, imageName); // Path to temporary image
        const destinationFolderPath = path.join(destinationFolder, imageName); // Destination path for the image

        if (fs.existsSync(tempImagePath)) {
            // Read the image file from the temporary location
            fs.readFile(tempImagePath, (err, data) => {
                if (err) {
                    // Handle error if image file cannot be read
                    const errorExists = new Error("Requested image not found");
                    (errorExists as any).status = 400; // Setting a custom status code
                    throw errorExists;
                }

                // Write the image data to the destination folder
                fs.writeFile(destinationFolderPath, data, (err) => {
                    if (err) {
                        // Handle error if the image cannot be moved to the destination folder
                        const errorMove = new Error("Error uploading image");
                        (errorMove as any).status = 400; // Setting a custom status code
                        throw errorMove;
                    }
                });
            });
        }

        // Remove the image from the temporary location after moving it
        fs.unlinkSync(tempImagePath);
    }

    // Method to create user information
    async create(userId: any, data: any) {
        // Move the user image to the destination folder
        this.moveUserImage(data.image);

        // Create new user information object
        const newUserInformation = { phone: data.phone, user: userId, image: data.image };

        // Save user information using the repository
        const userInformation = await this.userInformationRepository.create(newUserInformation);

        return userInformation; // Return created user information
    }

    async findUserInformationByEmail(email: string) {
        // const user = await this.userRepository.findByEmail(email);

        const userInformation = await this.userRepository.findUserInformationByEmail(email);
        return userInformation;
    }
    async updateUserInformation(userInformation: any, data: any) {
      
        const newUserInformation = await this.userInformationRepository.update(userInformation,data);


    }
}

import { UserInformationRepository } from "../Repositories/UserInformationRepository";
import fs from 'fs';
import { tempImage, destinationFolder } from "../configs/config";
import path from 'path';
import { UserRepository } from "../Repositories/UserRepository";
import { updateUserInformation } from "../Validations/UserInformationValidate";


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
                    const errorExists = new Error("عکسی یافت نشد");
                    (errorExists as any).status = 400; // Setting a custom status code
                    throw errorExists;
                }

                // Write the image data to the destination folder
                fs.writeFile(destinationFolderPath, data, (err) => {
                    if (err) {
                        // Handle error if the image cannot be moved to the destination folder
                        const errorMove = new Error("اپلود عکس با مشکل مواجه شده");
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
    async create(userId: any, data: any,session:any) {
        // Move the user image to the destination folder
        // this.moveUserImage(data.image);

        // Create new user information object
        const newUserInformation = { phone: data.phone, user: userId, image: data.image };

        // Save user information using the repository
        const userInformation = await this.userInformationRepository.create(newUserInformation,session);

        return userInformation; // Return created user information
    }

    async findUserInformationByEmail(email: string) {
        // Find user information by email from the repository
        const user = await this.userRepository.findUserInformationByEmail(email);
        return user.userInformation;
    }
    
    async validateUserInformationImage(imageName: string, userInformation: any) {
        if (imageName) {
            if (imageName !== userInformation.image) {
                // Operations if the imageName (new image) differs from the current user image
    
                const tempImagePath = path.join(tempImage, imageName); // Path to temporary image
    
                if (fs.existsSync(tempImagePath)) {
                    // Read the temporary image file
                    fs.readFile(tempImagePath, (err, data) => {
                        if (err) {
                            // Handle error if the image file cannot be read
                            const errorExists = new Error("عکسی یافت نشد"); // Image not found
                            (errorExists as any).status = 400; // Setting a custom status code
                            throw errorExists;
                        }
    
                        const destinationFolderPath = path.join(destinationFolder, imageName);
                        // Write the image data to the destination folder
                        fs.writeFile(destinationFolderPath, data, (err) => {
                            if (err) {
                                // Handle error if the image cannot be moved to the destination folder
                                const errorMove = new Error("اپلود عکس با مشکل مواجه شده"); // Image upload encountered an issue
                                (errorMove as any).status = 400; // Setting a custom status code
                                throw errorMove;
                            }
                        });
                    });
                }
    
                // Prepare a list of files to manage (delete, move)
                let fileList: string[] = [tempImagePath];
                if (userInformation.image) {
                    let userInformationImage = path.join(destinationFolder, userInformation.image);
                    fileList.push(userInformationImage);
                }
    
                // Delete each file in the fileList
                fileList.forEach((filePath) => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            // Log an error if deleting the file encounters an issue
                            console.error(`مشکلی در حذف عکس پیش  امده مجددا امتحان کنید ${filePath}: ${err}`);
                        } else {
                            console.log(`File ${filePath} has been deleted`);
                        }
                    });
                });
            }
        } else {
            // If there's no new image provided, but there's an existing image in userInformation, delete it
            if (userInformation.image) {
                const destinationFolderPath = path.join(destinationFolder, userInformation.image);
                fs.unlinkSync(destinationFolderPath);
            }
        }
    }
    
    async updateUserInformation(userInformation: any, data: any) {
        // Update user information using the repository
        await this.userInformationRepository.update(userInformation, data);
    }
    
    async validateUserInformation(data: any) {
        // Validate user information data
        const { error } = updateUserInformation.validate(data);
        if (error) {
            // If there's an error in validation, throw an error with a custom status code
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw error;
        }
    }
}    
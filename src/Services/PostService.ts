import { storeValidate } from "../Validations/PostValidate"; // Importing validation function
import { PostRepository } from "../Repositories/PostRepository"; // Importing PostRepository
import { checkImageValidity } from "../utils/checkImageValidity"; // Importing image validation function
import { tempImage, destinationFolderPost } from "../configs/config"; // Importing folder paths
import fs from 'fs'; // File system module
import path from 'path'; // Path module

export class PostService {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    
    // Method to move user image from temporary location to a destination folder
    async movePostImage(imageName: string) {
        const tempImagePath = path.join(tempImage, imageName); // Path to temporary image
        const destinationFolderPath = path.join(destinationFolderPost, imageName); // Destination path for the image

        if (fs.existsSync(tempImagePath)) {
            // Read the image file from the temporary location
            fs.readFile(tempImagePath, (err, data) => {
                // Write the image data to the destination folder
                fs.writeFile(destinationFolderPath, data, (err) => {
                    if (err) {
                        // Handle error if the image cannot be moved to the destination folder
                        const errorMove = new Error("Error encountered while uploading the image");
                        (errorMove as any).status = 400; // Setting a custom status code
                        throw errorMove;
                    }
                });
            });
        }

        // Remove the image from the temporary location after moving it
        fs.unlinkSync(tempImagePath);
    }

    // Validation function for incoming data
    async validate(data: any) {
        const { error } = storeValidate.validate(data); // Validating the incoming data
        if (error) {
            // Throw an error if validation fails
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw errors;
        }

        if (data.image) {
            checkImageValidity(data.image); // Check image validity if an image is provided
        }
    }

    // Method to create a new post
    async create(data: any, userId: string) {
        if(data.image){
            this.movePostImage(data.image); // Move the image if it exists in the data
        }
        const post = await this.postRepository.create(data, userId); // Create a post using the repository

        return post; // Return the created post
    }
}

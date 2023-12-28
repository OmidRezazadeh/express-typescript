import { storeValidate } from "../Validations/PostValidate";
import { PostRepository } from "../Repositories/PostRepository";
import { checkImageValidity } from "../utils/checkImageValidity";
import { tempImage, destinationFolderPost } from "../configs/config";
import fs from 'fs';
import path from 'path';


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

    async validate(data: any) {
    
        const { error } = storeValidate.validate(data);
        if (error) {
            const errors = new Error(error.details[0].message);
            (errors as any).status = 400;
            throw errors;
        }

        if (data.image) {
            checkImageValidity(data.image);
        }
        

    }


    async create(data: any, userId: string) {
        if(data.image){
           this.movePostImage(data.image)
        }
        const post = await this.postRepository.create(data,userId);

        return post;
    
    }


}
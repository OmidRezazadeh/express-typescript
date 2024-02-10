import { storeValidate } from "../Validations/PostValidate"; // Importing validation function
import { PostRepository } from "../Repositories/PostRepository"; // Importing PostRepository
import { checkImageValidity } from "../utils/checkImageValidity"; // Importing image validation function
import { tempImage, destinationFolderPost } from "../configs/config"; // Importing folder paths
import fs from "fs"; // File system module
import path from "path"; // Path module
import { ObjectId } from "mongoose";

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
        if (err) {
          // Handle error if the image cannot be read
          // Handle error appropriately
        } else {
          // Write the image data to the destination folder
          fs.writeFile(destinationFolderPath, data, (err) => {
            if (err) {
              // Handle error if the image cannot be moved to the destination folder
              const errorMove = new Error(
                "Error encountered while uploading the image"
              );
              (errorMove as any).status = 400; // Setting a custom status code
              // Handle the error appropriately
            } else {
              // Remove the image from the temporary location after moving it
              fs.unlink(tempImagePath, (err) => {
                if (err) {
                  // Handle error if the image cannot be removed from the temporary location
                  // Handle the error appropriately
                }
                // Handle success, if needed
              });
            }
          });
        }
      });
    }
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
    if (data.image) {
      this.movePostImage(data.image); // Move the image if it exists in the data
    }
    const post = await this.postRepository.create(data, userId); // Create a post using the repository
    // Return the created post
    return post;
  }
  
  async updateValidate(data:any,postId:string, userId:string) {
    const post=await this.postRepository.findById(postId);

    if(!post){
      const errorPost = new Error('پستی با این ایدی یافت نشده ');
      (errorPost as any).status = 400;
      throw errorPost;
    }

   if(post.user.toString() !== userId){
    const errorPost = new Error('شما نمی توانید این پست را اپدین  کنید ');
    (errorPost as any).status = 400;
    throw errorPost;
   }


    const { error } = storeValidate.validate(data); // Validating the incoming data
    if (error) {
      // Throw an error if validation fails
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400;
      throw errors;
    }



    
  }
    // Method to create a new post
    async update(data: any, postId: string) {
      if (data.image) {
        this.movePostImage(data.image); // Move the image if it exists in the data
      }
      const post = await this.postRepository.update(data, postId); // Create a post using the repository
      // Return the created post
      return post;
    }


}

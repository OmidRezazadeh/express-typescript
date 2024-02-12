import { Post } from "../Models/Post"; // Importing the Post model
import { PostInterface } from "../interface/PostInterface"; // Importing the PostInterface

export class PostRepository implements PostInterface {
  // Implementing the create method defined in PostInterface
  async create(data: any, userId: string): Promise<any> {
    // Creating postData object with properties from 'data' and 'userId'
    const postData = {
      description: data.description,
      title: data.title,
      image: data.image,
      user: userId,
    };

    // Creating a new post using the Post model and the postData
    const post = await Post.create(postData);

    // Populating the 'user' field in the post
    // Note: populate() might not work directly on post, depending on the ORM or library used
    // It usually works on queries rather than single objects
    // Returning the populated post
    await post.populate("user", "_id name email");
    return post;
  }
  async update(data: any, postId: string) {
    // Log the postId for debugging purposes
    console.log(postId);

    // Find and update the post using findOneAndUpdate, returning the updated post
    const post = await Post.findOneAndUpdate({ _id: postId }, data, {
      new: true, // Return the modified document rather than the original
    });
    
    // Return the updated post
    return post;
  }
  
// Async method to find a post by its ID
async findById(postId: string) {
  // Use findById to retrieve the post with the specified ID
  return await Post.findById(postId);
}

//Async method to "soft delete" a post by updating its deletedAt field
async delete(postId: string) {
  // Find and update the post by setting its deletedAt field to the current date
  await Post.findByIdAndUpdate(
    { _id: postId },
    { deletedAt: new Date() },
    { new: true } // Return the modified document rather than the original
  );
}
}

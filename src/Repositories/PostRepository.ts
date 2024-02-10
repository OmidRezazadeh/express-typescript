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
        }

        // Creating a new post using the Post model and the postData
        const post = await Post.create(postData);

        // Populating the 'user' field in the post
        // Note: populate() might not work directly on post, depending on the ORM or library used
        // It usually works on queries rather than single objects
        // Returning the populated post
        await post.populate('user', '_id name email');
        return post;
    }
    async update(data:any, postId:string){
        console.log(postId);

      const post=  await Post.findOneAndUpdate(
        {_id:postId},
        data,
        { new: true }
      );
      return post;
    }
    
    async findById(postId:string){
        return await Post.findById(postId);
    }
    
}

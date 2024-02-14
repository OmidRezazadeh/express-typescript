import { PostService } from "Services/PostService";
import { Post } from "../Models/Post"; // Importing the Post model
import { PostInterface } from "../interface/PostInterface"; // Importing the PostInterface
import {paginate} from "../utils/paginate"; // Importing the


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
    // Find and update the post using findOneAndUpdate, returning the updated post
    const post = await Post.findOneAndUpdate({ _id: postId }, data, {
      new: true, // Return the modified document rather than the original
    });

    // Return the updated post
    return post;
  }
  async retrievePostByIdForUser(postId: string, userId: string) {
    return await Post.findOne({ _id: postId, user: userId });
  }
  async list(data: any, reqData: any) {
    try {
      // Get the total count of documents in the collection
      const totalCount = await Post.countDocuments({});
  
      // Initialize the query with a condition to filter out deleted items
      let query: any = { deletedAt: null };
  
      // Check if 'title' is provided in the 'data' object
      if (data.title !== undefined) {
        // Create a case-insensitive regular expression for 'title' matching
        const title = new RegExp(`^${data.title}.*|.*${data.title}.*$`, "i");
        // Update the query with the 'title' condition
        query.title = title;
      }
  
      // Check if 'description' is provided in the 'data' object
      if (data.description !== undefined) {
        // Create a case-insensitive regular expression for 'description' matching
        const description = new RegExp(
          `^${data.description}.*|.*${data.description}.*$`,
          "i"
        );
        // Update the query with the 'description' condition
        query.description = description;
      }
  
      // Paginate the data based on the request parameters and total count
      const paginateData = paginate(reqData, totalCount);
  
      // Retrieve paginated items based on the constructed query
      const paginatedItems = await Post.find(query)
        .skip(paginateData['startIndex'])
        .limit(paginateData['pageSize'])
        .sort({ _id: -1 })
        .exec();
  
      // Create a response object with paginated data information
      const response = {
        page: paginateData['page'],
        total_pages: paginateData['totalPages'],
        data: paginatedItems,
      };
  
      // Return the response object
      return response;
    } catch (error) {
      // Log any errors that occur during the execution of the method
      console.log(error);
    }
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

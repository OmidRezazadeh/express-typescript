import { Request, Response, NextFunction, response } from "express"; // Importing Express types
import { PostService } from "../../Services/PostService"; // Importing PostService
import { getDecodedToken } from "../../utils/token"; // Importing token decoding function
import { PostRepository } from "../../Repositories/PostRepository"; // Importing PostRepository

class postController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Extracting necessary data from the request body
      const data = {
        image: req.body.image || null,
        title: req.body.title,
        description: req.body.description,
      };

      // Validating the extracted data
      await this.postService.validate(data);

      // Extracting user ID from the decoded token in the request header
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.user_id;

      // Creating a post using the PostService
      const post = await this.postService.create(data, userId);

      // Sending a success response with the created post
      res.status(201).json({ post: post });
    } catch (error) {
      // Forwarding any errors to the Express error handling middleware
      next(error);
    }
  }

  // This function is an asynchronous method to handle the update of a post
  async update(req: Request, res: Response, next: NextFunction) {
    // Extracting relevant data from the request body
    const data = {
      image: req.body.image || null,
      title: req.body.title,
      description: req.body.description,
    };

    // Extracting post ID from the request parameters
    const postId = req.params.id;

    try {
      // Extracting user ID from the decoded token in the Authorization header
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.user_id;

      // Validating the update request
      await this.postService.updateValidate(data, postId, userId);

      // Performing the actual update of the post
      const post = await this.postService.update(data, postId);

      // Responding with a success message and the updated post
      res
        .status(201)
        .json({ messages: "بروز رسانی با موفقیت انجام شد", post: post });
    } catch (error) {
      // Handling errors and passing them to the next middleware
      next(error);
    }
  }

  // Async function to handle the deletion of a post
  async delete(req: Request, res: Response, next: NextFunction) {
    // Extract post ID from request parameters
    const postId = req.params.id;

    // Get the user ID from the decoded token in the request header
    const token = getDecodedToken(req.get("Authorization"));
    const userId = token.user.user_id;

    try {
      // Validate if the user has the authority to delete the post
      await this.postService.deleteValidate(postId, userId);

      // If validation is successful, proceed with the deletion
      await this.postService.delete(postId);

      // Respond with a success message
      res.status(200).json({ message: "پست با موفقیت  حذف شد" });
    } catch (error) {
      // Handle errors by passing them to the Express error handling middleware
      next(error);
    }
  }

  // Handles the listing of posts based on request parameters
  async list(req: Request, res: Response, next: NextFunction) {
    // Extract post ID from request parameters
    const postId = req.params.id;
    // Decode the token to get the user ID from the authorization header
    const token = getDecodedToken(req.get("Authorization"));
    const userId = token.user.user_id;

    try {
      // Check if a specific post ID is provided
      if (postId) {
        // Retrieve a post by its ID for the specific user
        const post = await this.postService.retrievePostByIdForUser(
          postId,
          userId
        );

        // Check if the post is found and return the appropriate response
        if (post) {
          return res.status(200).json({ post });
        } else {
          return res.status(404).json({ message: "پستی یافت نشده" });
        }
      }

      // If no specific post ID is provided, proceed to list posts
      const data = req.body;
      const reqData = req.query;

      // Retrieve a list of posts based on provided data and request parameters
      const posts = await this.postService.list(data, reqData);

      // Return the list of posts in the response
      return res.status(200).json({ posts });
    } catch (error) {
      // Handle any errors that occur during the execution and pass them to the next middleware
      next(error);
    }
  }
}

// Creating instances of PostRepository and PostService
const postRepository = new PostRepository();
const postService = new PostService(postRepository);

// Creating an instance of postController and exporting it along with postRepository and postService
const PostController = new postController(postService);
export { PostController, postRepository, postService };

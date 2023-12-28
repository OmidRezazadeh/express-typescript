import { Request, Response, NextFunction } from "express"; // Importing Express types
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
                description: req.body.description
            };

            // Validating the extracted data
            await this.postService.validate(data);

            // Extracting user ID from the decoded token in the request header
            const token = getDecodedToken(req.get('Authorization'));
            const userId = token.user.user_id;

            // Creating a post using the PostService
            const post = await this.postService.create(data, userId);

            // Sending a success response with the created post
            res.status(201).json({ "post": post });
        } catch (error) {
            // Forwarding any errors to the Express error handling middleware
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

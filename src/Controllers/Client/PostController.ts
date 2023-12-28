import { Request, Response, NextFunction } from "express";
import { PostService } from "../../Services/PostService";
import { getDecodedToken } from "../../utils/token"
import { PostRepository } from "../../Repositories/PostRepository";
class postController {
    private postService: PostService;
    constructor(postService: PostService) {
        this.postService = postService;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const data = { image: req.body.image || null, title: req.body.title, description: req.body.description };
            await this.postService.validate(data);
            const token = getDecodedToken(req.get('Authorization'));
            console.log(token.user);
            const userId= token.user.user_id;
            const post = await this.postService.create(data,userId);
            res.status(201).json({ "post": post })

        } catch (error) {
            next(error);
     
        }

    }
}
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const PostController =new postController(postService);
export {PostController,postRepository,postService}
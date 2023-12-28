import { Post } from "../Models/Post";
import { PostInterface } from "../interface/PostInterface";

export class PostRepository implements PostInterface {
    async create(data: any, userId: string): Promise<any> {
        const postData={
            description:data.description,
            title:data.title,
            image:data.image,
            user:userId,
        }

        const post = await Post.create(postData);
        return post.populate('user');

    }
}
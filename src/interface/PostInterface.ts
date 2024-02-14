export interface PostInterface {
   create(data: any, userId: string): Promise<any>;
   delete(postId: string): Promise<any>;
   update(data:any, postId:string): Promise<any>;
   findById(postId:string): Promise<any>;
   retrievePostByIdForUser(postId:string,userId:string): Promise<any>;
   
}
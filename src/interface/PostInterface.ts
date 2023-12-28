export interface PostInterface {
   create(data: any, userId: string): Promise<any>;
}
import { IUsers } from '../Models/User';
export interface UserInterface {
  // getAll(): IUsers[];
  updatePassword(password: string,email: string): Promise<string>;
  create(data: any,session:any): Promise<any>;
  findById(userId: any): Promise<any>;
  findByEmail(email: string): Promise<IUsers | null>;
  findUserInformationByEmail(email: string): Promise<IUsers | null>;
  list(data:any,reqData:any) : Promise<any>;

}


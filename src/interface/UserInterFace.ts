import { IUsers } from '../Models/User';
export interface UserInterface {
  // getAll(): IUsers[];
  updatePassword(password: string,email: string): Promise<string>;
  create(data: any): Promise<any>;
  login(data: any): Promise<any>;
  findByEmail(email: string): Promise<IUsers | null>;


}


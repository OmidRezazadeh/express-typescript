import { IUsers } from '../Models/User';
export interface UserInterface {
  // getAll(): IUsers[];
  // getById(id: string): IUsers | undefined;
  create(data: any): Promise<any>;
  login(data: any): Promise<any>;
  findByEmail(email: string): Promise<IUsers | null>;

}


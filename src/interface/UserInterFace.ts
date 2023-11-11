import { IUsers}  from '../Models/User';
 export interface UserInterface {
  // getAll(): IUsers[];
  // getById(id: string): IUsers | undefined;
  create(data: any):Promise<any>;
  // update(id: string, data: IUsers): boolean;
  // delete(id: string): boolean;
}


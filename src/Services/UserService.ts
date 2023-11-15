
import { User, IUsers } from '../Models/User';
import { UserRepository } from '../Repositories/UserRepository';
import { userValidate } from "../Validations/UserValidate";
import bcrypt from "bcrypt";
export class UserService {

  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(data: any) {
    try{
      const password = await bcrypt.hash(data.password, 10);
      const userData = { name: data.name, email: data.email, password: password };
      const newUser = await this.userRepository.create(userData);
      return newUser;
    }catch(error){
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  async validation(data: any): Promise<any> {

      let email = data.email;
      const userExists = await this.userRepository.findByEmail(email);
      if (userExists) {
        const errorEmail = new Error('این ایمیل قبلا استفاده شده');
        (errorEmail as any).status = 400;
        throw errorEmail;
      }
      const { error } = userValidate.validate(data);
      if (error) {
        const errors = new Error(error.details[0].message);
        (errors as any).status = 400;
        throw errors;
      }
    
  }
   



  async login(data: any): Promise<any> {
    console.log("ok")
  }
}

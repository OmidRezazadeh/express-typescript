
import { User, IUsers } from '../Models/User';
import { UserRepository } from '../Repositories/UserRepository';
import { userValidate } from "../Validations/UserValidate";
export class UserService {

  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: any): Promise<any> {
    return await this.userRepository.create(data);
  }
  async validation(data: any): Promise<any> {

      let email = data.email;
      const userExists = await this.userRepository.findByEmail(email);
      if (userExists) {
        const errorMessage = new Error('این ایمیل قبلا استفاده شده');
        (errorMessage as any).status = 400;
        throw errorMessage;
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

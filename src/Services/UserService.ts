
import { User,IUsers } from '../Models/User';
import {UserRepository} from '../Repositories/UserRepository';
 export  class UserService {

  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

 async createUser(data: any): Promise<any> {
    return await this.userRepository.create(data);
  }
 }

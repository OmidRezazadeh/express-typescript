
import { User, IUsers } from '../Models/User';
import { UserRepository } from '../Repositories/UserRepository';
import { userValidate, validationLogin } from "../Validations/UserValidate";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from '../configs/config';
export class UserService {

  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(data: any) {
    try {
      const password = await bcrypt.hash(data.password, 10);
      const userData = { name: data.name, email: data.email, password: password };
      const newUser = await this.userRepository.create(userData);
      return newUser;
    } catch (error) {
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
  async validationLogin(data: any) {

    const { error } = validationLogin.validate(data);
    if (error) {
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400;
      throw errors;
    }



    let email = data.email;
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      const errorEmail = new Error('کاربری بااین ایمیل  یافت نشد');
      (errorEmail as any).status = 400;
      throw errorEmail;
    }
  }

  async auth(data: any) {
    const user = await this.userRepository.findByEmail(data.email);
    if (await bcrypt.compare(data.password, user.password)) {
      const token = jwt.sign({ user: { email: user.email, name: user.name }, }, config.JWT_SECRET, { expiresIn: "2h", });

      // // Step 5: Respond with the token and user ID
      return (token);
    } else {
      const error = new Error('کاربری بااین ایمیل یافت نشد');
      (error as any).status = 400;
      throw error;

    }
  }
}


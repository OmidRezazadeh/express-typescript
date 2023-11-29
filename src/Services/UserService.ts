import { UserRepository } from '../Repositories/UserRepository';
import { UserInformationRepository } from '../Repositories/UserInformationRepository';
import { userValidate, validationLogin, validationUpdatePassword } from "../Validations/UserValidate";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Service handling user-related operations
export class UserService {

  private userRepository: UserRepository;
  private userInformationRepository: UserInformationRepository;

  // Constructor to initialize the UserRepository
  constructor(
    userInformationRepository: UserInformationRepository,
    userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
    this.userInformationRepository = userInformationRepository;
  }

  // Method to create a new user
  async create(data: any) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

      // Hashing the password before storing it
      const password = await bcrypt.hash(data.password, 10);

      const userData = { name: data.name, email: data.email, password: password };
      // Creating a new user and returning the result
      const newUser = await this.userRepository.create(userData);
      const userInformationData = { user: newUser._id, phone: data.phone };
      const newUserInformation = await this.userInformationRepository.create(userInformationData)
      await session.commitTransaction();
      session.endSession();
      return newUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Method to validate user data (e.g., during registration)
  async validation(data: any): Promise<any> {
    let email = data.email;
    const userExists = await this.userRepository.findByEmail(email);

    // Checking if the email already exists in the database
    if (userExists) {
      const errorEmail = new Error('این ایمیل قبلا استفاده شده');
      (errorEmail as any).status = 400;
      throw errorEmail;
    }

    // Validating user data using a predefined schema
    const { error } = userValidate.validate(data);
    if (error) {
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400;
      throw errors;
    }
  }

  // Method to validate user login credentials
  async validationLogin(data: any) {
    const { error } = validationLogin.validate(data);
    if (error) {
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400;
      throw errors;
    }

    let email = data.email;
    const userExists = await this.userRepository.findByEmail(email);

    // Checking if the user exists during login
    if (!userExists) {
      const errorEmail = new Error('کاربری بااین ایمیل  یافت نشد');
      (errorEmail as any).status = 400;
      throw errorEmail;
    }
  }

  // Method for user authentication
  async auth(data: any) {
    const user = await this.userRepository.findByEmail(data.email);

    // Comparing the provided password with the stored hashed password
    if (await bcrypt.compare(data.password, user.password)) {
      // Generating a JWT token upon successful authentication
      const token = jwt.sign({ user: { email: user.email, name: user.name } }, process.env.JWT_SECRET, { expiresIn: "2h" });
      return token;
    } else {
      const error = new Error('کاربری بااین ایمیل یافت نشد');
      (error as any).status = 400;
      throw error;
    }
  }
  async updatePassword(data: any) {


    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      const errorUser = new Error('کاربری بااین ایمیل یافت نشد');
      (errorUser as any).status = 400;
      throw errorUser;
    }

    const { error } = validationUpdatePassword.validate(data);
    if (error) {
      const errors = new Error(error.details[0].message);
      (errors as any).status = 400;
      throw errors;
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    await this.userRepository.updatePassword(passwordHash, data.email);
  }

}

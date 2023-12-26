import { UserRepository } from '../Repositories/UserRepository';
import { UserInformationRepository } from '../Repositories/UserInformationRepository';
import { userValidate, validationLogin, validationUpdatePassword } from "../Validations/UserValidate";
import { tempImage, mimeTypeArray } from '../configs/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { string } from 'joi';
// Service handling user-related operations
export class UserService {

  private userRepository: UserRepository;

  // Constructor to initialize the UserRepository
  constructor(
    userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  // Method to create a new user
  async create(data: any, session: any) {
    try {
      // Hashing the password before storing it
      const password = await bcrypt.hash(data.password, 10);
      const userData = { name: data.name, email: data.email, password: password };
      // Creating a new user and returning the result
      const newUser = await this.userRepository.create(userData, session);

      return newUser;
    } catch (error) {
      console.log(error);
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

    if (data.image) { // Checking if image data is provided

      const filePath = tempImage + data.image; // Creating the file path using the provided image data

      const fileExtension = path.extname(filePath).toLowerCase(); // Extracting the file extension and converting it to lowercase
      if (!mimeTypeArray.includes(fileExtension)) { // Checking if the file extension is not in the allowed mime types
        // If the file extension is invalid, throwing an error indicating an invalid image extension
        const errorMimeTypeArray = new Error("پسوند عکس معتبر نیست ");
        (errorMimeTypeArray as any).status = 400; // Setting a status code for the error (assuming it's for HTTP status)
        throw errorMimeTypeArray; // Throwing the error to handle it elsewhere
      }
      if (!fs.existsSync(filePath)) { // Checking if the file doesn't exist in the specified path
        // If the file doesn't exist, throwing an error indicating that the image file wasn't found
        const errorExists = new Error("عکس مورد نظر یافت نشد");
        (errorExists as any).status = 400; // Setting a status code for the error (assuming it's for HTTP status)
        throw errorExists; // Throwing the error to handle it elsewhere
      }
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
      const error = new Error("نام کاربری و رمز عبور اشتباه است ");
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


  async updateUser(userInformationId: any, user: any, session: any) {
    await this.userRepository.updateUser(userInformationId, user, session);
  }


  async findById(userId: string) {
    // Find a user in the repository by ID
    const user = await this.userRepository.findById(userId);
    
    // If the user is not found, throw an error
    if (!user) {
      const errorUser = new Error('کاربری بااین ایدی یافت نشد');
      (errorUser as any).status = 400;
      throw errorUser;
    }
    // Return the found user
    return user;
  }
}

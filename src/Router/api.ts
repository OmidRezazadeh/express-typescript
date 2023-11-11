import express from "express";
import { UserRepository } from '../Repositories/UserRepository';
import { UserService } from '../Services/UserService';
import { UserController } from '../Controllers/UserController';

//initiating the router
export const router = express.Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

router.post('/store', userController.store.bind(UserController)); 
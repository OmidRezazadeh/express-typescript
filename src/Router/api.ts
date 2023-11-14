import express from "express";
import { UserController }from '../Controllers/UserController';

//initiating the router
export const router = express.Router();
router.post('/register', UserController.register.bind(UserController)); 
router.post("/login",UserController.login.bind(UserController));
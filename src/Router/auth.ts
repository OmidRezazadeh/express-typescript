import express from "express";
import { UserController }from '../Controllers/UserController';
import { loginLimiter } from "../Middlewares/rateLimit";

//initiating the router
export const router = express.Router();

router.post('/register',UserController.register.bind(UserController)); 
router.post("/login",loginLimiter,UserController.login.bind(UserController));
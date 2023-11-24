import express from "express";
import { UserController }from '../Controllers/UserController';
import { loginLimiter } from "../Middlewares/rateLimit";
import { ConfirmationCodeController } from "../Controllers/ConfirmationCodeController";

//initiating the router
export const router = express.Router();

router.post('/register',UserController.register.bind(UserController)); 
router.post("/login",loginLimiter,UserController.login.bind(UserController));
router.post("/confirmation-code",ConfirmationCodeController.confirmationCode.bind(ConfirmationCodeController));
router.put("/update-password",UserController.updatePassword.bind(UserController));
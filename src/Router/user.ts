import express from "express";
import { UserController }from '../Controllers/Client/UserController';
import {UserInformationController} from "../Controllers/Client/UserInformationController";
import {authenticated} from "../Middlewares/auth";
export const userRouter = express.Router();
userRouter.put("/update",authenticated, UserInformationController.update.bind(UserInformationController));

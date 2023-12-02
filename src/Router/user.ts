import express from "express";
import { UserController }from '../Controllers/Client/UserController';
import {UserInformationController} from "../Controllers/Client/UserInformationController";

export const userRouter = express.Router();
userRouter.put("/update", UserInformationController.update.bind(UserInformationController));

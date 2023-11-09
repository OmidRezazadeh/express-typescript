import express from "express";
import { UserController } from '../Controllers/UserController'

//initiating the router
export const router = express.Router();

router.post('/store',UserController.store);

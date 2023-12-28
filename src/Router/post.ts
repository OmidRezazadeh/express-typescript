import express from "express";
import { authenticated } from "../Middlewares/auth";
import { PostController } from "../Controllers/Client/PostController";
export const postRouter = express.Router();
postRouter.post("/store", authenticated, PostController.create.bind(PostController));

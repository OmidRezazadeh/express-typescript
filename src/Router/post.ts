import express from "express";
import { authenticated } from "../Middlewares/auth";
import { PostController } from "../Controllers/Client/PostController";
export const postRouter = express.Router();
postRouter.post("/store", authenticated, PostController.create.bind(PostController));
postRouter.put("/edit/:id",authenticated,PostController.update.bind(PostController));
postRouter.delete("/delete/:id",authenticated,PostController.delete.bind(PostController));
postRouter.get("/:id?",authenticated,PostController.list.bind(PostController));



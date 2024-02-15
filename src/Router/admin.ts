import { authenticated } from "../Middlewares/auth";
import{checkAdminRoleMiddleware} from "../Middlewares/checkRoleAdmin";
import { RoleController } from "../Controllers/Admin/RoleController";
import {UsersController} from "../Controllers/Admin/UserController";
import express from "express";
export const adminRouter = express.Router();
adminRouter.post("/roles/store",authenticated,checkAdminRoleMiddleware, RoleController.store.bind(RoleController));
adminRouter.put("/roles/assign/users/:id",authenticated,checkAdminRoleMiddleware,RoleController.assignRole.bind(RoleController));
adminRouter.put("/roles/:id/edit/",authenticated,checkAdminRoleMiddleware,RoleController.edit.bind(RoleController));
adminRouter.get("/roles/:id?",authenticated,checkAdminRoleMiddleware,RoleController.list.bind(RoleController));

// Chain the common middleware for user routes


// User routes
adminRouter.get("/users/:id?",authenticated, checkAdminRoleMiddleware, UsersController.list.bind(UsersController));
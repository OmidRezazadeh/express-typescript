import { authenticated } from "../Middlewares/auth";
import{checkAdminRoleMiddleware} from "../Middlewares/checkRoleAdmin";
import { RoleController } from "../Controllers/Admin/RoleController";
import express from "express";
export const adminRouter = express.Router();
adminRouter.post("/roles/store",authenticated,checkAdminRoleMiddleware, RoleController.store.bind(RoleController));
adminRouter.put("/roles/assign/users/:id",authenticated,RoleController.assignRole.bind(RoleController));


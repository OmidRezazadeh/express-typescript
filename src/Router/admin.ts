import { authenticated } from "../Middlewares/auth";
import { RoleController } from "../Controllers/Admin/RoleController";
import express from "express";
export const AdminRouter = express.Router();
AdminRouter.post("/roles/store", authenticated, RoleController.store.bind(RoleController));


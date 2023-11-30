import express from "express";
import { UploadController } from "../Controllers/Client/UploadController";
 export const uploadRouter =express.Router();
 uploadRouter.post("/",UploadController.upload.bind(UploadController));
 
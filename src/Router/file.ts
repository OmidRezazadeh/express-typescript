import express from "express";
import { UploadController } from "../Controllers/UploadController";
 export const uploadRouter =express.Router();
 uploadRouter.post("/",UploadController.upload.bind(UploadController));
 
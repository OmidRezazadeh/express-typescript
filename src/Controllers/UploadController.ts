import { Request, Response, NextFunction } from "express";
import { UploadService } from "../Services/UploadService";
class uploadController {
    private uploadService: UploadService;
    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }
    upload = async (req: Request, res: Response, next: NextFunction) => {
        
        await this.uploadService.validate(req, res, next);
    
}
}


const uploadService = new UploadService();
const UploadController = new uploadController(uploadService);

export { UploadController, UploadService };

import { Request, Response, NextFunction } from 'express';
import { upload, fileFilter } from "../utils/upload";
import sharp from "sharp";
import crypto from 'crypto';
export class UploadService {

    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            upload(req, res, async (err:any) => {
                if (err) {
                    if (err.code === "LIMIT_FILE_SIZE") {
                        const errorFileSize = new Error("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
                        (errorFileSize as any).status = 400;
                        throw errorFileSize;
                    }
                } else {
                    if (!req.file || !req.file.fieldname ) {
                        const errorFile = new Error("جهت آپلود باید عکسی انتخاب کنید");
                        (errorFile as any).status = 404;
                        throw errorFile;
                    }
                }
                
            const nawImageName = crypto.randomBytes(10).toString('hex');
            const fileName = `${nawImageName}_${req.file.originalname}`;
            await sharp(req.file.buffer)
                .jpeg({ quality: 60 })
                .toFile(`${__dirname}/../Public/upload/images/${fileName}`);
            const image = `http://localhost:3000/uploads/${fileName}`;
            
            // Handle the image or send it in the response
            res.status(200).json({ image });
            });
        } catch (error) {

            next(error)
        }
    }
 


}
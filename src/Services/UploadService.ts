import { Request, Response, NextFunction } from 'express';
import { upload } from "../utils/upload";
import sharp from "sharp";
import crypto from 'crypto';
export class UploadService {

    // Async function to handle validation process
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            // Upload file using multer
            upload(req, res, async (err: any) => {
                // If an error occurred while uploading
                if (err) {
                    // If the error is related to file size limit
                    if (err.code === "LIMIT_FILE_SIZE") {
                        // Create a new error for file size limit exceeded 
                        const errorFileSize = new Error("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
                        (errorFileSize as any).status = 400; // Set error status code
                        throw errorFileSize;
                    }
                } else {
                    // If the request does not include file
                    if (!req.file) {
                        // Respond with an error, request to upload a file
                        return res.status(400).json({ message: "لطفا عکس را  اپلود کنید" });
                    }
                }

                // Create a new file name using randomBytes
                const nawImageName = crypto.randomBytes(10).toString('hex');
                const fileName = `${nawImageName}_${req.file.originalname}`;

                // Process the image file with Sharp
                await sharp(req.file.buffer)
                    // Convert the image to jpeg with 60% quality
                    .jpeg({ quality: 60 })
                    // Save the image file to the server's file system
                    .toFile(`${__dirname}/../Public/upload/images/${fileName}`);

                // Construct the image URL
                const image = `http://localhost:3000/uploads/${fileName}`;

                // Respond with the image URL
                res.status(200).json({ image });
            });
        } catch (error) { // If an error occurred in the try block
            next(error) // Pass the error to the next middleware
        }
    }


}
import { tempImage, mimeTypeArray } from '../configs/config';
import path from 'path';
import fs from 'fs';

 export const checkImageValidity=(imageName: string)=> {
    // Creating the file path using the provided image data
    const filePath = tempImage + imageName;

    const fileExtension = path.extname(filePath).toLowerCase(); // Extracting the file extension and converting it to lowercase
    if (!mimeTypeArray.includes(fileExtension)) { // Checking if the file extension is not in the allowed mime types
        // If the file extension is invalid, throwing an error indicating an invalid image extension
        const errorMimeTypeArray = new Error("پسوند عکس معتبر نیست ");
        (errorMimeTypeArray as any).status = 400; // Setting a status code for the error (assuming it's for HTTP status)
        throw errorMimeTypeArray; // Throwing the error to handle it elsewhere
    }
    if (!fs.existsSync(filePath)) { // Checking if the file doesn't exist in the specified path
        // If the file doesn't exist, throwing an error indicating that the image file wasn't found
        const errorExists = new Error("1عکس مورد نظر یافت نشد");
        (errorExists as any).status = 400; // Setting a status code for the error (assuming it's for HTTP status)
        throw errorExists; // Throwing the error to handle it elsewhere
    }
}
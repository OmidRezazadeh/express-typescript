import { User } from '../Models/User'; // Importing the User model
import { Request, Response, NextFunction } from 'express'; // Importing necessary Express types
import { getDecodedToken } from "../utils/token"; // Importing a function to decode tokens

export const checkAdminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Decoding the token from the request header
    const token = getDecodedToken(req.get('Authorization'));

    try {
        // Checking if the token is missing or invalid
        if (!token) {
            return res.status(400).json({ message: 'مجوز کافی ندارید' }); // Responding with an error if the token is missing
        }

        // Finding the user by the user ID in the token and populating their roles
        const user = await User.findById(token.user.user_id).populate('roles').lean(); 

        // Extracting roles from the user data
        const roles: any[] = user.roles; // Assuming roles is an array of roles

        let isAdmin = null; // Initializing a variable to check if the user is an admin

        // Looping through the roles to find if the user has the "admin" role
        for (let role of roles) {
            if (role.name == "admin") { // Checking if the role is "admin"
                isAdmin = "admin"; // Setting isAdmin flag if the user has the admin role
            } 
        }

        // Checking if the user is not an admin based on the role check
        if (isAdmin !== "admin") return res.status(400).json({ message: 'مجوز کافی ندارید' }); // Responding with an error if the user is not an admin

        // Proceeding to the next middleware if the user is an admin
        next();
    } catch (error) {
        // Handling errors and passing them to the error handling middleware
        next(error); // Forwarding the error to the Express error handler
        console.log(error); // Logging the error for debugging purposes
    }
}

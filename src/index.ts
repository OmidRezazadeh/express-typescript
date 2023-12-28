import express from 'express';
const connectDB = require("./configs/database");
import { router } from "./Router/auth"; // Importing your API router
import { uploadRouter } from "./Router/file";
import { userRouter } from "./Router/user";
import { adminRouter } from "./Router/admin";
import { postRouter } from './Router/post';
import { errorHandler } from "./Middlewares/errors"; // Importing error handling middleware
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to the database
connectDB();


app.use("/api/v1/posts", postRouter);
app.use('/api/v1/users', router);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/user-information", userRouter);
app.use("/api/v1/admin", adminRouter);

// Implementing the error handling middleware for any errors in the application
app.use(errorHandler);

const PORT = process.env.PORT; // Fetching the port from the configuration


// Starting the server and listening on the specified port
app.listen(PORT, () =>
    console.log(
        `Node API app is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

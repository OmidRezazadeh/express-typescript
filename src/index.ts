import express from 'express';
import { config } from './configs/config';
const connectDB = require("./configs/database");
import { router } from "./Router/api"; // Importing your API router
import { errorHandler } from "./Middlewares/errors"; // Importing error handling middleware

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to the database
connectDB();

// Using the defined router for '/api/v1/users' endpoints
app.use('/api/v1/users', router);

// Implementing the error handling middleware for any errors in the application
app.use(errorHandler);

const PORT = config.PORT; // Fetching the port from the configuration
console.log(PORT);

// Starting the server and listening on the specified port
app.listen(PORT, () =>
    console.log(
        `Node API app is running in ${config.NODE_ENV} mode on port ${PORT}`
    )
);

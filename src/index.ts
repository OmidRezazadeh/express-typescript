import express from 'express';
import { config } from './configs/config';
const connectDB = require("./configs/database");
const app = express();

connectDB();

const PORT = config.PORT;
console.log(PORT);
app.listen(PORT, () =>
    console.log(
        `Node API app is running in ${config.NODE_ENV} mode on port ${PORT}`
    )
);

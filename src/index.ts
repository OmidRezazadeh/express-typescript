import express from 'express';
import { config } from './configs/config';
const connectDB = require("./configs/database");
import {router }  from "./Router/api";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDB();

app.use('/api/v1/users', router)
const PORT = config.PORT;
console.log(PORT);
app.listen(PORT, () =>
    console.log(
        `Node API app is running in ${config.NODE_ENV} mode on port ${PORT}`
    )
);

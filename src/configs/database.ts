const mongoose = require('mongoose');
import { config } from './config';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {family: 4})
        console.log(`MongoDB connect ${conn.connection.host}`)
    } catch (error){
        console.error('Failed to connect to MongoDB', error);
    }
}

module.exports = connectDB;
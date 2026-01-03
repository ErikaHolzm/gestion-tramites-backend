//Conexión DB
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);

        console.log(`Connected successfully. host: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Connection failed, error: ${error.message}`)
    }
}

export default connectDB;
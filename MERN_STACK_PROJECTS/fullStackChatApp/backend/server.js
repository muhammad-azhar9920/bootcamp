import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import {app, server, io} from './socket/socket.js';

// loading environment variables
dotenv.config({});

const PORT = process.env.PORT || 8000;

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));


// ROUTES   
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

server.listen(PORT, () => {
    // db connection
    connectDB();
    console.log(`server is running on port ${PORT}`);
})

// error handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './dbConnection/db.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './src/routes/auth.user.route.js';
import blogRoutes from './src/routes/blog.route.js';
import commentRoutes from './src/routes/comment.route.js';
// for getting environment variables from .env file
dotenv.config({});


const PORT = process.env.PORT || 8000;
const app = express();
connectDB();


// MIDDLEWARES
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended:true}));
app.use(cookieParser());
const corsOptions={
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

// ROUTES
app.use('/api/auth',userRoutes);
app.use('/api/blogs',blogRoutes);
app.use('/api/comments',commentRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})

// ERROR HANDLER
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
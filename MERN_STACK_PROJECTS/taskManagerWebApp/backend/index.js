import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userAuthRouter from './routes/auth.js';
import userTaskRouter from './routes/tasks.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import {db} from './db.js';

/////////////////////////// DATABASE CONNECTION ////////////////////////
db.connect((err)=>{
    if(err){
        console.log('Error in Database Connection!');
    }else{
        console.log('Database Connected');
    }
});

const PORT = 8000;
const app = express();

////////////////////////// Middlewares ///////////////////////////
// get images
app.use(express.static('public'));
// bodyparser
app.use(bodyParser.json());
// cookieparser
app.use(cookieParser());
// cors
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

// ROUTES
app.use('/api/user',userRouter);
app.use('/api/auth',userAuthRouter);
app.use('/api/task',userTaskRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js'

export const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.access_token;
        if(!token){
            return next(errorHandler(401, "User isn't Authenticated!"));
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err){
                return next(errorHandler(401,"Invalid Token!"));
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
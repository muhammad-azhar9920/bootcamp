import jwt from 'jsonwebtoken';
import { errorHandler } from '../../utils/error.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(errorHandler(401, "User isn't Authenticated!"))
        }
        const decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
        if (!decoded.userId) {
            return next(errorHandler(401, "Invalid Token!"))
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        next(error)
    }
}
import { errorHandler } from '../../utils/error.js';

export const isAdmin = (req, res, next) => {
    try {
        if (req.role !== "admin") {
            return next(errorHandler(403, "You are not allowed to perform this action. please try to login as admin!"))
        }

        next();

    } catch (error) {
        next(error)
    }
}
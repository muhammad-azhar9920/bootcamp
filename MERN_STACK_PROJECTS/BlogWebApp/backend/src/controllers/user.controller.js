import { User } from '../models/user.model.js';
import { errorHandler } from '../../utils/error.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(errorHandler(400, "Username or email already exist! try different..."))
        }
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User Registered Successfully!', user });
    } catch (error) {
        next(error);
    }
}

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // CHECK EMAIL EXIST OR NOT
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        // COMPARE PASSWORD
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return next(errorHandler(401, 'Invalid Password!'));
        }
        // GENERATE TOKEN
        const token = await jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SCERET_KEY, { expiresIn: '1d' });
        return res.cookie('token', token, {
            httpOnly: true,
            samesite: true
        }).status(200).json({
            message: 'Login Successfully',
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })

    } catch (error) {
        next(error);
    }
}

// LOGOUT
export const logout = (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: "Logout Successfully"
        });

    } catch (error) {
        next(error)
    }
}

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, 'id email role')
        res.status(200).json({
            message: "users found successfully",
            users
        })
    } catch (error) {
        next(error)
    }
}

// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(errorHandler(404, "User Not Found!"))
        }

        res.status(200).json({
            message: "User Deleted Successfully!"
        })

    } catch (error) {
        next(error)
    }
}

// UPDATE USER ROLE
export const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true })
        if (!updatedUser) {
            return next(errorHandler(404, "User Not Found!"))
        }

        res.status(200).json({
            message: "User role updated successfully",
            user: updatedUser
        })

    } catch (error) {
        next(error)
    }
}
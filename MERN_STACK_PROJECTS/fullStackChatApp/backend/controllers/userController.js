import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// REGISTER USER
export const register = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return next(errorHandler(400, "Password and confirmPassword don't matched!"))
        }
        const user = await User.findOne({ username });
        if (user) {
            return next(errorHandler(400, "Username already exist! try different..."))
        }
        // CONVERT PASSWORD INTO HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);
        // profilePhoto from external API (avatar placeholder)
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        // GENERATE TOKEN
        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY)
        await newUser.save();
        res.cookie("access_token", token, { httpOnly: true }).status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePhoto: newUser.profilePhoto
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// LOGIN USER
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(404, "User Not Found!"));
        }
        // COMPARE PASSWORD
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return next(errorHandler(401, "Wrong Password!"));
        }
        // GENERATE TOKEN
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// LOGOUT USER
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({
            message: "User has been logged out successfully!"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// GET OTHER USERS
export const getOtherUsers = async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
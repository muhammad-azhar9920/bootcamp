import express from "express";
import {handleRegisterUser,handleLoginUser,handleCheckAuthUser,handleLogoutUser} from '../controllers/auth.js';
import {verifyUser} from '../middleware/auth.js';
import {upload} from '../middleware/multerMid.js'

const router = express.Router();

// POST REGISTER
router.post('/register',upload.single('file'),handleRegisterUser)
// POST LOGIN
router.post('/login',handleLoginUser)
// GET LOGOUT
router.get('/logout',handleLogoutUser)
// GET CHECK AUTHENTICATION
router.get('/checkauth',verifyUser,handleCheckAuthUser)

export default router
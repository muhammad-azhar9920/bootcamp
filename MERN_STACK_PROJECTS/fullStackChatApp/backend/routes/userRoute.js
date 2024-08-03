import express from 'express';
import {register,login,logout,getOtherUsers} from '../controllers/userController.js';
import {isAuthenticated} from '../middlewares/isAuthenticated.js';

const router = express.Router();

// register
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/',isAuthenticated,getOtherUsers);

export default router;
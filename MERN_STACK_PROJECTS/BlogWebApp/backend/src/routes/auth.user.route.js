import express from 'express';
import { register, login, logout, getAllUsers, deleteUser, updateUserRole } from '../controllers/user.controller.js';

const router = express.Router();

// REGISTER
router.post('/register', register);
// LOGIN
router.post('/login', login);
// LOGOUT
router.get('/logout', logout);
// GET ALL USERS
router.get('/users', getAllUsers);
// DELETE USER
router.delete('/users/:id', deleteUser);
// UPDATE A USER ROLE
router.patch('/users/:id', updateUserRole);


export default router;
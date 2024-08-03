import express from 'express';
import {getSingleUser,updateProfilePic,changePassword} from '../controllers/user.js';
import {upload} from '../middleware/multerMid.js'

const router = express.Router();

// GET single user by id (For deleting task by user id)
router.get('/getsingleuser/:id',getSingleUser);

// UPDATE user profile pic by id
router.put('/updateprofilepic/:id',upload.single('file'),updateProfilePic)

// change password by user id
router.put('/changepassword/:id',changePassword)

export default router;
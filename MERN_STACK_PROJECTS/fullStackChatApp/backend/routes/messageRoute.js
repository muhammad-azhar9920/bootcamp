import express from 'express';
import {isAuthenticated} from '../middlewares/isAuthenticated.js';
import {sendMessage,getMessage} from '../controllers/messageController.js';

const router = express.Router();

router.post('/send/:id',isAuthenticated,sendMessage);
router.get('/:id',isAuthenticated,getMessage);

export default router;
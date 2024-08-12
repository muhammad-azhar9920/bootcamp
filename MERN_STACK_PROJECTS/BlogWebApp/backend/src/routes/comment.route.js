import express from 'express'
import {addComment, getAllCommentsCount} from '../controllers/comment.controller.js'

const router = express.Router();

// CREATE COMMENT
router.post('/add-comment',addComment)
// GET ALL COMMENTS COUNT
router.get('/total-comments',getAllCommentsCount)

export default router;
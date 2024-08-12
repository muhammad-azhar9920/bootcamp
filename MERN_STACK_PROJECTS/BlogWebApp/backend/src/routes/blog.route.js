import express from 'express';
import { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog, relatedBlogs } from '../controllers/blog.controller.js'
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// CREATE BLOG
router.post('/create-blog',verifyToken,isAdmin, createBlog)
// GET ALL BLOGS
router.get('/', getAllBlogs)
// GET SINGLE BLOG BY ID
router.get('/:id', getSingleBlog)
// UPDATE BLOG
router.patch('/update-blog/:id',verifyToken,isAdmin, updateBlog)
// DELETE BLOG
router.delete('/:id',verifyToken,isAdmin, deleteBlog)
// RELATED BLOGS
router.get('/related/:id', relatedBlogs)

export default router;
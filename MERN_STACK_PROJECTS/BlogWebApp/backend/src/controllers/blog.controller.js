import { Blog } from '../models/blog.model.js';
import { errorHandler } from '../../utils/error.js'
import { Comment } from '../models/comment.model.js';

// ADD BLOG
export const createBlog = async (req, res, next) => {
    try {
        // console.log(req.body)
        const newPost = new Blog({ ...req.body, author: req.userId });
        await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        })

    } catch (error) {
        next(error)
    }
}

// GET ALL BLOGS
export const getAllBlogs = async (req, res, next) => {
    try {
        // searching and category functionality
        const { search, category, location } = req.query;
        let query = {}
        if (search) {
            query = {
                // ...query,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            }
        }
        if (category) {
            query = {
                // ...query,
                category
            }
        }
        if (location) {
            query = {
                // ...query,
                location
            }
        }
        // sort({createdAt: -1}) for getting latest post
        const posts = await Blog.find(query).populate("author", "email").sort({ createdAt: -1 });
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

// GET SINGLE BLOG BY ID
export const getSingleBlog = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findById(postId);
        if (!post) {
            return next(errorHandler(404, 'Post Not Foud!'))
        }
        // fetch comment
        const comment = await Comment.find({postId}).populate('user', "username email")
        res.status(200).json({post,comment});
    } catch (error) {
        next(error)
    }
}

// UPDATE BLOG
export const updateBlog = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
        }, { new: true });
        // { new: true }: This option tells Mongoose to return the updated document instead of the original document.

        if (!updatedPost) {
            return next(errorHandler(404, 'Post Not Found!'))
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            post: updatedPost
        })

    } catch (error) {
        next(error)
    }
}

// DELETE BLOG
export const deleteBlog = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId);
        if (!post) {
            return next(errorHandler(404, 'Post Not Found!'))
        }
        // delete related comments
        await Comment.deleteMany({postId});
        res.status(200).json({
            message: "Post deleted successfully",
            post,
        })
    } catch (error) {
        next(error)
    }
}

// RELATED BLOGS
export const relatedBlogs = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId){
            return next(errorHandler(400, 'Post id is required!'))
        }
        const blog = await Blog.findById(postId);
        if(!blog){
            return next(errorHandler(404, 'Post Not Foud'))
        }

        // RELATED POST FUNCTIONALITY
        const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i")
        const relatedQuery = {
            _id: {$ne: postId}, // exclude the current blog by id
            title: {$regex: titleRegex}
        }

        const relatedPost = await Blog.find(relatedQuery);

        res.status(200).json({
            message: "Related post found",
            post: relatedPost
        })

    } catch (error) {
        next(error)
    }
}
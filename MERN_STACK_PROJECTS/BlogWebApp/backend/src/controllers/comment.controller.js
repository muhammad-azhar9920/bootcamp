import { Comment } from '../models/comment.model.js'

// ADD COMMENT
export const addComment = async (req, res, next) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).json({
            message: "Comment created successfully",
            comment: newComment
        })

    } catch (error) {
        next(error)
    }
}

// GET ALL COMMENTS COUNT
export const getAllCommentsCount = async (req, res, next) => {
    try {
        const totalComment = await Comment.countDocuments({});
        res.status(200).json({
            message: "Total Comments Count",
            totalComment
        })
    } catch (error) {
        next(error)
    }
}
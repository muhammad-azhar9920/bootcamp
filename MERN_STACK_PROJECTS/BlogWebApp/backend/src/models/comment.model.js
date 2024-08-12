import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Comment = mongoose.model('Comment', commentSchema);
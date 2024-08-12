import React from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { useAddCommentMutation } from '../../../redux/features/comments/commentApi';
import {useNavigate, useParams} from 'react-router-dom'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';
import {toast } from 'react-toastify';

const AddComment = () => {
    const {id} = useParams();
    const [comment, setComment] = useState('');
    const {user} = useSelector((store)=> store.auth);
    const [addComment] = useAddCommentMutation();
    const navigate = useNavigate();
    const {refetch} = useFetchBlogByIdQuery(id, {skip: !id})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to comment on this post!');
            navigate('/login');
            return;
        }
        const newComment = {
            comment,
            user: user._id,
            postId: id
        }
        try {
            const res = await addComment(newComment).unwrap();
            toast.success('Comment posted successfully')
            setComment('');
            refetch();
        } catch (error) {
            console.log(error);
            toast.error('An error occured while posting comment')
        }

    }

    return (
        <div className='mt-6'>
            <h3 className='text-lg font-medium mb-4'>Leave a comment</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                required={true}
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                    cols="30"
                    rows="10"
                    placeholder='share your opinion about this post'
                    className='w-full focus:outline-none p-5 bg-slate-200'
                />
                <button type='submit'
                    className='w-full py-2 bg-orange-950 text-white hover:bg-orange-900 font-medium rounded-md'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddComment

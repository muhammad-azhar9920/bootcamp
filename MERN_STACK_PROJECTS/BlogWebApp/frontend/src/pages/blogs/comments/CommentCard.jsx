import React from 'react'
import commentIcon from '../../../assets/comment/user.png'
import { formatDate } from '../../../utils/formatDate'
import AddComment from './AddComment'

const CommentCard = ({comments}) => {
  return (
    <div className='my-6 bg-blue-300 p-8'>
        <div>
            {
                comments.length > 0 ? <div>
                    <h3 className='text-lg font-medium'>All Comments</h3>
                    <div>
                        {
                            comments.map((comment,index)=>(
                                <div key={index}>
                                    <div className='flex gap-2 items-center my-2'>
                                        <img src={commentIcon} alt="user-img" className='h-14' />
                                        <div>
                                            <p className='text-lg capitalize font-medium underline underline-offset-4'>{comment?.user.username}</p>
                                            <p className='text-[12px] italic'>{formatDate(comment.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-600 mt-4 p-8 border border-black'>
                                        <p className='md:w-4/5'>{comment?.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div> 
                : <div className='text-lg font-medium'>No Comments Found!</div>
            }
        </div>

        {/* Add a comment */}
        <AddComment/>
    </div>
  )
}

export default CommentCard

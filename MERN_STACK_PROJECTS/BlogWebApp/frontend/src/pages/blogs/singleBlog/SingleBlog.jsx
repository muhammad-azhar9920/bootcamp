import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';
import CommentCard from '../comments/CommentCard';
import RelatedBlog from './RelatedBlog';
import SingleBlogCard from './SingleBlogCard';

const SingleBlog = () => {
    const {id} = useParams();
    // get data using redux
    const {data:blog, error, isLoading} = useFetchBlogByIdQuery(id);
  return (
    <div className='container mx-auto mt-8'>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong...</div>}
      
        {
            blog?.post && (
                <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
                    <div className='lg:w-2/3 w-full'>
                        <SingleBlogCard blog={blog?.post} />
                        <CommentCard comments={blog?.comment} />
                    </div>
                    <div className='bg-blue-300 lg:w-1/3 w-full'>
                        <RelatedBlog/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default SingleBlog

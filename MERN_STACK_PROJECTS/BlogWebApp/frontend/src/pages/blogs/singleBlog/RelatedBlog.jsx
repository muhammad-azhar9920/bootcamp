import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';

const RelatedBlog = () => {
    const { id } = useParams();
    // get data using redux
    const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);
    return (
        <div>
            <h3 className='text-2xl font-medium pt-8 px-8 pb-5'>Related Blogs</h3>
            <hr />
            {
                blogs?.post?.length > 0 ?<div className='space-y-4 mt-5'>
                    {
                        blogs?.post.map((blog, index)=>(
                            <Link
                            to={`/blog/${blog?._id}`}
                             key={index} className='flex flex-col sm:flex-row sm:items-center gap-4 px-8 py-4 shadow-sm'>
                                <div className='size-14'>
                                    <img src={blog?.coverImg} alt="" className='h-full w-full rounded-full ring-2 ring-blue-700' />
                                </div>
                                <div>
                                    <h4 className='font-medium text-blue-700'>{blog?.title.substring(0,30)}</h4>
                                    <p>{blog?.description.substring(0,30)}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div> 
                 : <div className='p-8'>No related blogs</div>
            }
        </div>
    )
}

export default RelatedBlog

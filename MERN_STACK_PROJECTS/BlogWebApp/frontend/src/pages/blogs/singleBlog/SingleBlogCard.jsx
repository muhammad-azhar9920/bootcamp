import React from 'react'
import { formatDate } from '../../../utils/formatDate'
import EditorJSHTML from 'editorjs-html';

const editorJSHTML = EditorJSHTML();
const SingleBlogCard = ({blog}) => {
    const {title, description, content, coverImg, category, rating, author, createdAt} = blog || {}
    const htmlContent = editorJSHTML.parse(content).join('');
  return (
    <>
     <div className='bg-blue-300 p-8'>
        {/* blog header */}
        <div>
            <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>
            <p className='mb-2'>{formatDate(createdAt)} by <span>Admin</span> </p>
        </div>
        <div>
            <img src={coverImg} alt="cover-image" className='w-full md:h-[520px] bg-cover' />
        </div>
        {/* blog details */}
        <div className='mt-8 space-y-4'>
            {/* for content */}
            <div dangerouslySetInnerHTML={{__html: htmlContent}} className='space-y-3 editorjsdiv' />
            <div>
                <span className='text-lg font-medium'>Rating </span>
                <span className=''>{rating} (based on 2,352 reviews)</span>
            </div>
        </div>
     </div>
    </>
  )
}

export default SingleBlogCard

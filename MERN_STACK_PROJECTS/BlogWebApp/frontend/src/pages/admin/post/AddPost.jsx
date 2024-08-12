import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditorJS from '@editorjs/editorjs';
import { useRef } from 'react';
import { useEffect } from 'react';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsApi';
import {toast } from 'react-toastify';

const AddPost = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const {user} = useSelector((store)=> store.auth);
  const [message,setMessage] = useState('');
  const [blogdetail, setBlogdetail] = useState({
    title: '',
    description: '',
    coverImg: '',
    category: '',
    rating: 0,
  })

  const [postBlog, {isLoading}] = usePostBlogMutation();

  useEffect(()=>{
    const editor = new EditorJS({
      holder: 'editorjs', 
      onReady: ()=>{
        editorRef.current = editor;
      },
      autofocus: true,
      tools: { 
        header: {
          class: Header, 
          inlineToolbar: true,
        }, 
        list: {
          class: List,
          inlineToolbar: true,
        } 
      }, 
    })

    return ()=>{
      editor.destroy();
      editorRef.current = null;
    }
  },[])

  const handleChange=(e)=>{
    setBlogdetail((blogdetail)=>({...blogdetail, [e.target.name]: e.target.value}))
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title: blogdetail.title,
        content: content,
        description: blogdetail.description,
        coverImg: blogdetail.coverImg,
        category: blogdetail.category,
        rating: blogdetail.rating
      }
      const res = await postBlog(newPost).unwrap();
      toast.success(res?.message);
      navigate('/');
    } catch (error) {
      console.log('Error while submitting bog post! ', error);
      setMessage(error);
    }
  }

  return (
    <div className='bg-blue-300 md:p-8 p-2'>
      <h2 className='text-2xl font-semibold underline'>Crerate A New Blog Post</h2>
      <form
      onSubmit={handleSubmit}
        className='space-y-5 pt-8'
      >
        <div className='space-y-4'>
          <label className='font-semibold text-xl'>Blog Title</label>
          <input type="text"
          name='title'
          onChange={handleChange}
          value={blogdetail.title}
            className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
            placeholder='Enter Blog Title' required />
        </div>
        {/* blog details */}
        <div className='flex  flex-col md:flex-row justify-between items-start gap-4'>
          {/* left side */}
          <div className='md:w-2/3 w-full'>
            <p className='font-semibold text-xl mb-5'>Content Section</p>
            <p className='text-xs italic'>Write your post content below here...</p>
            <div id="editorjs" className='border border-black'></div>
          </div>

          {/* right side */}
          <div className='md:w-1/3 w-full border border-black p-5 space-y-5'>
            <p className='text-xl font-semibold'>Choose Blog Format</p>
            {/* images */}
            <div className='space-y-4'>
              <label className='font-semibold'>Blog Cover</label>
              <input type="text"
              name='coverImg'
              onChange={handleChange}
              value={blogdetail.coverImg}
                className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
                placeholder='https://unsplash.com/image/cover-photo-of-blog1.png...' required />
            </div>
            {/* category */}
            <div className='space-y-4'>
              <label className='font-semibold'>Category</label>
              <input type="text"
              name='category'
              onChange={handleChange}
              value={blogdetail.category}
                className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
                placeholder='Travel/Nature/Programming' required />
            </div>
            {/* meta description */}
            <div className='space-y-4'>
              <label className='font-semibold'>Meta Description</label>
              <textarea type="text"
              name='description'
              onChange={handleChange}
              cols={4}
              rows={4}
              value={blogdetail.description}
                className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
                placeholder='write your meta description' required />
            </div>
            {/* rating */}
            <div className='space-y-4'>
              <label className='font-semibold'>Rating</label>
              <input type="number"
              name="rating"
              onChange={handleChange}
              value={blogdetail.rating}
                className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
                 required />
            </div>
            {/* Author */}
            <div className='space-y-4'>
              <label className='font-semibold'>Author</label>
              <input type="text"
              // value={user?.username}
              disabled
              placeholder={`${user?.username.toUpperCase()} (not editable)`}
                className='w-full inline-block bg-slate-200 focus:outline-none px-5 py-3'
                 required />
            </div>
          </div>
        </div>
        {message && <p className='text-red-600 font-semibold'>{message}</p>}
        <button disabled={isLoading} type='submit' className='w-full bg-orange-950 text-white focus:bg-orange-800 py-3 rounded-md'>Add New Blog</button>
      </form>
    </div>
  )
}

export default AddPost

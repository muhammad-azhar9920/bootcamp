import React from 'react'
import { useState } from 'react'
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi';
import SearchBlog from './SearchBlog'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({
    search: '',
    category: '',
  });

  // get data using redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query)

  const handleSearchChange = (e) => {
    setQuery((query)=>({...query, [e.target.name]:e.target.value}));
  }
  // const handleSearch = () => setQuery({ search, category })

  return (
    <div className='mt-16 container mx-auto'>
      <SearchBlog
        search={query.search}
        handleSearchChange={handleSearchChange}
        // handleSearch={handleSearch}
      />

      {isLoading && <div>Loading...</div>}
      {error && <h2 className='mt-8 text-lg text-red-800 font-medium text-center'>Error : {error?.data?.message}</h2>}
      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gaap-8'>
        {
          blogs?.map((blog) => (
            <Link to={`/blog/${blog._id}`} key={blog._id}>
              <div className="card bg-base-100 my-2 w-[90%] shadow-xl">
                <figure>
                  <img
                    src={blog.coverImg}
                    className='h-[10rem] w-[100%]'
                    alt="Shoes" />
                </figure>
                <div className="card-body p-1">
                  <h2 className="card-title">{blog.title.slice(0,20)}...</h2>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Blogs

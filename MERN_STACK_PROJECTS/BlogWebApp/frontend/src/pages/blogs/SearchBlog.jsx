import React from 'react'

const SearchBlog = ({search, handleSearchChange}) => {
    // const handleKeyPress=(e)=>{
    //     // console.log(e.key);
    //     if(e.key == 'Enter'){
    //         handleSearch()
    //     }
    // }
  return (
    <div className='w-full flex'>
      <input type="text"
      name='search'
      value={search}
      onChange={handleSearchChange}
      // onKeyPress={handleKeyPress}
      className='py-2 px-4 mr-5 w-full focus:outline-none rounded-md focus:border'
      placeholder='type and search your blog here...' 
      />
      {/* <button onClick={handleSearch} className='px-4 py-2 bg-orange-950 text-white'>Search</button> */}
    </div>
  )
}

export default SearchBlog
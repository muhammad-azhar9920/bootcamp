import React from 'react'
import Blogs from '../blogs/Blogs'
import Hero from './Hero'

const Home = () => {
  return (
    <div className='bg-blue-300 text-black container mx-auto mt-8 p-8 rounded-lg'>
      <Hero/>
      <Blogs/>
    </div>
  )
}

export default Home

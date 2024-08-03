import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

export default function Home() {
  return (
    <div className='flex w-[100%] h-[100vh] justify-center bg-black'>
    <div className='flex p-4 my-6 overflow-hidden w-[90%] border-4 border-red-500 rounded-2xl'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  </div>
  )
}

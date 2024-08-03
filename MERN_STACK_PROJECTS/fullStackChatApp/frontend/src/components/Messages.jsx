import React from 'react'
import useGetMessages from '../hooks/useGetMessages';
import useGetRealtimeMessages from '../hooks/useGetRealtimeMessages';
import SingleMessage from './SingleMessage';

export default function Messages() {
  const { loading, messages } = useGetMessages();
  // calling custom hook
  useGetRealtimeMessages();
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        !loading && messages.length === 0 &&
        (
          <div className='text-white text-center my-[20%]'>
            <p className='text-4xl'>Let's Start conversation</p>
            <p className='text-2xl'> by sending a message</p>
          </div>
        )
      }

      {
        !loading && messages.length > 0 && messages.map((message) => (
          <SingleMessage key={message._id} message={message} />
        ))
      }

    </div>
  )
}

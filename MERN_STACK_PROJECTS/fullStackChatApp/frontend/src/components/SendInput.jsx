import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import useSendMessage from '../hooks/useSendMessage';

export default function SendInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form onSubmit={sendMessageHandler}>
      <div className='w-full relative'>
        <input
          required={true}
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
          type="text"
          placeholder='Send a message...'
          className='border-2 text-white border-white bg-black text-sm rounded-lg w-full px-4 my-3 py-2'
        />
        <button type="submit" className='absolute flex inset-y-0 end-0 pr-4 items-center'>
          {
            loading ? (
              <div className='loading loading-spinner'></div>
            ) : (
              <IoSend size={24} className='text-white' />
            )
          }
        </button>
      </div>
    </form>
  )
}

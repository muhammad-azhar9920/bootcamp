import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { BiSolidConversation } from "react-icons/bi";
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation'
import SendInput from './SendInput'
import Messages from './Messages'

export default function MessageContainer() {
  const { selectedUser, setSelectedUser } = useConversation();
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedUser?._id);
  useEffect(() => {
    return () => setSelectedUser(null)
  }, [setSelectedUser])
  return (
    <>
      {
        !selectedUser ? (
          <div className='text-white w-[70%] flex flex-col justify-center items-center '>
            <h1 className='text-4xl font-bold'>
              Welcome, {authUser?.fullName.charAt(0).toUpperCase() + authUser?.fullName.slice(1).toLowerCase()}
            </h1>
            <h1 className='text-3xl'>Let's Start Conversation </h1>
            <BiSolidConversation size={50} />
          </div>
        ) : (
          <div className='w-[70%] mx-2 flex flex-col'>
            <div className='flex items-center gap-2 bg-red-500 p-1 text-white hover:bg-red-600 rounded-md cursor-pointer'>
              <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-12 rounded-full'>
                  <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
              </div>
              <div className=''>
                <div className='flex flex-col items-center'>
                  <p className='text-xl'>{selectedUser?.fullName.charAt(0).toUpperCase() + selectedUser?.fullName.slice(1).toLowerCase()}</p>
                  <p className='text-sm'>{isOnline ? 'online' : ''}</p>
                </div>
              </div>
            </div>
            <Messages />
            <SendInput />
          </div>
        )
      }
    </>
  )
}

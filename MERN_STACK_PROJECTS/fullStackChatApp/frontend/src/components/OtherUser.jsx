import React from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation'

export default function OtherUser({ user, lastIndex }) {
    const { selectedUser, setSelectedUser } = useConversation();
    const isSelected = selectedUser?._id === user._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    return (
        <>
            <div onClick={() => { setSelectedUser(user) }}
                className={`flex items-center gap-2 text-white hover:bg-red-600 rounded-md cursor-pointer 
    ${isSelected ? "bg-red-600" : ""} `}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className=''>
                    <div className=''>
                        <p>{user?.fullName.charAt(0).toUpperCase() + user?.fullName.slice(1).toLowerCase()}</p>
                    </div>
                </div>
            </div>
            {
                !lastIndex && <div className='divider divider-error my-0 py-0'></div>
            }
        </>
    )
}

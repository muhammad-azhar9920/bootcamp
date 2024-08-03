import React, { useEffect, useRef } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { formatTime } from '../utils/formatTime';
import useConversation from '../zustand/useConversation';

export default function SingleMessage({ message }) {
    const { authUser } = useAuthContext()
    const { selectedUser } = useConversation();
    const messageFromMe = message.senderId === authUser._id;
    const chatClassName = messageFromMe ? "chat-end" : "chat-start";
    const profilePic = messageFromMe ? authUser.profilePhoto : selectedUser.profilePhoto;
    const msgBgColor = messageFromMe ? "bg-white text-black" : "";
    const formattedTime = formatTime(message.createdAt);

    // scroll smooth functionality when user click messages chat it will show latest messages
    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])
    return (
        <div ref={scroll} className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt="user-profile" />
                </div>
            </div>
            <div className='chat-footer'>
                <time className='text-xs opacity-50 text-white'>{formattedTime}</time>
            </div>
            <div className={`chat-bubble ${msgBgColor}`}>{message.message}</div>
        </div>
    )
}

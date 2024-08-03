import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from '/sound/notification.mp3';

const useGetRealtimeMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // sound functionality 
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })

        // cleanup
        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages])
}

export default useGetRealtimeMessages

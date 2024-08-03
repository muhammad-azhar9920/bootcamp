import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedUser } = useConversation();

    const sendMessage = async (message) => {
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8080/api/message/send/${selectedUser?._id}`, { message }, { withCredentials: true })
            setMessages([...messages, res.data]);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage

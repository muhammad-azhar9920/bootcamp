import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from 'react-hot-toast'
import axios from "axios"


const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedUser } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`http://localhost:8080/api/message/${selectedUser?._id}`, { withCredentials: true })
                setMessages(res.data);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false)
            }
        }

        if (selectedUser?._id) {
            getMessages();
        }
    }, [selectedUser?._id, setMessages])

    return { loading, messages }
}

export default useGetMessages

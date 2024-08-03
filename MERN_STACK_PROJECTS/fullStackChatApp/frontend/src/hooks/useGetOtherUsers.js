import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'

const useGetOtherUsers = () => {
    const [loading, setLoading] = useState(false);
    const [otherUsers, setOtherUsers] = useState([]);

    useEffect(() => {
        const getOtherUsers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8080/api/user`, { withCredentials: true })
                setOtherUsers(res.data);
            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                setLoading(false);
            }
        }
        getOtherUsers();
    }, [])

    return { loading, otherUsers }
}

export default useGetOtherUsers

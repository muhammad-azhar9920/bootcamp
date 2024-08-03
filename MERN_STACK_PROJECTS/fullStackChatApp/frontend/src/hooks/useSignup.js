import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast'

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (user) => {
        try {
            setLoading(true)
            let res = await axios.post(`http://localhost:8080/api/user/register`, user, { withCredentials: true });
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
            setAuthUser(res.data)
        } catch (err) {
            if (err) {
                toast.error(err.response.data.message);
            }
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup

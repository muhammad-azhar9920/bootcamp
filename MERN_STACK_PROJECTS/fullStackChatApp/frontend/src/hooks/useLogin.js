import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast'
import axios from "axios";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (user) => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8080/api/user/login`, user, { withCredentials: true })
            localStorage.setItem("user", JSON.stringify(res.data))
            setAuthUser(res.data)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, login }
}

export default useLogin

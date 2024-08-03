import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast'
import axios from "axios";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:8080/api/user/logout', { withCredentials: true })
            toast.success(res.data.message);
            localStorage.removeItem("user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { logout, loading }
}

export default useLogout

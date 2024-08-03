import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser((user) => {
            return { ...user, [e.target.name]: e.target.value }
        });
    }

    const { login } = useLogin();
    const onSubmit = async (e) => {
        e.preventDefault();
        await login(user)
    }

    let passRef = useRef(null);
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
        if (passRef.current) {
            passRef.current.type = showPassword ? 'password' : 'text';
        }
    };

    return (
        <div className='w-[100%] h-[100vh] bg-black flex flex-col items-center justify-center'>
            <form onSubmit={onSubmit}
                className='border-4 border-red-600 text-white p-4 md:w-[50%] w-[80%] rounded-xl'>
                <div className='flex justify-center mb-4 items-center gap-4'>
                    <img src="./prochat.jfif" className='w-[12%] rounded-full' alt="" />
                    <h1 className='text-center text-3xl my-6'>LOGIN TO ProChat</h1>
                </div>
                <div>
                    <input type="text"
                        className="input text-black my-2 input-bordered flex items-center gap-2 w-[100%]"
                        required={true}
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter Username" />
                </div>
                <div>
                    <input type="password"
                        className="input text-black my-2 input-bordered flex items-center gap-2 w-[100%]"
                        required={true}
                        name="password"
                        ref={passRef}
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter Password" />
                </div>
                <div className="form-control">
                    <label className="cursor-pointer flex justify-start gap-2 label">
                        <span className="label-text text-white">Show Password</span>
                        <input type="checkbox"
                            checked={showPassword}
                            onChange={handleCheckboxChange}
                            className="checkbox checkbox-error" />
                    </label>
                </div>
                <div className='text-center'>
                    <button type='submit' className="btn text-xl bg-red-600 text-white w-[100%] my-2">LOGIN</button>
                </div>
                <p className='text-white text-center mt-2'>Don't have an acount?
                    <b> <Link to="/signup">Register here</Link> </b>
                </p>
            </form>
        </div>
    )
}

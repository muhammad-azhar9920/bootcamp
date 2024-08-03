import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const handleChange = (e) => {
        setUser((user) => {
            return { ...user, [e.target.name]: e.target.value }
        });
    }

    // get signup from custom hook
    const { signup } = useSignup();
    const onSubmit = async (e) => {
        e.preventDefault();
        await signup(user);
    }

    let passRef = useRef(null);
    let confirmPassRef = useRef(null);
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
        if (passRef.current || confirmPassRef.current) {
            passRef.current.type = showPassword ? 'password' : 'text';
            confirmPassRef.current.type = showPassword ? 'password' : 'text';
        }
    };

    return (
        <div className='w-[100%] h-[100vh] bg-black flex flex-col items-center justify-center'>
            <form onSubmit={onSubmit}
                className='border-4 border-red-600 text-white p-4 md:w-[50%] w-[80%] rounded-xl'>
                <div className='flex justify-center mb-4 items-center gap-4'>
                    <img src="./prochat.jfif" className='w-[12%] rounded-full' alt="" />
                    <h1 className='text-center text-3xl my-6'>REGISTER TO ProChat</h1>
                </div>
                <div>
                    <input type="text"
                        className="input text-black input-bordered flex items-center gap-2 w-[100%]"
                        required={true}
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name" />
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
                <div>
                    <input type="password"
                        className="input text-black my-2 input-bordered flex items-center gap-2 w-[100%]"
                        required={true}
                        name="confirmPassword"
                        ref={confirmPassRef}
                        value={user.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter Confirm Password" />
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
                <div className='flex my-2 gap-3'>
                    <div className='mr-4'>Gender:</div>
                    <label className="inline-flex items-center">
                        <input type="radio"
                            name="gender"
                            checked={user.gender === "male"}
                            onChange={handleChange}
                            className="radio radio-error" value="male" />
                        <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio"
                            name="gender"
                            checked={user.gender === "female"}
                            onChange={handleChange}
                            className="radio radio-error" value="female" />
                        <span className="ml-2">Female</span>
                    </label>
                </div>
                <div className='text-center'>
                    <button type='submit' className="btn text-xl bg-red-600 text-white w-[100%] my-2">Register</button>
                </div>
                <p className='text-white text-center mt-2'>Already have an acount?
                    <b> <Link to="/login">Login here</Link> </b>
                </p>
            </form>
        </div>
    )
}

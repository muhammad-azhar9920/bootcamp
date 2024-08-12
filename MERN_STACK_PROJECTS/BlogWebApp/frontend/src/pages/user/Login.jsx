import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useRef } from 'react';


const Login = () => {
  const [ishowIcon, setIsshowIcon] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserData((userData) => ({ ...userData, [e.target.name]: e.target.value }))
  }

  const dispatch = useDispatch();

  // get login api from authApi
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(userData).unwrap();
      if (res) {
        const { user, message, token } = res
        dispatch(setUser({ user }))
        toast.success(message);
        navigate('/');
      }
    } catch (error) {
      if (error) {
        setMessage(error.data?.message)
        toast.error(error.data?.message)
      }
    }
  }

  const passRef = useRef(null);
  const handleShowPass = (e) => {
    e.preventDefault();
    setIsshowIcon(!ishowIcon)
    if (passRef.current) {
      passRef.current.type = ishowIcon ? 'password' : 'text';
    }
  }

  return (
    <div className='max-w-sm bg-blue-300 rounded-lg mx-auto p-8 mt-28'>
      <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
      <form className='space-y-5 max-w-sm mx-auto pt-8' onSubmit={handleSubmit}>
        <input
          name='email'
          value={userData.email}
          onChange={handleChange}
          className='w-full bg-white focus:outline-none px-5 py-3'
          placeholder='Email'
          required
          type="email" />
        <div className='relative'>
          <input
            name='password'
            ref={passRef}
            value={userData.password}
            onChange={handleChange}
            className='w-full bg-white focus:outline-none px-5 py-3'
            placeholder='Password'
            required
            type="password" />
          <button onClick={handleShowPass} className='absolute flex inset-y-0 end-0 pr-4 items-center'>
            {ishowIcon ?
              <FaRegEye /> : <FaEyeSlash />
            }
          </button>
        </div>

        {message && <p className='text-red-500 font-medium'>{message}</p>}

        <button
          disabled={loginLoading}
          type='submit' className='w-full mt-5 bg-orange-950 text-white hover:bg-orange-800 font-medium rounded-md py-3'>Login</button>

      </form>

      <p className='py-4 text-center'>Don't have an account <Link to={'/register'} className='text-blue-700 font-medium'>Register</Link> here. </p>
    </div>
  )
}

export default Login

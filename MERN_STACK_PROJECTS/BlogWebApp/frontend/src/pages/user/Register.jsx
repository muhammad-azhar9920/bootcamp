import React, { useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Register = () => {
  const [ishowIcon, setIsshowIcon] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserData((userData) => ({ ...userData, [e.target.name]: e.target.value }))
  }

  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(userData).unwrap();
      if (res) {
        const { message } = res
        toast.success(message);
        navigate('/login');
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
    <div className='max-w-sm bg-blue-300 mx-auto rounded-lg p-8 mt-28'>
      <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
      <form
        onSubmit={handleSubmit}
        className='space-y-5 max-w-sm mx-auto pt-8'>
        <input
          name='username'
          value={userData.username}
          onChange={handleChange}
          className='w-full bg-white focus:outline-none px-5 py-3'
          placeholder='Username'
          required
          type="text" />
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

        {message && <p className='text-red-500'>{message}</p>}

        <button type='submit' className='w-full mt-5 bg-orange-950 text-white hover:bg-orange-800 font-medium rounded-md py-3'>Register</button>

      </form>

      <p className='py-4 text-center'>Already have an account <Link to={'/login'} className='text-blue-700 font-medium'>Login</Link> here. </p>
    </div>
  )
}

export default Register

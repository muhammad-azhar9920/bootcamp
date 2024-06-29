import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    let res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      navigate('/');
    } else {
      alert(res.Error);
    }
  }

  return (
    <div>
      <h1 className='text-4xl text-center my-8 font-bold'>LOGIN</h1>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}
          className=' w-10/12 text-center'>
          <div className='my-2'>
            <span className=''>EMAIL:</span>
            <input type="email"
              onChange={(e) => { setValues({ ...values, email: e.target.value }) }}
              value={values.email}
              className='border-black ms-10 border-2 py-1 px-1 rounded-lg'
              required={true}
              placeholder='Enter Email' />
          </div>
          <div className='my-2'>
            <span className=''>PASSWORD:</span>
            <input type="password"
              onChange={(e) => { setValues({ ...values, password: e.target.value }) }}
              value={values.password}
              className='border-black ms-1 border-2 py-1 px-1 rounded-lg'
              required={true}
              placeholder='Enter Password' />
          </div>
          <div>
            <input type="submit" value='LOGIN' className='bg-black text-white py-2 px-12 rounded-lg' />
          </div>
          <div className='pt-2'>
            <Link to={'/signup'} className='text-blue-800 font-semibold'>Don't have Account?  SIGNUP-HERE</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

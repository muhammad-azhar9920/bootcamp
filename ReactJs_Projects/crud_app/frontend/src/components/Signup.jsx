import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    let res = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    res = await res.json();
    if (res.success) {
      alert(res.msg);
      navigate('/login');
    } else {
      alert(res.Error);
    }
  }
  return (
    <div>
      <h1 className='text-4xl text-center my-8 font-bold'>SIGNUP</h1>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}
          className=' w-10/12 text-center'>
          <div>
            <span className=''>NAME:</span>
            <input type="text"
              onChange={(e) => { setValues({ ...values, name: e.target.value }) }}
              value={values.name}
              className='border-black ms-9 border-2 py-1 px-1 rounded-lg'
              required={true}
              placeholder='Enter Name' />
          </div>
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
            <input type="submit" value='SIGNUP' className='bg-black text-white py-2 px-12 rounded-lg' />
          </div>
          <div className='pt-2'>
            <Link to={'/login'} className='text-blue-800 font-semibold'>Already have Account?  LOGIN-HERE</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

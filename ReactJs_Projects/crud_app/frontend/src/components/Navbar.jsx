import React from 'react'
import { NavLink } from 'react-router-dom'
'../App.css';

export default function Navbar() {
  return (
    <div className={`bg-black text-white p-4 text-xl`}>
      <ul className='flex justify-center gap-4'>
        <li><NavLink to='/'> Home </NavLink></li>
        <li><NavLink to='/addproduct'> AddProduct </NavLink></li>
      </ul>
    </div>
  )
}

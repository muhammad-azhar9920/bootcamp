import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/MyContext'
import '../App.css'

export default function Sidebar() {
  const { name, logout, mode, profilepic } = useContext(AppContext);
  return (
    <div className={`me-2' style={{height: '100vh'}`}>
      <ul className='m-0 p-0 px-1 navbar-nav pt-4' style={{ color: `${mode == 'light' ? 'black' : 'white'}` }}>
        <div className='d-md-flex justify-content-center'>
          <img src={`http://localhost:8000/images/${profilepic}`} className="img-fluid rounded-circle" width={100} alt="" />
        </div>
        <div className='d-md-flex justify-content-center'>
          <h5 className='text-white mt-2' style={{ fontSize: '2rem' }}>
            {/* <i className={`bi text-${mode == 'light' ? 'black' : 'white'} bi-person-circle me-2`}></i> */}
            <span className={`text-${mode == 'light' ? 'black' : 'white'}`}>{name.toUpperCase()}</span></h5>
        </div>
        <hr />
        <li className='mynav-li'>
          <NavLink to='/' className='mynav-link' style={{ color: `${mode == 'light' ? 'black' : 'white'}` }}>Tasks</NavLink>
        </li>
        <hr />
        <li className='mynav-li'>
          <NavLink to='/completedtask' className='mynav-link' style={{ color: `${mode == 'light' ? 'black' : 'white'}` }}>Completed Tasks</NavLink>
        </li>
        <hr />
        <li className='mynav-li'>
          <NavLink to='/profile' className='mynav-link' style={{ color: `${mode == 'light' ? 'black' : 'white'}` }}>Profile</NavLink>
        </li>
        <hr />
      </ul>
      <div className='text-center my-5'>
        <button onClick={logout} className='bg-light me-2 px-5 btn fw-bold px-1 py-1'>Logout</button>
      </div>
    </div>
  )
}

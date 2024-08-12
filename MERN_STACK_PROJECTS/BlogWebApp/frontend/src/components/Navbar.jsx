import React from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import userImg from '../assets/comment/user.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'
import {toast } from 'react-toastify';

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(false);

    // get user from store
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    // get logout Api from redux authApi
    const [logoutUser] = useLogoutUserMutation();
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            location.reload(true);
            toast.success('Logout successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const navList = [
        { name: "HOME", path: "/" },
        { name: "ABOUT US", path: "/about-us" },
        { name: "CONTACT US", path: "/contact-us" },
    ]
    return (
        <header>
            <div className="navbar bg-blue-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} onClick={() => { setActiveIndex(false) }} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content bg-base-100 rounded-box ${activeIndex ? 'hidden' : 'block'} mt-3 w-52 p-2 shadow`}>
                            {
                                navList.map((list, index) => (
                                    <li className='font-semibold' onClick={() => { setActiveIndex(true) }} key={index}><NavLink to={`${list.path}`}>{list.name}</NavLink></li>
                                ))
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">PakBlog</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navList.map((list, index) => (
                                <li className='font-semibold' key={index}><NavLink to={`${list.path}`}>{list.name}</NavLink></li>
                            ))
                        }
                    </ul>
                </div>

                {/* btn show functionality is a user login or not */}

                {
                    user && user.role === "user" ? (
                        <div>
                            <img src={userImg} alt="user-img" className='size-8' />
                            <button
                                onClick={handleLogout}
                                className='btn px-3 py-2 mx-2 rounded-md'>Logout</button>
                        </div>
                    ) : user && user.role === "admin" ? (
                        <div>
                            <img src={userImg} alt="user-img" className='size-8' />
                            <Link to={'/dashboard'}>
                                <button className='btn md:px-3 px-1 text-sm py-2 md:mx-2 mx-1 rounded-md'>Dashboard</button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className='btn md:px-3 px-1 text-sm py-2 md:mx-2 mx-1 rounded-md'>Logout</button>
                        </div>
                    )
                        :
                        (<div className="navbar-end">
                            <NavLink to={`/login`} className="btn">Login</NavLink>
                        </div>)
                }
            </div>
        </header>

    )
}

export default Navbar

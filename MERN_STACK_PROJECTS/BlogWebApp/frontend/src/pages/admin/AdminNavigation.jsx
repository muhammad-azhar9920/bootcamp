import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import adminImg from '../../assets/comment/user.png';
import {useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';

const AdminNavigation = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const hadleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            location.reload(true);
        } catch (error) {
            console.error("Failed to logout ", error);
        }
    }
    return (
        <div className='space-y-5 bg-blue-300 p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between'>
            <div>
                {/* header part */}
                <div className='mb-5 '>
                    <img src={adminImg} alt="admin-img" className='size-14' />
                    <p className='font-semibold'>Admin</p>
                </div>
                <hr />
                <ul className='space-y-5 pt-5'>
                    <li>
                        <NavLink end to={'/dashboard'} className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-black"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/add-new-post'} className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-black"}>Add New Post</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/manage-items'} className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-black"}>Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/users'} className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-black"}>Users</NavLink>
                    </li>
                </ul>
            </div>
            <div className='mb-3'>
                <hr className='mb-3' />
                <button onClick={hadleLogout} className='text-white bg-orange-950 font-medium px-5 py-1 rounded-sm'>Logout</button>
            </div>
        </div>
    )
}

export default AdminNavigation

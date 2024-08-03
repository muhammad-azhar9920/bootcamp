import React, { useState } from 'react'
import OtherUsers from './OtherUsers'
import useLogout from '../hooks/useLogout';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

export default function Sidebar() {
    const [search, setSearch] = useState("");
    const { otherUsers } = useGetOtherUsers();
    // searching functionality
    const searchedUsers = otherUsers?.filter((user) => {
        return user.fullName.toLowerCase().includes(search.toLowerCase());
    })

    const { loading, logout } = useLogout();
    return (
        <div className='flex flex-col border-r-4 md:p-4 border-red-600 w-[30%]'>
            <form className='flex'>
                <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    className='input-md mx-2  w-[100%] input-bordered rounded-md bg-transparent border-4 border-red-600 focus:border-orange-400 text-white' type="text"
                    placeholder='Search...' />
            </form>
            <div className='divider divider-error'></div>
            <OtherUsers otherUsers={searchedUsers} />
            <div className='mt-4'>
                {
                    !loading ? <button onClick={logout} className='btn btn-sm'>Logout</button> : <span className='loading loading-spinner'></span>
                }
            </div>
        </div>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNavigation from './AdminNavigation'

const AdminLayout = () => {
    const {user} = useSelector((store)=> store.auth);
    if(!user || user.role !== 'admin'){
        return <Navigate to='/login' />
    }
  return (
    <div className='my-2 container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/5 sm:h-2/5 w-full'>
        <AdminNavigation/>
      </header>
      <main className='p-8 bg-blue-300 w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout

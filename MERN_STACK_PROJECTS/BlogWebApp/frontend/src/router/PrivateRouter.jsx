import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user} = useSelector((store)=> store.auth);
    const token = document.cookie="token";
    const location = useLocation();
    
    if(user && token){
        return children;
    }
  return <Navigate to='/login' state={{from: location}} replace />
}

export default PrivateRouter

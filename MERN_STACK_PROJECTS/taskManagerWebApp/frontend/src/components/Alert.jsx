import React, { useContext } from 'react'
import { AppContext } from '../context/MyContext'
import '../App.css'

export default function Alert() {
    const { alert } = useContext(AppContext);
    return (
        alert && <div
            className={`bg-${alert.type} text-${alert.type == 'light' ? 'black' : 'white'} fw-bold alert`} role="alert">
            {alert.msg}
        </div>
    )
}

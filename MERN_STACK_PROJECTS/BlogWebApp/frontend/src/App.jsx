import { useState } from 'react'
import './App.css'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-blue-400 min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow'>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import './index.css';

function App() {
  const {authUser} = useAuthContext();

  return (
    <>
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'} />} />
      <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login/>} />
      <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <Signup/>} />
    </Routes>  
    </>
  )
}

export default App

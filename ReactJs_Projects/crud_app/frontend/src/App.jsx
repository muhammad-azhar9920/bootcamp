import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [name,setName] = useState('');

  const checkAuth = async (navigate)=>{
    let res = await fetch('http://localhost:8000/checkauth',{
      credentials: 'include',
    });
    res = await res.json();
    // console.log(res);
    if(res.success){
      console.log('You are authorized');
      setName(res.name);
    }else{
      navigate('/login');
    }
  }

  return (
    <>
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route exact path='/' element={<Products checkAuth={checkAuth} name={name} />} />
      <Route exact path='/addproduct' element={<AddProduct checkAuth={checkAuth} />} />
      <Route exact path='/updateproduct' element={<UpdateProduct/>} />
      <Route exact path='/signup' element={<Signup/>} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

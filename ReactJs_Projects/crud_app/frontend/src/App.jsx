import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route exact path='/' element={<Products/>} />
      <Route exact path='/addproduct' element={<AddProduct/>} />
      <Route exact path='/updateproduct' element={<UpdateProduct/>} />
      <Route exact path='/signup' element={<Signup/>} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

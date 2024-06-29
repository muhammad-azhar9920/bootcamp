import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');


  useEffect(() => {
    getAllProducts()
    checkAuth()
  }, []);

  const navigate = useNavigate();

  const checkAuth = async () => {
    let res = await fetch('http://localhost:8000/checkauth', {
      credentials: 'include',
    });
    res = await res.json();
    // console.log(res);
    if (res.success) {
      console.log('You are authorized');
      setName(res.name.toUpperCase());
    } else {
      navigate('/login');
    }
  }

  const logoutUser = async () => {
    let res = await fetch('http://localhost:8000/logout', {
      credentials: 'include'
    });
    res = await res.json();
    // console.log(res)
    if (res.success) {
      window.location.reload(true);
    }
  }

  const getAllProducts = async () => {
    let data = await fetch('http://localhost:8000/products')
    data = await data.json();
    setProducts(data);
    // console.log(data);
  }

  const deleteProduct = async (id) => {
    let res = await fetch(`http://localhost:8000/deleteproduct?id=${id}`, {
      method: 'DELETE'
    });
    res = await res.json();
    if (res.success) {
      alert(res.msg);
      window.location.reload();
    }
  }

  return (
    <div>
      <h1 className='text-4xl text-center my-4 font-bold'>WELCOME "{name}" TO OUR HOME PAGE</h1>
      <div className='flex justify-center'>
        <button
          className='bg-black text-white px-3 py-1 rounded-2xl cursor-pointer text-2xl'
          onClick={logoutUser}
        >LOGOUT</button></div>
      <div className='flex flex-wrap ms-[10%] mt-[6%] gap-4'>
        {
          products.length == 0 ?
            (
              <h1 className='text-4xl m-auto my-8 font-bold'>There is no product!</h1>
            ) :
            (
              products.map((product) => (
                <div className="max-w-[20%] rounded overflow-hidden border-1 border-black shadow-lg bg-white"
                  key={product.id}>
                  <img className="w-full h-[50%]" src={`http://localhost:8000/images/${product.image}`}
                    alt="Vivo Y11" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Name: {product.name}</div>
                    <p className="text-gray-700 text-base">
                      <strong>Price:</strong> {product.price}
                    </p>
                    <p className="text-gray-700 text-base">
                      <strong>Color:</strong> {product.color}
                    </p>
                    <p className="text-gray-700 text-base">
                      <strong>Company:</strong> {product.company}
                    </p>
                    <div className='flex mt-2 justify-between'>
                      <Link to={`/updateproduct?id=${product.id}`}>
                        <button className='bg-black text-white px-2 rounded-md'>Update</button>
                      </Link>
                      <button
                        onClick={() => { deleteProduct(product.id) }}
                        className='bg-black text-white px-2 rounded-md'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
        }
      </div>

    </div>
  )
}

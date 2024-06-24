import React from 'react'
import { useState } from 'react';

export default function AddProduct() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [company, setCompany] = useState('');
  const [file, setFile] = useState(null);

  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('color', color);
  formData.append('company', company);
  formData.append('file', file);

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(name, price, color, company, file);
    try {
      let res = await fetch('http://localhost:8000/addproduct', {
        method: 'POST',
        body: formData,
      });
      res = await res.json();
      setName("");
      setPrice("");
      setColor("");
      setCompany("");
      if (res.success) {
        alert(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1 className='text-4xl text-center my-8 font-bold'>ADD PRODUCT</h1>
      <div className='flex justify-center'>
        <form onSubmit={addProduct}
          className=' w-10/12 text-center'>
          <div>
            <span className=''>NAME:</span>
            <input type="text"
              onChange={(e) => { setName(e.target.value) }}
              className='border-black ms-9 border-2 py-1 px-1 rounded-lg'
              placeholder='Enter Product Name' />
          </div>
          <div className='my-2'>
            <span className=''>PRICE:</span>
            <input type="text"
              onChange={(e) => { setPrice(e.target.value) }}
              className='border-black ms-10 border-2 py-1 px-1 rounded-lg'
              placeholder='Enter Product Price' />
          </div>
          <div className='my-2'>
            <span className=''>COLOR:</span>
            <input type="text"
              onChange={(e) => { setColor(e.target.value) }}
              className='border-black ms-9 border-2 py-1 px-1 rounded-lg'
              placeholder='Enter Product Color' />
          </div>
          <div className='my-2'>
            <span className='me-3'>COMPANY:</span>
            <input type="text"
              onChange={(e) => { setCompany(e.target.value) }}
              className='border-black border-2 py-1 px-1 rounded-lg'
              placeholder='Enter Product Company' />
          </div>
          <div className='my-2'>
            IMAGE:
            <input type="file"
              onChange={(e) => { setFile(e.target.files[0]) }}
              className='border-black border-2 py-1 px-1 rounded-lg' />
          </div>
          <div>
            <input type="submit" value='ADD' className='bg-black text-white py-2 px-12 rounded-lg' />
          </div>
        </form>
      </div>
    </div>
  )
}

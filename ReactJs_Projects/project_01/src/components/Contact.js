import React from 'react'
import './Style.css';

const Contact = () => {

  return (
    <div className="container-fluid">
      <div className="row my-5 justify-content-evenly">
        <h1 className='text-center mt-4 mb-5'><u>Contact Us</u></h1>
        <div className="col-md-5">
          <h2>Contact Form</h2>
          <input type="text" className='form-control' placeholder='example@gmail.com' />
          <textarea name="" className='form-control mt-2' rows="10" placeholder='Enter Message'></textarea>
          <button className='btn btn-secondary my-2'>Submit</button>
        </div>
        <div className="col-md-5">
        <h2>Address</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1802.0906309688296!2d68.36790896429397!3d25.398742448558952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c710daa0636f9%3A0xfe61146820b91a1e!2sTower%20Market!5e0!3m2!1sen!2s!4v1701264648837!5m2!1sen!2s" width="100%" className='myMap' loading="auto" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact

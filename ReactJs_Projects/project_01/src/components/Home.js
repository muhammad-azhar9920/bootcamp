import React from 'react'
import './Style.css';

const Home = () => {
  return (
    <div className='container-fluid home' style={{backgroundImage : `url("home-bg-img.jpg")`}}>
      <h1 className='text-center display-2 pt-4 text-white'>Welcome to Our Website</h1>
      <div className="row my-5 justify-content-evenly text-white">
        <div className="col-md-5 mt-2">
        <img src="home-img.jpg" className='img-fluid rounded homeImg' alt="" />
        </div>
        <div className="col-md-5 pt-4 pb-5">
          <h1>Demo Website</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, repudiandae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, quae. lorem10</p>
        </div>
      </div>
    </div>
  )
}

export default Home

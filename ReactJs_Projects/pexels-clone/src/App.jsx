import React from 'react'
import Navbar from './components/Navbar'
import { useEffect,useState } from 'react'
import PexelImages from './components/PexelImages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PexelVideo from './components/PexelVideo';

const App = () => {
  const [pexelimage,setPexelimage] = useState([]);
  const [pexelvideos,setPexeVideos] = useState([]);
  const [search,setSearch] = useState('nature');
  useEffect(()=>{
    const getDataImages = async () =>{
      let data = await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=80`,{
        headers:{
          authorization : "Km7yJRuULdCSuMxe1LcuyQO82Q8nxYCAZeJ0oPjeMkcimM9jUBr4mHwl",
        }
      });
      data = await data.json();
      setTimeout(() => {
        setPexelimage(data.photos)
      }, 2000);
    }
    getDataImages();
    const getDataVideos = async () =>{
      let data = await fetch(`https://api.pexels.com/videos/search?query=${search}&per_page=30`,{
        headers:{
          authorization : "Km7yJRuULdCSuMxe1LcuyQO82Q8nxYCAZeJ0oPjeMkcimM9jUBr4mHwl",
        }
      });
      data = await data.json();
      // console.log(data);
      setTimeout(() => {
        setPexeVideos(data.videos)
      }, 2000);
    }
    getDataVideos();
  },[search])

  return (
    <>
    <BrowserRouter>
    <div id='top'>
     <Navbar setSearch={setSearch} />
    <Routes>
     <Route exact path='/' element={<PexelImages pexelimage={pexelimage}/>}/>
     <Route exact path='/videos' element={<PexelVideo pexelvideos={pexelvideos} />}/>
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App

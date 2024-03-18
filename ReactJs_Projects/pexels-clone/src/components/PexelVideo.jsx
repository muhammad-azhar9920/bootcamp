import React from 'react'

const PexelVideo = ({pexelvideos}) => {
  return (
    <>
    <div className='w-[90vw] mx-auto relative'>
        <div className='grid md:grid-cols-3 grid-cols-1 w-[100%] mt-10'>
        {pexelvideos.length <1 ? ( 
          <div className='w-[100vw] flex justify-center'>
            <img src="spinner.gif" alt="loading..." className='md:w-[400px] w-[100%]' />
          </div>
        ) : (pexelvideos.map((item)=>(
          <div key={item.id}>
            {/* <a href={item.video_files[0].link} download> */}
            <video 
            className='my-2 rounded-xl md:w-[300px] md:h-[300px] w-[300px] md:mx-2 mx-1 h-[300px] cursor-pointer'
             src={item.video_files[0].link             }
            //  type="video/mp4"
            controls
             />
             {/* </a> */}
            </div>
        ))
        )
        }
        </div>
        {
          pexelvideos.length >0 && <a href="#top"><button className='btn bg-white rounded-md px-2  ml-[50%] fixed right-4 top-[70%]'><p className='text-4xl'>&#8679;</p></button></a>  
        }
    </div>
    </>
  )
}

export default PexelVideo

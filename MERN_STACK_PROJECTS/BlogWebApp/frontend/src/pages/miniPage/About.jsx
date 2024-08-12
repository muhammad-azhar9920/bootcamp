import React from 'react'

const About = () => {
  return (
    <div className='my-5 w-[90%] bg-blue-300 flex flex-col mx-auto rounded-lg items-center md:gap-14 gap-8'>
      <h1 className='my-5 md:text-4xl text-2xl font-semibold underline'>About Us</h1>
      {/* accordion */}
      <div className="join join-vertical md:w-[70%] w-11/12 mb-9 h-[50vh]">
        <div className="collapse collapse-arrow join-item border-black border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title md:text-xl text-lg font-medium">What is PakBlog ?</div>
          <div className="collapse-content">
            <p>It's a platform where you can read, write and manage blogs if you follow our guidelines.</p>
            <p>It's a platform where you can boost your content creation skills.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-black border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Can I write blogs on PakBlog ?</div>
          <div className="collapse-content">
            <p>Yes, you can write blogs if you are admin otherwise you can just share your comments as a user.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-black border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">What is Content Creation ?</div>
          <div className="collapse-content">
            <p>Content creation is the art and science of producing valuable, relevant, and consistent content to attract and retain a clearly defined audience. It's the process of generating ideas, developing content, and distributing it across various platforms to engage with your target market.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

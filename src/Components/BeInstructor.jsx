import React from 'react'
import logo from "../assets/become-a-instructor.png"
import { FaArrowRight } from "react-icons/fa";
import Highlightext from './Highlightext';


function BeInstructor() {
  return (
    <div className='flex flex-row '>
        <div className='w-[50%]'>
            <img src={logo} alt="" srcset="" />
        </div>
        <div className='text-white ml-10 w-[40%] my-auto items-center justify-center'>
              <h1 className='font-bold text-[40px]'>Become an </h1>
             <h1 className='font-bold text-[40px]'><Highlightext  text="instructor"></Highlightext></h1>
              <p>instructor from around the world teach millions of students on our platform. We provide the tools and skills to teach what you love.</p>
              <div className="flex gap-4 mt-8">
            <a
              className="inline-flex h-10 gap-2 bg-yellow-400 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="#"
              rel="ugc"
            >
              Start Teaching Today
              <FaArrowRight></FaArrowRight>
            </a>
          </div>
        </div>
    </div>
  )
}

export default BeInstructor

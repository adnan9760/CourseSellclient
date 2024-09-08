import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
  console.log("User image",user);
  return (
    <div className=''>
       <h1 className='mb-14 text-3xl font-medium text-richblack-5 ml-8'>My Profile</h1>

      <div className='ml-[130px]  items-center flex flex-col'>
        <div className='bg-richblack-700 h-[100px] rounded-md p-5  w-[700px] mx-auto max-w-[900px] flex items-center  justify-between' >
             <div className='flex  items-center gap-x-6'>
              <img src={user.image} alt="user image" className="rounded-full w-20
              h-20"/>

                  <div className='flex flex-col text-white font-inter '>
                    <span>{user.firstName} {user.lastName}</span>
                    <span>{user.email}</span>
                  </div>
             </div>
             <button type="button"  onClick={()=>{
               navigate("/dashboard/edit");
             }} class=" mt-auto flex gap-3 text-[18px] focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">edit <FaRegEdit size={20}></FaRegEdit></button>

        </div>
        <div className='mt-[20px] bg-richblack-700 h-full rounded-md p-5  w-[700px] mx-auto max-w-[900px] flex items-center  justify-between'>
          <div className='w-[100%] space-y-3 '>
          <div className="w-full  h-[48px] flex items-center justify-between">
  <h1 className="text-white font-mono">{user.firstName}</h1>
  <button type="button" onClick={()=>{
    navigate("/dashboard/edit");
  }} className="flex gap-3 text-[18px] focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
    edit
    <FaRegEdit size={20} />
  </button>
</div>          
<div className='flex justify-start'>
  <div className='flex flex-col w-[50%]'>
    <p className='text-richblack-200'>First Name</p>
    <p className='text-white text-[13px]'>{user.firstName}</p>
  </div>
  <div className='flex flex-col'>
    <p className='text-richblack-200'>Last Name</p>
    <p className='text-white text-[13px]'>{user.lastName}</p>
  </div>
</div>
<div className='flex justify-start'>
  <div className='flex flex-col w-[50%]'>
    <p className='text-richblack-200'>Email</p>
    <p className='text-white text-[13px]'>{user.email}</p>
  </div>
  <div className='flex flex-col'>
    <p className='text-richblack-200'>Phone Number</p>
    <p className='text-white text-[13px]'>9760049313</p>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}

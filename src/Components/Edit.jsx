import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DeleteAccount } from "../services/operation/authapi";
import ConfirmationModal from "./Common/ConfimmationModal";


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Edit() {

   
    const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        DisplayName: "",
        Profession: "",
        Dob: "",
        Gender: "",
        Phone: "",
        About:"",
        CurrentPassword:"",
        ChangePassword:""
      });
      const dispatch = useDispatch();
      const navigate = useNavigate();
      function HandleConfirm(){
        setIsModalOpen(true);
      }
      function Handlebtn(){
        const userid = user._id;
        try {
            const response = dispatch(DeleteAccount({userid},navigate));
            setIsModalOpen(false);
        } catch (error) {
            
        }
      }
 
      function changeHandler(event) {
        setFormData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
    const submitHandler=()=>{
        // do something
    }
  return (
    <div className="overflow-y-hidden">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 ml-8">Edit</h1>

      <div className="ml-[130px]  items-center flex flex-col">
        <form onSubmit={submitHandler}>
        <div className="bg-richblack-700 h-[100px] rounded-md p-5  w-[700px] mx-auto max-w-[900px] flex items-center  justify-between">
          <div className="flex  items-center gap-x-6">
            <img
              src={user.image}
              alt="user image"
              className="rounded-full w-20
           h-20"
            />

            <div className="flex flex-col text-white font-inter ">
             
              <span className="mb-[8px]">Change Profile Picture</span>
              <div className="flex flex-row gap-x-3">
                <button className="  text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow bg-yellow-50">Change</button>
                <button className=" bg-richblack-700  text-gray-400 font-semibold py-1 px-2 border border-gray-400 rounded shadow">Cancel</button>

              </div>
            </div>
             
          </div>
    
        </div>
        <div className="mt-[20px] bg-richblack-700 h-full rounded-md p-5  w-[700px] mx-auto max-w-[900px] flex items-center  justify-between">
          <div className="w-[100%] space-y-3 ">
            <h1 className="w-[100%] justify-start text-white text-[22px] font-mono font-bold  ">Personal Information</h1>
            
                <div className="flex flex-col space-y-3 w-[100%]">
                <div className="flex justify-start gap-x-4">
                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] font-mono text-richblack-5 mb-1 leading-[1.375rem]">
              Display Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.DisplayName}
              name="DisplayName"
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="profession" className="w-full">
  <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
    Profession <sup className="text-pink-200">*</sup>
  </p>
  <select
    required
    name="Profession"
    onChange={changeHandler}
    value={formData.Profession}
    className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
  >
    <option value="" disabled>Select Profession</option>
    <option value="doctor">Doctor</option>
    <option value="engineer">Engineer</option>
    <option value="teacher">Teacher</option>
    <option value="designer">Designer</option>
    <option value="developer">Developer</option>
    <option value="other">Other</option>
  </select>
</label>

            </div>
            <div className="flex justify-start gap-x-4">
                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] font-mono text-richblack-5 mb-1 leading-[1.375rem]">
             Date of Birth <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="date"
              required    
              onChange={changeHandler}
              value={formData.Dob}
              name="Dob"
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="gender" className="w-full">
  <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
    Gender <sup className="text-pink-200">*</sup>
  </p>
  <select
    required
    name="Gender"
    onChange={changeHandler}
    value={formData.Gender}
    className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</label>


            </div>
            <div className="flex justify-start gap-x-4">
                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] font-mono text-richblack-5 mb-1 leading-[1.375rem]">
              Phone Number <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="digit"
              required
              placeholder="+911234567890"
              onChange={changeHandler}
              value={formData.Phone}
              name="Phone"
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] font-mono text-richblack-5 mb-1 leading-[1.375rem]">
              About <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="digit"
              required
              placeholder="Enter Bio Details"
              onChange={changeHandler}
              value={formData.About}
              name="About"
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5"
            />
          </label>

            </div>
            
                </div>
          </div>
        </div>

        <div className="bg-richblack-700 gap-x-[5px] mt-[16px] rounded-md p-5  w-[700px] mx-auto max-w-[900px] flex flex-col items-center  justify-between">
        <h1 className="w-[100%] justify-start text-white text-[22px] font-mono font-bold  ">Password</h1>

        <div className="flex gap-x-4 w-[100%]">

          <label className="w-[50%] relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Current Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showCurrentPass ? "text" : "password"}
              required
              placeholder="*********"
              onChange={changeHandler}
              value={formData.CurrentPassword}
              name="CurrentPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showCurrentPass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label htmlFor="" className="w-[50%] relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Change Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showChangePass ? "text" : "password"}
              required
              placeholder="Change Password"
              onChange={changeHandler}
              value={formData.ChangePassword}
              name="ChangePassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />

            <span
              onClick={() => setShowChangePass(!showChangePass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showChangePass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
    
        </div>


        <div className="bg-[#340019] gap-x-[20px] mt-[28px] rounded-md p-5 w-[700px] mx-auto max-w-[900px] flex flex-row items-center justify-between">
  <div className="bg-[#691432] rounded-full flex justify-center items-center h-[60px] w-[60px] flex-shrink-0 border border-white">
    <RiDeleteBin6Line className="text-[#d7376f]" size={30} />
  </div>

  <div className="text-white opacity-1">
    <h1 className="text-[18px] font-bold font-mono">Delete Account</h1>
    <p className="text-[16px] font-mono">
      Would you like to delete account?<br />
      This account contains Paid Courses. Deleting your account will remove all the content associated with it.
    </p>
    <p onClick={HandleConfirm} className="font-mono text-[20px] text-[#d7376f] cursor-pointer">
      I want to delete my account.
    </p>
  </div>
</div>
<ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={Handlebtn}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        ></ConfirmationModal>
    <div className="gap-x-4 flex mb-5 justify-end mt-4  ">
    <button className="  font-semibold py-2 px-5 border  border-gray-400 rounded-xl shadow bg-richblack-700 text-white">Cancle</button>
    <button className="  font-semibold py-2 px-5 border border-gray-400 rounded-xl shadow bg-yellow-50 text-white">Save</button>

    </div>
        </form>
      </div>
    </div>
  );
}

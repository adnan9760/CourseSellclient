import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { markaspublic } from '../../../../services/operation/authapi';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../reducer/slices/courseSlice";

export default function Publish() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseid');
  const dispatch = useDispatch();
  async function handleclickpublic(){
         const responce = await dispatch(markaspublic(courseId));
         if(responce.status === 200){
          toast("Your Course Created Successfully");
          navigate("/dashboard/my-courses");
          dispatch(setStep(1));
         }
         else{
          toast.error("Error");
         }      
  }
  function handleclickdraft(){

  }

  return (
    <div className="flex justify-center items-center bg-gray-900">
    <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-xl p-10 text-center transform transition duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-white mb-4">Course Actions</h2>
      <p className="text-gray-400 mb-8">Manage the status of your course by selecting an action below.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button onClick={handleclickdraft} className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-colors duration-300">
          <i className="fas fa-file-alt mr-2"></i> Save as Draft
        </button>
       
        <button onClick={handleclickpublic} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-400 transition-colors duration-300">
          <i className="fas fa-globe mr-2"></i> Make Public
        </button>
      </div>
    </div>
  </div>
  )
}

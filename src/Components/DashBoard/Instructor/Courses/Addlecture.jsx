import React, { useEffect, useState } from 'react';
import { BsCloudUpload } from "react-icons/bs"; // Import BsCloudUpload for the upload icon
import { RxCross2 } from "react-icons/rx";
import { CreateSubSection } from '../../../../services/operation/authapi';
import { useDispatch } from 'react-redux';

export default function AddLecture({state,setstate,sectionid}) {
    console.log("id",sectionid);
    const dispatch = useDispatch();
    const initialFormData = {
        title: "",
        description: "", // Fix typo here
        video: "" // Use 'video' for video files
    };
   

    const [previewVideo, setPreviewVideo] = useState("");
    const [formData, setFormData] = useState(initialFormData);

     async function handleSubmit(event) {
        event.preventDefault();
          const lectureData = {
            ...formData,
            sectionid:sectionid
          };
          try {
            const responce = await dispatch(CreateSubSection(lectureData))
          } catch (error) {
            
          }
        console.log("Form submitted", formData);
    }

    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewVideo(reader.result);
                setFormData((prev) => ({ ...prev, video: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveVideo = () => {
        setPreviewVideo("");
        setFormData((prev) => ({ ...prev, video: "" }));
    };

    function handlevideoChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewVideo(reader.result);
                setFormData((prev) => ({ ...prev, video: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }
    function handlercrossbtn(){
       setstate(!state)

    }
    return (
        <div className=' inset-0 bg-black bg-opacity-50  flex items-center w-[100%] justify-center z-50'>
        
            <form className='w-[700px] bg-richblack-700 p-7' onSubmit={handleSubmit}>
            <div className='justify-between flex mb-3 text-white'>
            <p className='text-[22px]'>Adding Lecture</p>
            <button onClick={handlercrossbtn}><RxCross2  size={20}></RxCross2></button>
            
        </div>
                <label className="w-full mt-3">
                    <p className="text-sm text-white font-medium flex items-center">
                        Lecture Video
                        <sup className="text-pink-400 ml-1">*</sup>
                    </p>
                    <div
                        className="border-2 mt-3 h-[250px] bg-richblack-800 border-dashed border-richblack-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag-over
                    >
                        {previewVideo ? (
                            <div className="relative w-full h-auto">
                                <video controls className="w-full h-auto rounded-lg">
                                    <source src={previewVideo} type="video/mp4" />
                                </video>
                                <button
                                    type="button" // Add type button so it doesn't submit the form
                                    onClick={handleRemoveVideo}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    &times;
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center">
                                <p className="text-lg font-medium mb-2">
                                    <BsCloudUpload size={30} className="text-yellow-50 mx-auto" />
                                    Drag & Drop or Click to Upload
                                </p>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handlevideoChange} // Fix the function name here
                                    className="hidden"
                                    id="videoUpload"
                                />
                            </div>
                        )}
                    </div>
                </label>

                <label className="w-full mt-3">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                        Lecture Title
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        placeholder="Enter Lecture Title"
                        onChange={changeHandler}
                        name="title"
                        className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
                    />
                </label>

                <label className="w-full mt-3">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                        Lecture Description
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <textarea
                        rows={3}
                        type="text"
                        required
                        value={formData.description} // Fix the typo here
                        placeholder="Enter Lecture Description"
                        onChange={changeHandler}
                        name="description" // Fix the typo here
                        className="bg-richblack-800 rounded-[0.3rem] w-full p-[12px] text-richblack-5"
                    />
                </label>

               <div>

               <button 
                    type="submit"
                    className="bg-yellow-500  text-white rounded px-5  p-2 mt-3"
                >
                    Save
                </button>
               </div>

            </form>
        </div>
    );
}

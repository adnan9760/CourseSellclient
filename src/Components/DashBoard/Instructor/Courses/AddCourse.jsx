import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Added import for routing
import CourseBuilder from './CourseBuilder';
import CourseInformation from './CourseInformation';
import Publish from './Publish';

export default function AddCourse() {
    const { user } = useSelector((state) => state.profile);
    const { step } = useSelector((state) => state.course);

    const steps = [
        { id: 1, title: "Course Information" },
        { id: 2, title: "Course Builder" },
        { id: 3, title: "Publish" },
    ];

    return (
        <div className='text-white flex ml-6 mt-5'>
            <div className='w-[665px]'>
                <Link to="/dashboard" className='text-blue-400 text-[12px] hover:underline'>Back to Dashboard</Link>
                <div className='mt-4 justify-evenly w-[80%] flex flex-col mx-auto  '>
                    <div className='flex flex-row flex-shrink-0 justify-between'>
                        {steps.map((item) => (
                            <div
                                key={item.id}
                                className={`w-[40px]  h-[40px] rounded-full flex justify-center items-center ${step === item.id ? "bg-yellow-50 text-yellow-900" : "border-richblack-700 bg-richblack-800 text-richblack-200"}`}
                            >
                                {step > item.id ? <FaCheck className='' /> : <h1 >{item.id}</h1>}
                               
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row flex-shrink-0 mt-4 justify-between'>
                        {steps.map((item) => (
                            <div key={item.id}>
                                <h5 className='text-[16px] font-mono mb-1'>{item.title}</h5>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[80%] mx-auto bg-richblack-700 m-6 '>
                    
                { step === 1 && <CourseInformation></CourseInformation>}
               {step === 2 && <CourseBuilder></CourseBuilder>}
               {step === 3 && <Publish></Publish>}
                </div>
              
            </div>
            <div className='w-[375px] h-[400px] bg-richblack-700 text-[12px] p-6 rounded-md ml-4'>
                <h1 className='text-[18px] mb-4'>⚡Course Upload Tips</h1>
                <ul className='space-y-[15px] font-mono'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    );
}

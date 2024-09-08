import React, { useState } from "react";
import { EnrolledCourse } from "../../data/EnrolledCourse";
import ProgressBar from "@ramonak/react-progress-bar";
export default function EnrolledCourses() {
  const [activeButton, setActiveButton] = useState(0); 
  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex); 
  };
  return (
    <div className="h-full">
      <div>
        <h1 className="mb-14 text-3xl font-medium  text-richblack-5 ml-8">Enrolled Courses</h1>
      </div>
      <div className="ml-6 text-white flex p-[4px] bg-[#2C333F] w-[25%] rounded-full justify-evenly">
      <button
        onClick={() => handleClick(0)}
        className={`text-white font-bold py-2 px-4 rounded-full ${
          activeButton === 0 ? "bg-richblack-900" : "bg-none"
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleClick(1)}
        className={`text-white font-bold py-2 px-4 rounded-full ${
          activeButton === 1 ? "bg-richblack-900" : "bg-none"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => handleClick(2)}
        className={`text-white font-bold py-2 px-4 rounded-full ${
          activeButton === 2 ? "bg-richblack-900" : "bg-none"
        }`}
      >
        Complete
      </button>
    </div>

      <div className="p-6 bg-richblack-900">
  {!EnrolledCourse ? (
    <div className="flex items-center justify-center min-h-[200px] text-lg text-blue-600">
      Loading...
    </div>
  ) : !EnrolledCourse.length ? (
    <p className="text-center text-gray-700 text-lg mt-4">
      You don't have any enrolled courses.
    </p>
  ) : (
    <div className=" mt-6 w-[1062px] h-full overflow-auto ">
      <table className="min-w-full bg-richblack-900  rounded-lg overflow-hidden">
        <thead className="bg-[#2C333F]">
          <tr className="text-white text-left">
            <th className="py-3 px-6">Course Name</th>
            <th className="py-3 px-6">Durations</th>
            <th className="py-3 px-6">Progress</th>
          </tr>
        </thead>
        <tbody>
          {EnrolledCourse.map((course, index) => (
            <tr key={index} className="border-b border-gray-200 ">
              <td className="py-3 px-6 text-white">{course.courseName}</td>
              <td className="py-3 px-6 text-white ">{course.durationHours} hours</td>
              <td className="py-3 px-6 text-white"><ProgressBar height="15px" completed={course.progressPercentage}></ProgressBar></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
}

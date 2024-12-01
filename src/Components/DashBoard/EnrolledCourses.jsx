import React, { useEffect, useState } from "react";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchEnrolledCourse } from "../../services/operation/authapi";
import Learningpage from "./Learningpage";
import { createRatingReview } from "../../services/operation/authapi";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('Learner');
  const [selectedCourse, setSelectedCourse] = useState(null); 

  useEffect(() => {
    const getTimeOfDay = () => {
      const currentHour = new Date().getHours(); 
      if (currentHour >= 5 && currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'Good Afternoon';
      } else if (currentHour >= 17 && currentHour < 21) {
        return 'Good Evening';
      } else {
        return 'Good Night';
      }
    };
    const greetingMessage = `${getTimeOfDay()}, ${name}!`;
    setGreeting(greetingMessage);
  }, [name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(fetchEnrolledCourse());
        setEnrolledCourses(res.data.courses);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      }
    };

    fetchData();
  }, [dispatch]);

 
  const handleClick = (course) => {
    setSelectedCourse(course); 
    <Learningpage selectedCourse={selectedCourse} ></Learningpage>
  };

  return (
    <div className="h-full">
      <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 ml-8">
          {greeting}
        </h1>
      </div>

      {/* If a course is selected, show the LearningPage */}
      {selectedCourse ? (
        <Learningpage course={selectedCourse} />
      ) : (
        <div>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, index) => (
              <div
                key={index}
                className="relative flex flex-col ml-8 my-6 bg-richblack-900 shadow-sm border border-richblack-700 rounded-lg w-96"
              >
                <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                  <img
                    src={course.thumbnail.secure_url}
                    alt="card-image"
                  />
                </div>
                <div className="p-4">
                  <h6 className="mb-2 text-white text-xl font-semibold">{course.title}</h6>
                </div>
                <div className="px-4 pb-4 pt-0 space-x-8 flex justify-center mt-2">
                  <button
                    onClick={() => handleClick(course)} // Pass the course to handleClick
                    className="rounded-md bg-white flex items-center gap-x-1 py-2 px-9 border border-transparent text-center text-sm text-black transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <MdOutlineSlowMotionVideo size={18} />
                    View Course
                  </button>
                  <button className="rounded-md bg-slate-800 py-2 px-9 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Certificate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No enrolled courses found.</p>
          )}
        </div>
      )}
    </div>
  );
}

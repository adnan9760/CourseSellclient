import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Learningpage = ({ selectedCourse }) => {
  const course = selectedCourse?.course;
  console.log("course",course.coursecontent[0])
 const [VideoUrl,setVideoUrl] = useState("https://res.cloudinary.com/dx561fiti/video/upload/v1733010556/ADNAN/jjdoilszul6kixzimdsz.mp4");
  const [openChapters, setOpenChapters] = useState({});

  const toggleChapter = (index) => {
    setOpenChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
//  function handlerclick(VideoUrl){
//     console.log(VideoUrl);
//  }
const handlerclick=(VideoUrl)=>{
    setVideoUrl(VideoUrl);
}
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-richblack-900">
        <p className="text-gray-400 text-lg">No course details available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-richblack-900 text-gray-200">
      {/* Main Content Area */}
      <div className="w-full md:w-2/3 p-6">
      <div className="mb-8">
          <div className="rounded-lg overflow-hidden  max-h-96 aspect-w-16 aspect-h-9">
            <VideoPlayer videoUrl={VideoUrl}/>
          </div>
        </div>
        {/* Course Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-yellow-500">{course.title}</h2>
          <p className="text-gray-300 mt-2 text-lg">{course.desc}</p>
        </div>

        {/* Video Player */}
        
      </div>

      <div className="w-full md:w-1/3 bg-richblack-800 border-l border-richblack-700 p-4">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">Course Content</h3>
        {course.coursecontent?.length > 0 ? (
          <ul>
            {course.coursecontent.map((chapter, index) => (
              <li
                key={index}
                className="mb-4 bg-richblack-700 p-4 rounded-lg cursor-pointer"
              >
                {/* Chapter Title */}
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleChapter(index)}
                >
                  <h4 className="text-lg font-medium">{chapter.sectionName}</h4>
                  <span className="text-yellow-500">
                    {openChapters[index] ? "▲" : "▼"}
                  </span>
                </div>

                {/* Subsections (Collapsible) */}
                {openChapters[index] && (
                  <ul className="mt-2 pl-4">
                    {chapter.subSection?.length > 0 ? (
                      chapter.subSection.map((lesson, lessonIndex) => (
                        <li onClick={()=>{
                            handlerclick(lesson.VideoUrl)
                        }}
                          key={lessonIndex}
                          className="mt-1 hover:text-yellow-500 text-sm"
                        >
                          {lesson.title}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm mt-2">
                        No lessons available.
                      </p>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No course content available.</p>
        )}
      </div>
    </div>
  );
};

export default Learningpage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchcoursedetail } from '../services/operation/authapi';
import { useSelector } from 'react-redux';
import { addProduct } from '../reducer/slices/cartSlice'
import { removeProduct } from '../reducer/slices/cartSlice'
import { GetAvgReviews } from '../services/operation/authapi';
import { clearCart } from '../reducer/slices/cartSlice'
import { 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Star, 
  Clock, 
  BookOpen, 
  UserPen,
  Award,
  MessageCircle
} from 'lucide-react';

const CourseDetailPage = () => {
  const cart = useSelector((state)=>state.cart.cart);
  const total = useSelector((state)=>state.cart.total);
  const totalitem = useSelector((state)=>state.cart.totalItem)
  const dispatch = useDispatch();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseid');
  const [course, setCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading,setloading]= useState(false);
  const [Avgrating,setAvgrating]= useState(0);



  useEffect(()=>{
    // const courseId = course._id;
    const fetchReviews = async () => {
      try {
           const responce = await dispatch(GetAvgReviews({courseId}));
           console.log("responces",responce);
           setAvgrating(responce.AvgRating);

      } catch (error) {
        console.log(error);
        
      }
    }
    fetchReviews();
   },[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchcoursedetail(courseId));
        console.log("revs",response.data)
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchData();
  }, []);
   
  
  if (!course) {
    return (
        <div className="flex justify-center items-center mt-20">
            <div className="loader"></div>
        </div>
    );
}

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-['Inter']">
      <div className="relative">
        <div className="w-full aspect-video bg-black">
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={course.thumbnail.secure_url}
                alt={course.title}
                className="w-full h-full object-cover opacity-60"
              />
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-yellow-500 text-black rounded-full p-6 hover:bg-yellow-400 
                         transition-all duration-300 hover:scale-110 group"
              >
                <Play className="w-8 h-8 fill-current" />
              </button>
            </div>
          ) : (
            <video 
              controls 
              className="w-full h-full"
              poster={course.thumbnail.secure_url}
            >
              <source src={course.previewVideo} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Course Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Title and Stats */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-100">{course.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-400">(128 reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>{course.totalDuration || 'N/A'} hours total</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <BookOpen className="w-5 h-5" />
                <span>{course.chapters?.length || 'N/A'} chapters</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <UserPen className="w-5 h-5" />
                <span>{course.instructor.firstName} </span>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About This Course</h2>
            <p className="text-gray-300 leading-relaxed">
              {course.desc}
            </p>
          </div>

          {/* Chapters Accordion */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Course Content</h2>
            <div className="space-y-3">
              {course.coursecontent && course.coursecontent.map((chapter, index) => (
                <div 
                  key={index}
                  className="border border-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setActiveChapter(activeChapter === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-900 hover:bg-gray-800 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-500 font-medium">
                      {chapter.sectionName}
                      </span>
                      {/* <h3 className="font-medium text-left">{chapter.sectionName}</h3> */}
                    </div>
                    {activeChapter === index ? 
                      <ChevronUp className="w-5 h-5 text-yellow-500" /> : 
                      <ChevronDown className="w-5 h-5 text-yellow-500" />
                    }
                  </button>
                  {activeChapter === index && (
                    <div className="bg-gray-900/50 p-4 space-y-2">
                      {chapter.subSection && chapter.subSection.map((lesson, lessonIndex) => (
                        <div 
                          key={lessonIndex}
                          className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors duration-150 p-2"
                        >
                          <Play  className="w-4 h-4" />
                          <span>{lesson.title}</span>
                          <span className="text-sm text-gray-500 ml-auto">
                            {lesson.timeduration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
          {/* <h2 className="text-2xl font-semibold">{Avgrating} Course Rating</h2> */}
            <h2 className="text-2xl font-semibold">Student Reviews</h2>
            <div className="space-y-4">
              {course.reviews && course.reviews.map((review, index) => (
                <div key={index} className="border border-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-yellow-500 font-medium">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-6">
            <div className="text-3xl font-bold text-yellow-500">
              ₹{course.price.toLocaleString('en-IN')}
            </div>
            
            <button
 onClick={() => {
  const isLoggedIn = localStorage.getItem('token'); 

  if (isLoggedIn) {
    dispatch(addProduct({
      id: course._id,
      name: course.title,
      image: course.thumbnail.secure_url,
      price: course.price
    }));
  } else {
    alert("Please log in to add items to the cart.");
    window.location.href = '/login';
  }
}}

  className="w-full bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-400 active:bg-yellow-600 transition-colors duration-150"
>
  Add to Cart
</button>


            <div className="space-y-4">
              <h3 className="text-xl font-semibold">This course includes:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span>{course.timeduration || '2'} hours on-demand video</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <BookOpen className="w-5 h-5 text-yellow-500" />
                  <span>{course.chapters?.length || 'N/A'} downloadable resources</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Share your thoughts:</h3>
              <button className="w-full bg-gray-800 text-yellow-500 font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-colors duration-150 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CourseDetailPage;

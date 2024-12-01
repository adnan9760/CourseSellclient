import React from 'react';
import { StarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../reducer/slices/cartSlice'
import { useDispatch } from 'react-redux';

function Card({ course }) {
  const dispatch = useDispatch();
  console.log("")
  const navigate = useNavigate();
  function handleclick(){
    navigate("/course/?courseid="+course._id);
    
  }
  return (
    <div className="group h-full">
      <div className="h-full rounded-xl border border-gray-800 bg-richblack-800 shadow-md transition-all duration-200 hover:shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative">
          <img
            src={course.thumbnail.secure_url}
            width="400"
            height="225"
            alt="Course Thumbnail"
            className="w-full rounded-t-xl object-cover aspect-video"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-xl flex items-center justify-center">
            <button onClick={handleclick} className="px-4 py-2 bg-yellow-500 text-black rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-200 hover:bg-yellow-400">
              View Course
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-[#121212] rounded-b-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-100 line-clamp-1">
              {course.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <StarIcon className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <span className="text-sm font-medium text-gray-300">
                {course.instructor.firstName.charAt(0)}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {course.instructor.firstName}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-gray-800">
            <div className="font-bold text-lg text-yellow-500">
              ₹{course.price.toLocaleString('en-IN')}
            </div>
            <button  onClick={() => dispatch(addProduct({
    id:course._id,
    name: course.title,
    image: course.thumbnail.secure_url,
    price: course.price
  }))}  className="px-4 py-2 bg-yellow-500 text-black text-sm font-medium rounded-lg hover:bg-yellow-400 active:bg-yellow-600 transition-colors duration-150">
             Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
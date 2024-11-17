import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchuserdetail } from '../../services/operation/authapi'

const MyCourses = () => {
    const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (userData && userData._id) {
            const response = await dispatch(fetchuserdetail(userData._id));
            console.log('Response:jjjjjhjhj', response.data.courses);
            setCourses(response.data.courses);
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
  
      fetchData();
    }, []);

//   const courses = [
//     {
//       _id: '1',
//       title: 'React for Beginners',
//       desc: 'Learn the basics of React and build your first web app.',
//       thumbnail: 'https://via.placeholder.com/300x200',
//       status: 'Draft',
//       price: 29.99,
//       studentEnrolled: 120,
//     },
//     {
//       _id: '2',
//       title: 'Advanced Node.js',
//       desc: 'Deep dive into Node.js and build scalable server-side applications.',
//       thumbnail: 'https://via.placeholder.com/300x200',
//       status: 'Published',
//       price: 49.99,
//       studentEnrolled: 80,
//     },
//     {
//       _id: '3',
//       title: 'CSS Mastery',
//       desc: 'Master CSS and create stunning web pages with advanced styling techniques.',
//       thumbnail: 'https://via.placeholder.com/300x200',
//       status: 'Published',
//       price: 19.99,
//       studentEnrolled: 200,
//     },
//   ];

  return (
    
    <div className="container mx-auto p-6 bg-richblack-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white mb-4">My Created Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="p-4 bg-richblack-700 rounded-md">
            <img 
              src={course.thumbnail.secure_url} 
              alt={course.title} 
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-2xl font-semibold text-white mb-1">{course.title}</h2>
            <p className="text-gray-300 mb-2">{course.desc}</p>
            <div className="text-sm text-gray-400 mb-2">
              <strong>Status:</strong> {course.status}
            </div>
            <div className="text-sm text-gray-400 mb-2">
              <strong>Price:</strong> ${course.price}
            </div>
            <div className="text-sm text-gray-400 mb-2">
              <strong>Enrolled Students:</strong> {course.studentEnrolled}
            </div>
            <div  className="flex justify-between mt-4">
              <button className="text-blue-500 hover:text-blue-300">
                <FaEdit className="inline mr-1" /> Edit
              </button>
              <button className="text-red-500 hover:text-red-300">
                <FaTrash className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;

import React, { useEffect, useState } from "react";
import { createRatingReview } from "../../services/operation/authapi";
import { fetchAllReview } from "../../services/operation/authapi";
import { GetAvgReviews } from "../../services/operation/authapi";
import { useDispatch } from "react-redux";
import toast, { ToastBar } from "react-hot-toast";

const RatingAndReviewPage = ({ selectedCourse }) => {
  const course = selectedCourse?.course;
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const dispatch = useDispatch();
  const handleRatingChange = (rating) => setUserRating(rating);
  const handleReviewChange = (e) => setUserReview(e.target.value);
   const[ReviewData,setReviewData] = useState({
    rating:0,
    review:"",
    course_id:course.id,
   });
   useEffect(()=>{
    const courseId = course._id;
    const fetchReviews = async () => {
      try {
           const responce = await dispatch(GetAvgReviews({courseId}));
           console.log("responces",responce)
      } catch (error) {
        
      }
    }
    fetchReviews();
   },[]);
   useEffect(() => {
    const fetchReviews = async () => {
      try {
       const courseId = course._id;
        const res = await dispatch(fetchAllReview({courseId})); 
        console.log('fetch data',res.data.data)
        setReviews(res.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
       
      }
    };

    fetchReviews(); 
  }, []);
  const submitReview = async() => {
    setReviewData((prevData) => ({ ...prevData, rating: userRating, review:userReview,course_id:course._id}))
        try {
            const res= await dispatch(createRatingReview({ReviewData}));
               
            console.log(res.data);
            setReviews([res.data]);
            setUserReview("");
            setUserRating(0);
            window.location.reload();


            


        } catch (error) {
            console.log("eroro",error)
            
        }
  };


  return (
    <div className="p-6 bg-richblack-900 w-2/3 min-h-screen text-gray-200">
   
      <div className="mb-8">
        <p className="text-yellow-900 mt-2  text-[20px]">
          Share your feedback and see what others think about this course.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">Submit Your Review</h3>
        <div className="flex items-center space-x-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  userRating >= star ? "text-yellow-500" : "text-gray-500"
                }`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="w-full p-3 rounded-md bg-richblack-800 border border-richblack-700 text-gray-200 resize-none"
            rows="3"
            placeholder="Write your review here..."
            value={userReview}
            onChange={handleReviewChange}
          ></textarea>
          <button
            onClick={submitReview}
            className="bg-yellow-500 hover:bg-yellow-600 text-richblack-900 font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-richblack-800 p-4 rounded-lg border border-richblack-700"
              >
                <div>

                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-300">
                    {review.user.firstName}
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          review.rating >= star ? "text-yellow-500" : "text-gray-500"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 mt-2">{review.review}</p>
                {/* <p className="text-gray-500 text-sm mt-1">
                  {new Date(review.created_at).toLocaleDateString()}
                </p> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review this course!</p>
        )}
      </div>
    </div>
  );
};

export default RatingAndReviewPage;

import React, { useEffect, useState } from "react";
import Star from "../assets/star1.svg";
import Star1 from "../assets/empty.svg";
import Star2 from "../assets/halffilled.svg";
import { GetallReview } from "../services/operation/authapi";
import { useDispatch } from "react-redux";


export let userdata = [
  {
    username: "john_doe",
    rating: 4.5,
    comment: "Great course! Very informative and well-structured.",
    date: "2024-07-25",
  },
  {
    username: "jane_smith",
    rating: 3.0,
    comment: "The content is good, but the pacing is a bit slow.",
    date: "2024-07-26",
  },
  {
    username: "alice_wonderland",
    rating: 5.0,
    comment: "Absolutely loved it! The instructor is very knowledgeable.",
    date: "2024-07-27",
  },
  {
    username: "bob_builder",
    rating: 2.5,
    comment: "Found it hard to follow. Needs more practical examples.",
    date: "2024-07-28",
  },
  {
    username: "charlie_brown",
    rating: 4.0,
    comment: "Good course, but some sections could be more detailed.",
    date: "2024-07-29",
  },
  {
    username: "diana_prince",
    rating: 4.8,
    comment: "Excellent course! Highly recommend.",
    date: "2024-07-30",
  },
  {
    username: "edward_snowden",
    rating: 3.5,
    comment: "Informative, but the assignments were a bit challenging.",
    date: "2024-07-31",
  },
  {
    username: "fiona_shrek",
    rating: 4.2,
    comment: "Very good course. Learned a lot of new things.",
    date: "2024-08-01",
  },
  {
    username: "george_washington",
    rating: 3.8,
    comment: "Well-organized course, but could use more visuals.",
    date: "2024-08-02",
  },
  {
    username: "harry_potter",
    rating: 4.7,
    comment: "Amazing course! The practical sessions were very helpful.",
    date: "2024-08-03",
  },
];

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  
 

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <img key={`full-${i}`} src={Star} alt="Filled Star" className="w-4 h-4" />
        ))}
      {halfStars === 1 && <img src={Star2} alt="Half Star" className="w-4 h-4" />}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <img key={`empty-${i}`} src={Star1} alt="Empty Star" className="w-4 h-4" />
        ))}
    </div>
  );
}

function Comment() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewsToShow = 6; 
  const maxIndex = Math.ceil(userdata.length / reviewsToShow) - 1;
  const dispatch = useDispatch();
  const [review ,setreview]= useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await dispatch(GetallReview());
        console.log("Response review DATA:", res.data.data);
        setreview(res.data.data); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const displayedReviews = userdata.slice(
    currentIndex * reviewsToShow,
    currentIndex * reviewsToShow + reviewsToShow
  );

  return (
    <section className="bg-gradient-to-b from-richblack-800 to-richblack-200 px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-400">Course Reviews</h2>
          <p className="text-gray-400">See what our students have to say about this course.</p>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {review.map((user, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 mx-4 rounded-lg bg-gray-900 p-6 shadow-lg border transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="flex items-center gap-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border">
                    <img
                      className="aspect-square h-full w-full"
                      alt="User Avatar"
                      src="/placeholder-user.jpg"
                    />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">{user.user.firstName}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">{renderStars(user.rating)}</div>
                  </div>
                </div>
                <p className="mt-4 text-white">{user.review}</p>
              </div>
            ))}
          </div>
          <div
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-700"
            onClick={handlePrev}
          >
            &lt;
          </div>
          <div
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md cursor-pointer hover:bg-gray-700"
            onClick={handleNext}
          >
            &gt;
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comment;

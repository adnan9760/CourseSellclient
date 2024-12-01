import React from 'react'
import VideoPlayer from './VideoPlayer'
import CourseContent from './CourseContent'
import RatingAndReviewPage from './Rating&Review'

function Learningpage(selectedCourse) {

  return (
    <div>  
   
        <CourseContent selectedCourse={selectedCourse}></CourseContent>
        <RatingAndReviewPage selectedCourse={selectedCourse}></RatingAndReviewPage>
           
    </div>
  )
}

export default Learningpage
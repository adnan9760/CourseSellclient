import React from "react";
import apiconnector from "../apiconnector";
import { catagories } from "../apis";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Form, useNavigate } from "react-router-dom";
import { setToken } from "../../reducer/slices/authSlice";
import { setUser } from "../../reducer/slices/profileSlice";
import { setStep } from "../../reducer/slices/courseSlice";
import { initializeUserCart } from "../../reducer/slices/cartSlice";

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("otp", response.data);
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verifyotp");
      return response.data;
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
  };
}

export default function signup({
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmpassword,
  otp,
}) {
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
      });

      console.log("response", response);

      if (!response.data.data) {
        throw new Error(response.data.message);
      }

      toast.success("Successful Register");
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.message || error);
      toast.error("Signup failed: " + (error.message || "Unknown error"));

      return { success: false, message: error.message || "Signup failed" };
    }
  };
}
export function LoginHandler({ email, password }, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.LOGIN_API, {
        email,
        password,
      });

      console.log("response data", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      const userId = response.data.user._id;
      
      dispatch(setToken(response.data.token));

      const userImage =
        response.data?.user?.image !== null
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      const updatedUser = { ...response.data.user, image: userImage };
      console.log("Updated user:", updatedUser);

      dispatch(setUser(updatedUser));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      dispatch(initializeUserCart(userId));

      // Navigate to the user's profile page
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Login error:", error);  // Handle errors
    }
  };
}


export function forgetpassword(props) {
  const { email } = props;
  const { setSentMail } = props;
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.RESET_API, {
        email,
      });

      if (response.status === 200) {
        setSentMail(true);
        toast.success("Email sent successfully");
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function DeleteAccount(userid, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiconnector(
        "DELETE",
        catagories.DELETE_ACCOUNT_API,
        {
          userid,
        }
      );
      console.log("response ", response);
      if (response.status === 200) {
        toast.success("Account deleted successfully");
        // dispatch(setUser(null));
        // dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };
}
export function CreateCourse({
  title,
  image,
  description,
  price,
  category,
  courseBenefit,
}) {
  return async (dispatch) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("courseName", title);
      formDataToSend.append("CourseDescription", description);
      formDataToSend.append("WhatWillYouLearn", courseBenefit);
      formDataToSend.append("price", price);
      formDataToSend.append("Tag", category);
      formDataToSend.append("thumbnailImage", image);

      if (image) {
        const blob = dataURItoBlob(image);
        formDataToSend.append("thumbnailImage", blob, "thumbnail.jpg");
      }

      const response = await apiconnector(
        "POST",
        catagories.CREATE_COURSE_API,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      console.log("response", response);
      if (response.status === 200) {
        toast.success("Course created successfully");
        dispatch(setStep(2));
        // navigate(`/course?courseId=${response.data.id}&name=${response.data.name}`);
      }
      return response;
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

export function CreateBuilder({ courseid, section }) {
  console.log("name", section);
  return async (dispatch) => {
    try {
      const response = await apiconnector(
        "POST",
        catagories.CREATE_COURSE_BUILDER,
        {
          CourseId: courseid,
          sectionName: section,
        },
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      console.log("responce", response.data.status);
      return response;
    } catch (error) {
      console.error("Error creating course builder:", error);
    }
  };
}
export function EditSection({ editedName, sectionid }) {
  console.log("SectionName", sectionid);
  return async (dispatch) => {
    try {
      const responce = await apiconnector(
        "PUT",
        catagories.CREATE_COURSE_UPDATE_SECTION,
        {
          sectionName: editedName,
          sectionId: sectionid,
        },
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      if (responce.data.status === true) {
        toast.success("Section Updated");
      }
    } catch (error) {
      console.error("Error upadte section course builder:", error);
    }
  };
}
export function CreateSubSection({ title, description, video, sectionid }) {
  console.log("Section ID:", sectionid);
  console.log("Video Data:", video);
  console.log("Desc", description);

  return async (dispatch) => {
    try {
      let formdatatosend = new FormData();
      formdatatosend.append("title", title);
      formdatatosend.append("description", description);
      formdatatosend.append("sectionId", sectionid);
      formdatatosend.append("timeduration", 60);

      if (typeof video === "string") {
        const blob = dataURItoBlobvideo(video);
        formdatatosend.append("VideoUrl", blob, "video.mp4");
      } else {
        console.error("Video is not a valid data URI string:", video);
      }

      const response = await apiconnector(
        "POST",
        catagories.CREATE_COURSE_SUBSECTION,
        formdatatosend,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      if (response.status === 200) {
        toast.success("SubSection Created");
      } else {
        toast.error("Error Creating SubSection");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating subsection in course builder:", error);
    }
  };
}

function dataURItoBlobvideo(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "video/mp4" });
}

//FETCH SUBSECTION
export function fetchSubsection(sectionId) {
  return async (dispatch) => {
    try {
      const fetchdata = await apiconnector(
        "GET",
        `${catagories.CREATE_COURSE_SUBSECTION_FETCH}?sectionId=${sectionId}`,
        null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      dispatch({ type: "FETCH_SUBSECTION_SUCCESS", payload: fetchdata });
      return fetchdata.data;
    } catch (error) {
      console.error("Error fetching subsection in course builder:", error);
      dispatch({ type: "FETCH_SUBSECTION_FAILURE", error: error.message });
    }
  };
}

export function DeleteSection(sectionId) {
  console.log("section id idise ", sectionId);
  return async (dispatch) => {
    try {
      const responce = await apiconnector(
        "DELETE",
        `${catagories.CREATE_COURSE_DELETE_SECTION}?sectionId=${sectionId}`,
        null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      dispatch({ type: "DELETE_SECTION_SUCCESS", payload: responce });
      return responce;
    } catch (error) {}
  };
}

export function Fetchsection(courseId) {
  return async (dispatch) => {
    try {
      const fetchsection = await apiconnector(
        "GET",
        `${catagories.FETCH_SECTION}?courseId=${courseId}`,
        null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      const { data } = fetchsection;
      dispatch({ type: "FETCH_SECTION_SUCCESS", payload: data });
      return data;  // Return the data directly
    } catch (error) {
      console.error("Error fetching section:", error);
    }
  };
}
export function markaspublic(courseId){
  return async (dispatch)=>{
            try {
                const responce = await apiconnector("PUT",`${catagories.PUBLIC_COURSE}?courseId=${courseId}`,
                  null,
                  {
                    "Content-Type": "multipart/form-data",
                    Auth: `Bearer ${localStorage.getItem("token")}`,
                  }
                )
                console.log("response",responce)
                return responce
            } catch (error) {
              console.error("Update course as a public error:", error);
            }
  }
}

export function fetchuserdetail(userId) {
  return async (dispatch) => {
    try {
      const response = await apiconnector(
        "GET",
        `${catagories.FETCH_COURSE}?userId=${userId}`,
        null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      console.log("Response:", response);

     return response.data;

    } catch (error) {
      console.error("Error fetching user details:", error);

      dispatch({
        type: 'FETCH_USER_DETAIL_FAILURE',
        payload: error.message,
      });
    }
  };
}
export function fetchallcoursedetail(){
  return async (dispatch) => {
   try {
      const  responce = await apiconnector("GET",catagories.FETCH_ALL_COURSE,null);


      console.log("res",responce);
      return responce;
   } catch (error) {
    console.error("Error fetching all course details:", error);
   }
  }
}

 export function fetchcoursedetail(courseId){
  return async (dispatch) => {
       try {
        const responce = await apiconnector("GET",`${catagories.FETCH_SPECIFICCOURSE}?courseId=${courseId}`,null);

       console.log("res",responce);
       return responce.data;
       } catch (error) {
        console.error("Error fetching course details:", error);
       }
  }
 };
export function capturestate(courseId){
  return async (dispatch) => {
    try {
      const responce = await apiconnector("POST",`${catagories.PAYMENT_CAPTURE}?courseId=${courseId}`,null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
   
      );
      console.log("respayment",responce);
      return responce.data;
    
    } catch (error) {
      
    }
  }
}

export function fetchEnrolledCourse(){
  return async (dispatch) => {
    try {
      const responce = await apiconnector("GET",catagories.FETCH_ENROLL_COURSE,
        null,
        {
          "Content-Type": "multipart/form-data",
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
   
      );
      console.log("res",responce);
      return responce.data;
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  }
}

export function createRatingReview(ReviewData) {
  return async (dispatch) => {
    try {
      const { rating, review, course_id } = ReviewData.ReviewData;
      const response = await apiconnector(
        "POST",
        catagories.CREATE_RATING_REVIEW,
        {
          rating: rating, 
          review: review, 
          courseId:course_id, 
        },
        {
          "Content-Type": "multipart/form-data", 
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      console.log("Review created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };
}


export function fetchAllReview({courseId}) {

  return async (dispatch) => {
    try {
      console.log("cour",courseId)
      const response = await apiconnector(
        "GET",
        `${catagories.FETCH_RATING_REVIEW}?courseId=${courseId}`,
        null,
        {
          "Content-Type": "multipart/form-data", 
          Auth: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      console.log("Review fetch successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };
}
  export function GetallReview (){
    return async (dispatch) => {
      try {
        const responce = await apiconnector("GET",catagories.FETCH_ALL_REVIEW,null);
        console.log("Review fetch successfullydddd:", responce.data);
        return responce;
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    }
  }

 export function GetAvgReviews({courseId}){
 
  return async (dispatch) => {
    try {
       const response = await apiconnector("GET", `${catagories.FETCH_AVG_RATING}?courseId=${courseId}`,null);
       const data = response.data;
       console.log(data);
       return data;
    } catch (error) {
      console.error("Error fetching review:", error); 
    }
  }
 }



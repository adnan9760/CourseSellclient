import React from "react";
import apiconnector from "../apiconnector";
import { catagories } from "../apis";
import toast from "react-hot-toast";
import { Form, useNavigate } from "react-router-dom";
import { setToken } from "../../reducer/slices/authSlice";
import { setUser } from "../../reducer/slices/profileSlice";
import { setStep } from "../../reducer/slices/courseSlice";

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
      console.log("response data1", response.data.success);
      if (!response.data.success === true) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage =
        response.data?.user?.image !== null
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      console.log("image", userImage);
      const updatedUser = { ...response.data.user, image: userImage };
      console.log("upadted user", updatedUser);
      dispatch(setUser(updatedUser));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/dashboard/my-profile");
    } catch (error) {}
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
  console.log("Desc",description);


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

     if(response.status === 200){
      toast.success("SubSection Created");
     }
     else{
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


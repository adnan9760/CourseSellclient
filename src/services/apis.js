const BASE_URL = process.env.REACT_APP_BASE_URL;

export const catagories = {
  CATAGORIES_API: BASE_URL + "/course/getAlldeatil",
  SIGNUP_API : BASE_URL + "/auth/Signup",
  SENDOTP_API : BASE_URL + "/auth/SendOTP",
  LOGIN_API : BASE_URL + "/auth/Login",
  RESET_API: BASE_URL + "/auth/forget-password",
  DELETE_ACCOUNT_API: BASE_URL + "/Profile/deleteAccount",
  UPDATE_PROFILE_API: BASE_URL + "/Profile/additionaldetail",
  CREATE_COURSE_API: BASE_URL + "/course/Createcourse",
  CREATE_COURSE_BUILDER:BASE_URL + "/course/createSection",
  CREATE_COURSE_UPDATE_SECTION:BASE_URL + "/course/updateCourse",
  CREATE_COURSE_SUBSECTION:BASE_URL + "/course/createSubsection"

};

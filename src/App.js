import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/DashBoard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import ExploreCourse from "./pages/ExploreCourse";
import VerifyOTP from "./pages/VerifyOTP";
import ForgetPassword from "./pages/ForgetPassword";
import Course from "./pages/Course";
import MyProfile from "./Components/DashBoard/MyProfile";
import Edit from "./Components/Edit";
import EnrolledCourses from "./Components/DashBoard/EnrolledCourses";
import Cart from "./Components/DashBoard/Cart";
import AddCourse from "./Components/DashBoard/Instructor/Courses/AddCourse";
import { useSelector } from "react-redux";
import MyCourses from "./Components/DashBoard/MyCourse";
import CourseDetailPage from "./Components/Coursecarddetail";
import ShoppingCart from "./Components/Addtocart";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      navigate("/login");
    } else {
      // Optional: Validate the token with an endpoint if needed
      // Example:
      // fetch('/validate-token', {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     if (!data.valid) navigate("/login");
      //     else setLoading(false);
      //   });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/explore" element={<ExploreCourse />} />
        <Route path="/catalog" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/course/*" element={<CourseDetailPage></CourseDetailPage>}/>
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        >
           
          <Route path="my-profile" element={<MyProfile />} />
          {user?.accountType === "student" && (
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
          )}
          {user?.accountType === "instructor" && (
            <Route path="add-course" element={<AddCourse />} />
          )}
          <Route path="edit" element={<Edit />} />
          <Route path="cart" element={<Cart />} />
          <Route path="my-courses" element={<MyCourses></MyCourses>}/>
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

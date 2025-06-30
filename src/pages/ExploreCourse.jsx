import React, { useState } from "react";
import online from "../assets/online_course.webp";

export let coursedata = [
  {
    courseId: "web_dev_101",
    title: "Web Development for Beginners",
    category: "Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
    instructor: "John Doe",
    rating: 4.5,
    reviews: 120,
    price: 49.99,
    dateAdded: "2024-01-15",
  },
  {
    courseId: "react_native_202",
    title: "Advanced React Native",
    category: "Mobile Development",
    description: "Master React Native to build cross-platform mobile applications.",
    instructor: "Jane Smith",
    rating: 4.8,
    reviews: 95,
    price: 79.99,
    dateAdded: "2024-03-10",
  },
  {
    courseId: "python_ml_303",
    title: "Machine Learning with Python",
    category: "Data Science",
    description: "An in-depth course on machine learning algorithms and techniques using Python.",
    instructor: "Alice Wonderland",
    rating: 4.7,
    reviews: 150,
    price: 99.99,
    dateAdded: "2024-02-20",
  },
  // Add more courses here...
];

function ExploreCourse() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories
  const categories = ["All", ...new Set(coursedata.map((course) => course.category))];

  // Filter courses based on active category
  const filteredCourses =
    activeCategory === "All"
      ? coursedata
      : coursedata.filter((course) => course.category === activeCategory);

  return (
    <div className="explore-course justify-between items-center w-11/12 max-w-[1160px] mx-auto">
      {/* Hero Section */}
      <section className="hero w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-yellow-300 to-yellow-500">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
              Explore Our Courses
            </h1>
            <p className="mx-auto max-w-[700px] text-black md:text-xl">
              Find the perfect course to expand your knowledge and skills.
            </p>
            <div className="mx-auto max-w-md">
              <input
                className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 w-full"
                placeholder="Search courses..."
                type="search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="tabs flex justify-center gap-6 my-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-6 py-3 text-sm font-medium rounded-full shadow-md transition duration-300 ${
              activeCategory === category
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-black hover:bg-yellow-100"
            }`}
          >
            {activeCategory === category && (
              <span className="absolute inset-0 w-full h-full border-4 border-yellow-500 rounded-full -z-10"></span>
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Courses Section */}
      <section className="courses w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.courseId}
                  className="course-card relative overflow-hidden rounded-lg shadow-lg bg-gray-800 group transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <a className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View Course</span>
                  </a>
                  <img
                    src={online}
                    alt="Course Image"
                    width="400"
                    height="225"
                    className="object-cover w-full aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <p className="text-sm text-gray-400">{course.description}</p>
                    <p className="font-bold text-yellow-500">{course.instructor}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm font-medium text-gray-400">
                        {course.category}
                      </div>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium text-white bg-yellow-500 hover:bg-blue-700 rounded-md px-3 py-2 transition duration-300 focus-visible:outline-none"
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No courses available in this category.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExploreCourse;

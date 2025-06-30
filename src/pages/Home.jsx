import React, { useEffect, useState } from "react";
import online from "../assets/online_course.webp";
import Card from "../Components/Card";
import Highlightext from "../Components/Highlightext";
import BeInstructor from "../Components/BeInstructor";
import Comment from "../Components/Comment";
import { fetchallcoursedetail } from "../services/operation/authapi";
import { useDispatch } from "react-redux";

function Home() {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchallcoursedetail());
        console.log("Courses Data:", response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className="text-white flex flex-col justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
        {/* Header Section */}
        <header className="bg-primary text-primary-foreground py-6 md:py-12 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 transition-opacity duration-500 hover:opacity-90">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Unlock Your Potential with Our Online Courses
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80">
                  Explore a wide range of courses and take your skills to the next level.
                </p>
                <div className="flex gap-4">
                  <a
                    className="inline-flex h-10 bg-yellow-400 items-center justify-center rounded-md px-6 text-sm font-medium text-primary shadow transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    href="#"
                    rel="ugc"
                  >
                    Browse Courses
                  </a>
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-6 text-sm font-medium text-primary-foreground shadow-sm transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    href="#"
                    rel="ugc"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="relative">
                <img
                  src={online}
                  width="800"
                  height="600"
                  alt="Online Courses"
                  className="rounded-xl object-cover aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1  w-11/12 max-w-[1160px]">
          {/* Featured Courses Section */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  Featured Courses
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Explore Our Top Courses
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover a wide range of online courses to enhance your skills and knowledge.
                </p>
              </div>
              {/* Horizontal Scrollable Courses */}
              <div className="overflow-x-scroll overflow-y-scroll  whitespace-nowrap no-scrollbar">
  <div className="inline-flex gap-6 max-w-full">
    {courses.slice(0, 10).map((course, index) => (
      <div key={index} className="min-w-[250px] transition-transform transform hover:scale-105">
        <Card course={course} />
      </div>
    ))}
  </div>
</div>

              <div className="flex mx-auto justify-center items-center mt-8">
                <a
                  className="inline-flex h-10 bg-yellow-400 items-center justify-center rounded-md px-6 text-sm font-medium text-primary shadow transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  href="/Explore"
                  rel="ugc"
                >
                  Explore All The Courses
                </a>
              </div>
            </div>
          </section>

          {/* Course Categories Section */}
          <section className="py-12 md:py-20 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                  Course Categories
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Explore by Category
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Browse our wide range of course categories to find the perfect
                  fit for your learning needs.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8 "
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span className="text-sm font-medium rounded-xl object-cover">
                    Programming
                  </span>
                </a>
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
                    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
                  </svg>
                  <span className="text-sm font-medium">Design</span>
                </a>
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <line x1="12" x2="12" y1="20" y2="10"></line>
                    <line x1="18" x2="18" y1="20" y2="4"></line>
                    <line x1="6" x2="6" y1="20" y2="16"></line>
                  </svg>
                  <span className="text-sm font-medium">Business</span>
                </a>
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                  <span className="text-sm font-medium">Photography</span>
                </a>
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                  </svg>
                  <span className="text-sm font-medium">IT &amp; Software</span>
                </a>
                <a
                  className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  href="#"
                  rel="ugc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-8 h-8"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                  <span className="text-sm font-medium">
                    Personal Development
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section>
            <BeInstructor />
          </section>
          <section>
            <Comment />
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black mx-auto text-muted-foreground py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {/* Footer Links */}
            {[
              { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
              { title: "Courses", links: ["Web Development", "Data Science", "Digital Marketing", "Machine Learning"] },
              { title: "Support", links: ["FAQ", "Help Center", "Accessibility", "Refund Policy"] },
              { title: "Legal", links: ["Terms of Use", "Privacy Policy"] },
            ].map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" rel="ugc">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

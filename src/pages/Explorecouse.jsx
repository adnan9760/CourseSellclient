import React from 'react';
import online from "../assets/online_course.webp"

export let coursedata = [
  {
    "courseId": "web_dev_101",
    "title": "Web Development for Beginners",
    "category": "Web Development",
    "description": "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
    "instructor": "John Doe",
    "rating": 4.5,
    "reviews": 120,
    "price": 49.99,
    "dateAdded": "2024-01-15"
  },
  {
    "courseId": "react_native_202",
    "title": "Advanced React Native",
    "category": "Mobile Development",
    "description": "Master React Native to build cross-platform mobile applications.",
    "instructor": "Jane Smith",
    "rating": 4.8,
    "reviews": 95,
    "price": 79.99,
    "dateAdded": "2024-03-10"
  },
  {
    "courseId": "python_ml_303",
    "title": "Machine Learning with Python",
    "category": "Data Science",
    "description": "An in-depth course on machine learning algorithms and techniques using Python.",
    "instructor": "Alice Wonderland",
    "rating": 4.7,
    "reviews": 150,
    "price": 99.99,
    "dateAdded": "2024-02-20"
  },
  {
    "courseId": "ui_ux_design_101",
    "title": "UI/UX Design Fundamentals",
    "category": "Design",
    "description": "Learn the principles of UI/UX design to create user-friendly interfaces.",
    "instructor": "Bob Builder",
    "rating": 4.2,
    "reviews": 80,
    "price": 59.99,
    "dateAdded": "2024-01-05"
  },
  {
    "courseId": "java_spring_401",
    "title": "Java Spring Framework",
    "category": "Backend Development",
    "description": "Become proficient in the Spring Framework for building robust backend systems.",
    "instructor": "Charlie Brown",
    "rating": 4.3,
    "reviews": 65,
    "price": 69.99,
    "dateAdded": "2024-04-12"
  },
  {
    "courseId": "cloud_aws_501",
    "title": "AWS Cloud Practitioner",
    "category": "Cloud Computing",
    "description": "Learn the basics of AWS and cloud computing to start your journey as a cloud practitioner.",
    "instructor": "Diana Prince",
    "rating": 4.6,
    "reviews": 110,
    "price": 89.99,
    "dateAdded": "2024-03-25"
  },
  {
    "courseId": "fullstack_js_601",
    "title": "Full Stack JavaScript",
    "category": "Full Stack Development",
    "description": "Become a full stack developer with this comprehensive JavaScript course covering both front-end and back-end technologies.",
    "instructor": "Edward Snowden",
    "rating": 4.4,
    "reviews": 130,
    "price": 79.99,
    "dateAdded": "2024-05-01"
  },
  {
    "courseId": "flutter_dev_701",
    "title": "Flutter for Mobile Development",
    "category": "Mobile Development",
    "description": "Build beautiful mobile applications with Flutter and Dart.",
    "instructor": "Fiona Shrek",
    "rating": 4.9,
    "reviews": 90,
    "price": 69.99,
    "dateAdded": "2024-06-15"
  },
  {
    "courseId": "cyber_sec_801",
    "title": "Introduction to Cyber Security",
    "category": "Cyber Security",
    "description": "Learn the fundamentals of cyber security to protect networks and systems.",
    "instructor": "George Washington",
    "rating": 4.5,
    "reviews": 75,
    "price": 99.99,
    "dateAdded": "2024-02-05"
  },
  {
    "courseId": "data_anal_901",
    "title": "Data Analysis with Python",
    "category": "Data Science",
    "description": "Analyze data and extract insights using Python and popular data analysis libraries.",
    "instructor": "Harry Potter",
    "rating": 4.7,
    "reviews": 140,
    "price": 89.99,
    "dateAdded": "2024-04-30"
  }
];

function ExploreCourse() {
  return (
    <div className="text-white flex flex-col justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Courses</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Find the perfect course to expand your knowledge and skills.
            </p>
            <div className="mx-auto max-w-md">
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                placeholder="Search courses..."
                type="search"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coursedata.map((course) => (
              <div key={course.courseId} className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <a className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View Course</span>
                </a>
                <img
                  src={online}
                  alt="Course Image"
                  width="400"
                  height="225"
                  className="object-cover w-full aspect-[4/3]"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <p className='font-bold'>{course.instructor}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm font-medium text-muted-foreground">{course.category}</div>
                    <button 
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                      fdprocessedid="xscihw"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExploreCourse;

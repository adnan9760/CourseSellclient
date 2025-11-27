import React, { useState, useMemo, useEffect } from "react";
import online from "../assets/online_course.webp";

export let coursedata = [
  {
    courseId: "web_dev_101",
    title: "Web Development for Beginners",
    category: "Web Development",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
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
    description:
      "Master React Native to build cross-platform mobile applications.",
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
    description:
      "An in-depth course on machine learning algorithms and techniques using Python.",
    instructor: "Alice Wonderland",
    rating: 4.7,
    reviews: 150,
    price: 99.99,
    dateAdded: "2024-02-20",
  },
  // ...
];

function ExploreCourse() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const[coursedata,setCoursedata]=useState([]);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/course/getCourseAlldetails");
        const data = await response.json();
        setCoursedata(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }
)


  const categories = ["All", ...new Set(coursedata.map((c) => c.category))];
  // const categories = useMemo(() => {
  //   const cats = coursedata.map((c) => c.category);
  //   return ["All", ...new Set(cats)];
  // }, [coursedata]);
  


  const filteredCourses = useMemo(() => {
    let courses =
      activeCategory === "All"
        ? [...coursedata]
        : coursedata.filter((c) => c.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price_low") {
      courses.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high") {
      courses.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      courses.sort((a, b) => b.rating - a.rating);
    } else {
      // popular: rating * reviews
      courses.sort(
        (a, b) => b.rating * b.reviews - a.rating * a.reviews
      );
    }

    return courses;
  }, [activeCategory, search, sortBy]);

  return (
    <div className="explore-course w-11/12 max-w-[1160px] mx-auto pb-16">
      {/* Hero - split layout */}
      <section className="hero mt-10 w-full rounded-3xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 px-6 py-10 md:px-10 md:py-14 shadow-xl">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left content */}
          <div className="space-y-5 text-center md:text-left">
            <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-black/80">
              LEARN · BUILD · GROW
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black">
              Explore Courses
              <span className="block text-zinc-900/80 md:text-[2.8rem]">
                Level up your skills.
              </span>
            </h1>
            <p className="max-w-xl text-sm md:text-base text-zinc-800/80">
              Browse curated courses in development, data, and more. Filter by
              category, search by keyword, and find the perfect course for you.
            </p>

            {/* Search + sort bar */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-500">
                  🔍
                </span>
                <input
                  className="h-11 w-full rounded-xl border border-yellow-600/60 bg-yellow-50/70 pl-9 pr-3 text-sm text-black placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-300 shadow-sm"
                  placeholder="Search by title, topic, or instructor..."
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="h-11 w-full md:w-40 rounded-xl border border-yellow-600/60 bg-yellow-50/70 px-3 text-sm text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-300 shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price_low">Price: Low → High</option>
                <option value="price_high">Price: High → Low</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-black/80">
              <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1">
                ✅ Lifetime access
              </span>
              <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1">
                🎓 Expert instructors
              </span>
              <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1">
                📜 Certificates
              </span>
            </div>
          </div>

          {/* Right image card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-black/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-2xl">
              <img
                src={online}
                alt="Online learning illustration"
                className="h-48 w-full object-cover md:h-64"
              />
              <div className="space-y-2 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600">
                  Trending now
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  Join thousands of learners mastering real‑world skills.
                </p>
                <p className="text-xs text-zinc-600">
                  New courses added every week, with hands‑on projects and
                  mentor support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <div className="tabs flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
        {
          categories.length === 0 && (
            <p className="text-sm text-zinc-500">No categories available.</p>
          )
          
        }
        {categories.length > 0 && categories.map((category) => {

          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 text-xs md:text-sm font-medium rounded-full border transition duration-200 ${
                isActive
                  ? "border-black bg-black text-yellow-300 shadow-md shadow-yellow-500/40"
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-yellow-50"
              }`}
            >
              {category}
              {isActive && (
                <span className="absolute inset-0 -z-10 rounded-full bg-yellow-300/40 blur-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Course grid */}
      <section className="courses w-full pt-8 md:pt-10">
        <div className="container px-1 md:px-0">
          {filteredCourses.length === 0 ? (
            <p className="mt-8 text-center text-sm text-zinc-500">
              No courses match your filters. Try another category or keyword.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
              {filteredCourses.map((course) => (
                <article
                  key={course.courseId}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900 shadow-lg shadow-black/50 transition-transform duration-300 hover:-translate-y-2 hover:border-yellow-400/80"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={online}
                      alt={course.title}
                      className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                      {course.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white">
                      {course.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs text-zinc-400">
                      {course.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-yellow-300">
                      {course.instructor}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{course.rating.toFixed(1)}</span>
                        <span className="text-zinc-500">
                          ({course.reviews})
                        </span>
                      </div>
                      <span className="font-semibold text-yellow-300">
                        ₹{course.price}
                      </span>
                    </div>

                    <button
                      className="mt-4 inline-flex items-center justify-center rounded-xl bg-yellow-400 px-3 py-2 text-xs font-semibold text-black shadow-md shadow-yellow-500/40 transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                    >
                      View course
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ExploreCourse;

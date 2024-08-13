import React from 'react'
import logo from "../assets/become-a-instructor.png"
import online from "../assets/online_course.webp"

function About() {
  return (
    <div className=" text-white flex flex-col justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
<div className="flex flex-col min-h-[100dvh]">
  <main className="flex-1">
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Empowering Learners with Exceptional Courses
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                At our course platform, we're dedicated to providing high-quality educational experiences that help
                our learners achieve their goals. Our mission is to make learning accessible, engaging, and
                transformative.
              </p>
            </div>
            <a
              className="inline-flex h-10 items-center bg-yellow-600 justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="#"
              rel="ugc"
            >
              Explore Courses
            </a>
          </div>
          <img
            src={online}
            width="550"
            height="310"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
    <section className="w-full py-20 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Dedicated Team</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our team of passionate educators, designers, and technologists are committed to creating the best
              learning experiences for our students.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-20 h-20">
              <img className="aspect-square h-full w-full" src={online} />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">CEO</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-20 h-20">
              <img className="aspect-square h-full w-full" src={online} />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Jane Appleseed</h3>
              <p className="text-sm text-muted-foreground">CTO</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-20 h-20">
              <img className="aspect-square h-full w-full" src={online} />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Kate Smith</h3>
              <p className="text-sm text-muted-foreground">Head of Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Values</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At the heart of our course platform are the values that guide our work and shape the experiences we
              create for our learners.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <circle cx="16" cy="4" r="1"></circle>
              <path d="m18 19 1-7-6 1"></path>
              <path d="m5 8 3-3 5.5 3-2.36 3.5"></path>
              <path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path>
              <path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                We believe in making learning accessible to everyone, regardless of their background or abilities.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <path d="M12 3v14"></path>
              <path d="M5 10h14"></path>
              <path d="M5 21h14"></path>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Diversity</h3>
              <p className="text-sm text-muted-foreground">
                We celebrate the diversity of our learners and strive to create inclusive learning environments.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <rect width="5" height="5" x="3" y="3" rx="1"></rect>
              <rect width="5" height="5" x="16" y="3" rx="1"></rect>
              <rect width="5" height="5" x="3" y="16" rx="1"></rect>
              <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
              <path d="M21 21v.01"></path>
              <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
              <path d="M3 12h.01"></path>
              <path d="M12 3h.01"></path>
              <path d="M12 16v.01"></path>
              <path d="M16 12h1"></path>
              <path d="M21 12v.01"></path>
              <path d="M12 21v-1"></path>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Quality</h3>
              <p className="text-sm text-muted-foreground">
                We are committed to delivering high-quality educational content and experiences to our learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features of Our Course Platform</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our course platform is designed to provide a seamless and engaging learning experience for our
              students.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
              <rect x="2" y="6" width="14" height="12" rx="2"></rect>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Interactive Video Lessons</h3>
              <p className="text-sm text-muted-foreground">
                Our courses feature engaging video lessons with interactive elements to keep learners engaged and
                motivated.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Certificates of Completion</h3>
              <p className="text-sm text-muted-foreground">
                Upon successful completion of a course, learners receive a certificate to showcase their
                achievements.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
              className="w-12 h-12 text-primary"
            >
              <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
              <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
              <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
              <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
              <rect width="7" height="5" x="7" y="7" rx="1"></rect>
              <rect width="7" height="5" x="10" y="12" rx="1"></rect>
            </svg>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Vibrant Learning Community</h3>
              <p className="text-sm text-muted-foreground">
                Our courses foster a supportive community where learners can connect, collaborate, and share their
                progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-muted-foreground">© 2024 Course Platform. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
        Terms of Service
      </a>
      <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
        Privacy Policy
      </a>
    </nav>
  </footer>
</div>
    </div>
  )
}

export default About
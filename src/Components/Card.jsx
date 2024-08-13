import React from 'react'
import online from '../assets/online_course.webp'
function Card() {
  return (
    <div >
       <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <img
              src={online}
              width="400"
              height="225"
              alt="Course Thumbnail"
              className="rounded-t-lg object-cover aspect-[16/9]"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Web Development</div>
                <div className="flex items-center gap-1 text-yellow-500">
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
                    className="w-4 h-4"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              <div className="text-muted-foreground">John Doe</div>
              <div className="font-semibold">$99</div>
            </div>
          </div>
    </div>
  )
}

export default Card;
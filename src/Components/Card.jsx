import React from "react";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../reducer/slices/cartSlice";
import { useDispatch } from "react-redux";

function Card({ course }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/course/?courseid=" + course._id);
  };

  const rating = course.rating ?? 4.8;
  const ratingCount = course.ratingCount ?? 120;

  return (
    <div className="group h-full w-full cursor-pointer">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black shadow-[0_18px_45px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/80 hover:shadow-yellow-500/40 active:scale-[0.98]">
        <div className="pointer-events-none absolute left-4 top-4 z-20">
          <span className="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
            Best Seller
          </span>
        </div>

        <div className="relative">
          <img
            src={course.thumbnail.secure_url}
            width="400"
            height="225"
            alt={course.title}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70" />

          <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handleClick}
              className="pointer-events-auto translate-y-4 rounded-full bg-yellow-400 px-6 py-2 text-sm font-semibold text-black shadow-lg shadow-yellow-500/50 transition-all duration-300 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black group-hover:translate-y-0"
            >
              View course
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-b-2xl bg-gradient-to-b from-zinc-900/90 to-black px-4 pb-4 pt-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-sm font-semibold text-zinc-50">
                {course.title}
              </h3>
              <div className="flex flex-col items-end text-xs text-yellow-400">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating.toFixed(1)}</span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  {ratingCount}+ ratings
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/80 text-xs font-medium text-zinc-100">
                {course.instructor.firstName?.charAt(0)}
              </div>
              <p className="truncate text-xs text-zinc-400">
                {course.instructor.firstName} {course.instructor.lastName}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Price
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-yellow-400">
                    ₹{course.price.toLocaleString("en-IN")}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through">
                      ₹{course.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClick}
                  className="hidden rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-yellow-400 hover:text-yellow-300 sm:inline-flex"
                >
                  Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      addProduct({
                        id: course._id,
                        name: course.title,
                        image: course.thumbnail.secure_url,
                        price: course.price,
                      })
                    );
                  }}
                  className="inline-flex items-center rounded-lg bg-yellow-400 px-4 py-2 text-xs font-semibold text-black shadow-md shadow-yellow-500/40 transition hover:bg-yellow-300 active:bg-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Add to cart"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

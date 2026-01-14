"use client";

import { useRef } from "react";
import DramaCard from "./DramaCard";

export default function DramaRow({ title, data }) {
  const rowRef = useRef(null);

  if (!data || data.length === 0) return null;

  const scroll = (direction) => {
    const width = rowRef.current.offsetWidth;
    rowRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 relative group">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
        h-10 w-10 items-center justify-center rounded-full
        bg-black/70 hover:bg-black text-white
        opacity-0 group-hover:opacity-100 transition"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
        h-10 w-10 items-center justify-center rounded-full
        bg-black/70 hover:bg-black text-white
        opacity-0 group-hover:opacity-100 transition"
      >
        ❯
      </button>

      {/* ROW */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {data.map((item) => (
          <div
            key={item.bookId}
            className="flex-shrink-0 w-[160px] sm:w-[200px]"
          >
            <DramaCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

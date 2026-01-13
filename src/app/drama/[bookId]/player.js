"use client";

import { useState, useRef } from "react";

export default function Player({ episodes }) {
  const videoRef = useRef(null);

  if (!episodes || episodes.length === 0) {
    return (
      <div className="aspect-video bg-black rounded flex items-center justify-center text-gray-400">
        Video belum tersedia
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = episodes[currentIndex];

  const playEpisode = (index) => {
    setCurrentIndex(index);
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const nextEpisode = () => {
    if (currentIndex < episodes.length - 1) {
      playEpisode(currentIndex + 1);
    }
  };

  const prevEpisode = () => {
    if (currentIndex > 0) {
      playEpisode(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6">

      {/* VIDEO */}
      <div className="aspect-video bg-black rounded overflow-hidden">
        <video
          ref={videoRef}
          key={current.playUrl}
          src={current.playUrl}
          poster={current.poster}
          controls
          playsInline
          className="w-full h-full object-contain bg-black"
          onEnded={nextEpisode}
        />
      </div>

      {/* NEXT / PREV */}
      <div className="flex gap-3">
        <button
          onClick={prevEpisode}
          disabled={currentIndex === 0}
          className="flex-1 py-2 rounded bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <button
          onClick={nextEpisode}
          disabled={currentIndex === episodes.length - 1}
          className="flex-1 py-2 rounded bg-red-600 disabled:opacity-40"
        >
          Next ➡
        </button>
      </div>

      {/* EPISODE LIST */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Semua Episode
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          {episodes.map((ep, i) => (
            <button
              key={ep.index}
              onClick={() => playEpisode(i)}
              className={`py-2 rounded text-xs sm:text-sm
                ${i === currentIndex
                  ? "bg-red-700"
                  : "bg-red-600 hover:bg-red-700"
                }`}
            >
              Ep {ep.index}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

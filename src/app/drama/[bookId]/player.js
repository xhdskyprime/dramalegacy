"use client";

import { useEffect, useRef, useState } from "react";

export default function Player({ episodes }) {
  const videoRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const episode = episodes[current];

  /* =========================
     FULLSCREEN TRACKING
  ========================= */
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  /* =========================
     CHANGE VIDEO SOURCE
  ========================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !episode) return;

    video.src = episode.playUrl;
    video.load();

    if (started) {
      video.play().catch(() => {});
    }
  }, [current]);

  /* =========================
     NEXT EPISODE
  ========================= */
  function playNext() {
    if (current >= episodes.length - 1) return;
    setCurrent(c => c + 1);
  }

  /* =========================
     VIDEO EVENTS
  ========================= */
  function handlePlay() {
    setStarted(true);
  }

  function handleEnded() {
    playNext();
  }

  /* =========================
     KEEP FULLSCREEN
  ========================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isFullscreen && document.fullscreenElement === null) {
      video.requestFullscreen().catch(() => {});
    }
  }, [current]);

  if (!episode) {
    return (
      <div className="text-center text-gray-400">
        Video tidak tersedia
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* VIDEO */}
      <video
        ref={videoRef}
        controls
        playsInline
        onPlay={handlePlay}
        onEnded={handleEnded}
        className="w-full max-h-[70vh] bg-black rounded-lg"
      />

      {/* EPISODE LIST */}
      <div className="flex gap-2 flex-wrap">
        {episodes.map((ep, idx) => (
          <button
            key={ep.index}
            onClick={() => setCurrent(idx)}
            className={`px-3 py-1 rounded text-sm ${
              idx === current
                ? "bg-pink-600 text-white"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            Ep {ep.index}
          </button>
        ))}
      </div>
    </div>
  );
}

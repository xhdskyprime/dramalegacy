"use client";

import { useState, useEffect } from "react";
import DramaCard from "./DramaCard";

const API_BASE = "https://api.sansekai.my.id/api";

export default function SearchDrama() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/dramabox/search?query=${encodeURIComponent(query)}`
        );
        const json = await res.json();
        setResults(Array.isArray(json) ? json : []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="mb-12 space-y-4">

      {/* SEARCH INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul drama..."
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white outline-none focus:ring focus:ring-pink-500"
      />

      {loading && (
        <div className="text-sm text-zinc-400">
          Mencari drama...
        </div>
      )}

      {results.length > 0 && (
        <div className="
  grid
  grid-cols-2
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  xl:grid-cols-6
  gap-4
">

          {results.map((item) => (
            <DramaCard
              key={item.bookId}
              item={item}
            />
          ))}
        </div>
      )}

    </div>
  );
}

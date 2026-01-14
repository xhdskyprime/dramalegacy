"use client";

import { useState } from "react";
import DramaCard from "./DramaCard";

const API_BASE = "https://api.sansekai.my.id/api";

export default function SearchDrama() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/dramabox/populersearch?keyword=${encodeURIComponent(value)}`
      );
      const data = await res.json();

      // 🔑 NORMALISASI DATA SEARCH
      const normalized = Array.isArray(data)
        ? data.map(item => ({
            bookId: item.bookId,
            bookName: item.bookName,
            cover: item.bookCover || item.coverWap,
          }))
        : [];

      setResults(normalized);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
      setResults([]);
    }

    setLoading(false);
  }

  return (
    <section className="space-y-4">
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Cari judul drama..."
        value={query}
        onChange={handleChange}
        className="
          w-full px-5 py-4
          rounded-lg
          bg-zinc-900
          border border-zinc-700
          text-base
          outline-none
          focus:ring-2 focus:ring-red-500
        "
      />

      {loading && (
        <p className="text-sm text-gray-400">Mencari...</p>
      )}

      {/* SEARCH RESULT */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(item => (
            <DramaCard key={item.bookId} data={item} />
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import DramaCard from "./DramaCard";

const API_BASE = "https://api.sansekai.my.id/api";

export default function SearchDrama() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/dramabox/search?query=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setResults(data || []);
    } catch {
      setResults([]);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Cari judul drama..."
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700"
      />

      {loading && (
        <div className="text-sm text-gray-400">Mencari...</div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <DramaCard key={item.bookId} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

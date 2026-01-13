// src/app/page.js

import DramaCard from "./components/DramaCard";
import SearchDrama from "./components/SearchDrama";

const API_BASE = "https://api.sansekai.my.id/api";

async function getForYou() {
  const res = await fetch(
    `${API_BASE}/dramabox/foryou`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  let dramas = [];

  try {
    dramas = await getForYou();
  } catch (err) {
    console.error("FOR YOU ERROR:", err);
  }

  // ✅ pastikan array & data valid
  const safeDramas = Array.isArray(dramas)
    ? dramas.filter(item => item && item.bookId)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* SEARCH */}
      <SearchDrama />

      <h2 className="text-xl font-semibold">Untuk Kamu</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {safeDramas.map(item => (
          <DramaCard key={item.bookId} data={item} />
        ))}
      </div>
    </div>
  );
}

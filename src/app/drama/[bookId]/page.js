const API_BASE = "https://api.sansekai.my.id/api";

/* =======================
   SAFE JSON
======================= */
async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/* =======================
   FETCH DETAIL
======================= */
async function getDetail(bookId) {
  const res = await fetch(
    `${API_BASE}/dramabox/detail?bookId=${bookId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return safeJson(res);
}

/* =======================
   FETCH EPISODES
======================= */
async function getEpisodes(bookId) {
  const res = await fetch(
    `${API_BASE}/dramabox/allepisode?bookId=${bookId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return (await safeJson(res)) || [];
}

import Player from "./player";

export default async function DramaDetail({ params }) {
  const { bookId } = await params;

  const detail = await getDetail(bookId);
  const episodesRaw = await getEpisodes(bookId);

  if (!detail) {
    return (
      <div className="p-10 text-center text-gray-400">
        Data drama tidak ditemukan
      </div>
    );
  }

  /* =======================
     MAPPING EPISODE (FIX)
  ======================= */
  const episodes = episodesRaw.map((ep, index) => {
    const defaultCdn =
      ep.cdnList?.find(cdn => cdn.isDefault === 1) ||
      ep.cdnList?.[0];

    const defaultVideo =
      defaultCdn?.videoPathList?.find(v => v.isDefault === 1) ||
      defaultCdn?.videoPathList?.[0];

    return {
      index: index + 1,
      title: ep.chapterName,
      poster: ep.chapterImg,
      playUrl: defaultVideo?.videoPath || null
    };
  }).filter(ep => ep.playUrl);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={detail.coverWap}
          alt={detail.bookName}
          className="w-full sm:w-[220px] rounded-lg object-cover"
        />

        <div className="space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold">
            {detail.bookName}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {detail.introduction}
          </p>

          <div className="text-sm text-gray-400">
            {detail.chapterCount} Episode
          </div>
        </div>
      </div>

      {/* PLAYER */}
      <Player episodes={episodes} />

    </div>
  );
}

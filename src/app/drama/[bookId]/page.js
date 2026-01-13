const API_BASE = "https://api.sansekai.my.id/api";

async function getDetail(bookId) {
  const res = await fetch(
    `${API_BASE}/dramabox/detail?bookId=${bookId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch detail");
  }

  return res.json();
}

async function getEpisodes(bookId) {
  const res = await fetch(
    `${API_BASE}/dramabox/allepisode?bookId=${bookId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

import Player from "./player";

export default async function DramaDetail({ params }) {
  // ✅ WAJIB await (Next.js 16)
  const { bookId } = await params;

  if (!bookId) {
    return (
      <div className="p-10 text-center text-gray-400">
        Book ID tidak valid
      </div>
    );
  }

  let detail;
  let episodesRaw;

  try {
    detail = await getDetail(bookId);
    episodesRaw = await getEpisodes(bookId);
  } catch (err) {
    console.error(err);
    return (
      <div className="p-10 text-center text-red-400">
        Gagal memuat drama
      </div>
    );
  }

  const episodes = episodesRaw
    .map((ep, index) => {
      const cdn =
        ep.cdnList?.find(c => c.isDefault === 1) ||
        ep.cdnList?.[0];

      const video =
        cdn?.videoPathList?.find(v => v.isDefault === 1) ||
        cdn?.videoPathList?.[0];

      return {
        index: index + 1,
        title: ep.chapterName,
        poster: ep.chapterImg,
        playUrl: video?.videoPath || null
      };
    })
    .filter(ep => ep.playUrl);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={detail.coverWap || detail.cover}
          alt={detail.bookName}
          className="w-full sm:w-[220px] rounded-lg object-cover"
        />

        <div className="space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold">
            {detail.bookName}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base">
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

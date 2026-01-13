import Link from "next/link";

/**
 * ===============================
 * API CONFIG
 * ===============================
 */
const API_BASE = "https://api.sansekai.my.id/api";

/**
 * ===============================
 * GET EPISODE DETAIL (VIDEO)
 * ===============================
 */
async function getEpisode(episodeId) {
  const res = await fetch(
    `${API_BASE}/dramabox/episode?episodeId=${episodeId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("EPISODE DETAIL ERROR", res.status);
    return null;
  }

  return res.json();
}

/**
 * ===============================
 * GET ALL EPISODES BY BOOK ID
 * ===============================
 */
async function getEpisodesByBook(bookId) {
  const res = await fetch(
    `${API_BASE}/dramabox/allEpisode?bookId=${bookId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("EPISODE LIST ERROR", res.status);
    return [];
  }

  return res.json();
}

/**
 * ===============================
 * PAGE
 * ===============================
 */
export default async function EpisodePage({ params }) {
  const { episodeId } = params;

  // 1️⃣ ambil episode sekarang
  const episode = await getEpisode(episodeId);
  if (!episode) {
    return (
      <div className="p-10 text-center text-red-500">
        Episode tidak ditemukan
      </div>
    );
  }

  // 2️⃣ ambil semua episode drama ini
  const episodes = await getEpisodesByBook(episode.bookId);

  // 3️⃣ cari index episode sekarang
  const currentIndex = episodes.findIndex(
    (e) => String(e.episodeId) === String(episodeId)
  );

  const prevEpisode = episodes[currentIndex - 1];
  const nextEpisode = episodes[currentIndex + 1];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      {/* ================= VIDEO PLAYER ================= */}
      <div className="max-w-4xl mx-auto">
        <video
          src={episode.playUrl}
          controls
          autoPlay
          className="w-full rounded-lg bg-black"
        />
      </div>

      {/* ================= INFO ================= */}
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="text-xl font-bold">
          {episode.bookName} – Episode {episode.episodeNumber}
        </h1>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="max-w-4xl mx-auto flex justify-between mt-6">
        {prevEpisode ? (
          <Link
            href={`/episode/${prevEpisode.episodeId}`}
            className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
          >
            ⏮ Episode Sebelumnya
          </Link>
        ) : (
          <div />
        )}

        {nextEpisode && (
          <Link
            href={`/episode/${nextEpisode.episodeId}`}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-500"
          >
            Episode Selanjutnya ▶
          </Link>
        )}
      </div>

      {/* ================= EPISODE LIST ================= */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-lg font-semibold mb-3">Daftar Episode</h2>

        <div className="grid grid-cols-5 gap-2">
          {episodes.map((ep) => (
            <Link
              key={ep.episodeId}
              href={`/episode/${ep.episodeId}`}
              className={`text-center py-2 rounded text-sm
                ${
                  ep.episodeId === episodeId
                    ? "bg-pink-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
            >
              Ep {ep.episodeNumber}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

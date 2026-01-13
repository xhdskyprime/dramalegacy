"use client";

import Link from "next/link";

const FALLBACK_IMG =
  "https://dummyimage.com/400x600/18181b/ffffff&text=No+Image";

function resolveCover(item) {
  const url = item.cover || item.coverWap;
  if (!url) return FALLBACK_IMG;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("http")) return url;
  return FALLBACK_IMG;
}

export default function DramaCard({ item }) {
  return (
    <Link href={`/drama/${item.bookId}`}>
      <div className="group relative rounded-xl overflow-hidden bg-zinc-900 transition hover:scale-[1.02]">

        {/* POSTER (RASIO BENAR) */}
        <div className="aspect-[2/3] w-full">
          <img
            src={resolveCover(item)}
            alt={item.bookName}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            className="h-full w-full object-cover"
          />
        </div>

        {/* GRADIENT */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* INFO */}
        <div className="absolute bottom-0 z-10 p-3">
          <h3 className="text-sm font-semibold leading-tight line-clamp-2">
            {item.bookName}
          </h3>

          {item.chapterCount && (
            <p className="mt-1 text-xs text-zinc-300">
              {item.chapterCount} Episode
            </p>
          )}
        </div>

      </div>
    </Link>
  );
}

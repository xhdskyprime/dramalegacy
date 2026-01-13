import Link from "next/link";

export default function DramaCard({ data }) {
  // ⛔ jangan render kalau data rusak
  if (!data || !data.bookId) return null;

  const {
    bookId,
    bookName,
    cover,
    coverWap,
    chapterCount
  } = data;

  return (
    <Link href={`/drama/${bookId}`}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-[1.02] transition">
        <img
          src={coverWap || cover || "/no-image.png"}
          alt={bookName}
          className="w-full aspect-[3/4] object-cover"
          loading="lazy"
        />

        <div className="p-2 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">
            {bookName}
          </h3>

          {chapterCount ? (
            <p className="text-xs text-gray-400">
              {chapterCount} Episode
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

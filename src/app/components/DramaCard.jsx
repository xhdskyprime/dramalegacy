import Link from "next/link";

export default function DramaCard({ data }) {
  return (
    <Link href={`/drama/${data.bookId}`}>
      <div className="rounded-lg overflow-hidden bg-neutral-900 hover:scale-105 transition">
        <img
          src={data.cover}
          alt={data.bookName}
          className="w-full h-[230px] object-cover"
        />
        <div className="p-2">
          <p className="text-sm font-medium line-clamp-2">
            {data.bookName}
          </p>
        </div>
      </div>
    </Link>
  );
}

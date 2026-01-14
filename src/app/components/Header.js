import Link from "next/link";

export default function Header() {
  return (
    <header className="
      fixed top-0 left-0 right-0 z-50
      h-16 sm:h-20
      bg-black/80 backdrop-blur
      border-b border-white/10
    ">
      <div className="
        max-w-7xl mx-auto
        h-full
        px-4
        flex items-center justify-between
      ">
        {/* LOGO */}
        <Link href="/" className="text--500 font-bold text-lg">
          Dramalegacy
        </Link>

        {/* NAV */}
        <nav className="flex gap-4 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">
            Beranda
          </Link>
          <span className="hidden sm:inline hover:text-white cursor-pointer">
            Terbaru
          </span>
          <span className="hidden sm:inline hover:text-white cursor-pointer">
            Terpopuler
          </span>
          <span className="hover:text-white cursor-pointer">
            Sulih Suara
          </span>
        </nav>
      </div>
    </header>
  );
}

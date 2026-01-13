import './globals.css';

export const metadata = {
  title: 'DramaBox',
  description: 'Drama streaming app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-white">
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-pink-500">
            DramaBox
          </h1>

          <nav className="flex gap-6 text-zinc-400">
            <a href="/" className="text-white">Beranda</a>
            <a href="#">Terbaru</a>
            <a href="#">Terpopuler</a>
            <a href="#">Sulih Suara</a>
          </nav>
        </header>

        <main className="px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "DramaLegacy",
  description: "Streaming Drama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black text-white">
        {/* HEADER */}
        <Header />

        {/* SPACER: PENTING BIAR TIDAK NABRAK */}
        <div className="h-16 sm:h-20" />

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

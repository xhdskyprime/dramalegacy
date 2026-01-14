import DramaRow from "./components/DramaRow";
import SearchDrama from "./components/SearchDrama";

const BASE = "https://api.sansekai.my.id/api";

async function fetchApi(path) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  return res.json();
}

function normalize(list = []) {
  return list.map(item => ({
    bookId: item.bookId,
    bookName: item.bookName,
    cover: item.coverWap || item.bookCover,
  }));
}

export default async function HomePage() {
  const [
    foryou,
    trending,
    latest,
    vipRaw,
  ] = await Promise.all([
    fetchApi("/dramabox/foryou"),
    fetchApi("/dramabox/trending"),
    fetchApi("/dramabox/latest"),
    fetchApi("/dramabox/vip"),
  ]);

  const vipList =
    vipRaw?.columnVoList?.[0]?.bookList ?? [];

  return (
    <div className="space-y-10">
      {/* SEARCH BAR BESAR */}
      <SearchDrama />

      {/* ROWS */}
      <DramaRow title="Untuk Kamu" data={normalize(foryou)} />
      <DramaRow title="🔥 Sedang Trending" data={normalize(trending)} />
      <DramaRow title="⭐ VIP Pilihan" data={normalize(vipList)} />
      <DramaRow title="🆕 Drama Terbaru" data={normalize(latest)} />
    </div>
  );
}

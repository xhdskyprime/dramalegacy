import SearchDrama from "./components/SearchDrama";
import DramaCard from "./components/DramaCard";

async function getForYou() {
  const res = await fetch("http://localhost:3000/api/foryou", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getForYou();

  return (
    <div className="space-y-14">

      {/* SEARCH */}
      <SearchDrama />

      {/* FOR YOU */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Untuk Kamu
        </h2>

        <div className="
  grid
  grid-cols-2
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  xl:grid-cols-6
  gap-4
">

          {data.map((item, index) => (
            <DramaCard
              key={`${item.bookId}-${index}`}
              item={item}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

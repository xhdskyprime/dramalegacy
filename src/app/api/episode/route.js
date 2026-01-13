export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    const res = await fetch(
      `https://api.sansekai.my.id/api/dramabox/allpisode?bookId=${bookId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      }
    );

    const json = await res.json();

    // 🔥 PENTING: return ARRAY episode
    return Response.json(json?.data || []);
  } catch (err) {
    return Response.json([]);
  }
}

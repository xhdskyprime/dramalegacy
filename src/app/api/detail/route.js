export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    const res = await fetch(
      `https://api.sansekai.my.id/api/dramabox/detail?bookId=${bookId}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      }
    );

    const text = await res.text();
    if (!text) return Response.json(null);

    return Response.json(JSON.parse(text));
  } catch {
    return Response.json(null);
  }
}

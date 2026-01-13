export async function GET() {
  try {
    const res = await fetch(
      'https://api.sansekai.my.id/api/dramabox/foryou',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
        cache: 'no-store',
      }
    );

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

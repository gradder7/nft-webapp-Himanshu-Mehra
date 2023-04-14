export async function GET(request) {
  return new Response(
    JSON.stringify({
      name: "Jim Halpert",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

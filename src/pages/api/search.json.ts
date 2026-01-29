---
export const prerender = false;

export async function GET({ url }) {
  const searchParams = url.searchParams;
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ results: [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

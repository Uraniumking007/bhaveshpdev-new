import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, saveStaticDataSchema, isLocalOnly } from '../../lib/admin-utils';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const data = await getStaticData();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const body = await request.json();
    const result = saveStaticDataSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Invalid data', details: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await saveStaticData(result.data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

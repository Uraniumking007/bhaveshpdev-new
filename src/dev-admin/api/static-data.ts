import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, saveStaticDataSchema, isLocalOnly } from '../../lib/admin-utils';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const data = await getStaticData();
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to read data' }, { status: 500 });
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
      return Response.json(
        { error: 'Invalid data', details: result.error.format() },
        { status: 400 }
      );
    }

    await saveStaticData(result.data);
    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to save data' }, { status: 500 });
  }
};

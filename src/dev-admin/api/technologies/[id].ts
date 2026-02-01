import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, isLocalOnly, saveStaticDataSchema } from '../../../lib/admin-utils';

export const prerender = false;

function getTechnologySchema() {
  return saveStaticDataSchema.shape.technologies.element;
}

export const PUT: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Technology ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const techSchema = getTechnologySchema();
    const result = techSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Invalid technology data', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = await getStaticData();
    const index = data.technologies.findIndex(t => t.id === id);

    if (index === -1) {
      return Response.json({ error: 'Technology not found' }, { status: 404 });
    }

    data.technologies[index] = { ...result.data, updatedAt: new Date().toISOString() };
    await saveStaticData(data);

    return Response.json({ success: true, technology: result.data }, { status: 200 });
  } catch (error) {
    console.error('Error saving technology:', error);
    return Response.json({ error: 'Failed to save technology' }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Technology ID is required' }, { status: 400 });
    }

    const data = await getStaticData();
    const index = data.technologies.findIndex(t => t.id === id);

    if (index === -1) {
      return Response.json({ error: 'Technology not found' }, { status: 404 });
    }

    data.technologies.splice(index, 1);
    await saveStaticData(data);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to delete technology' }, { status: 500 });
  }
};

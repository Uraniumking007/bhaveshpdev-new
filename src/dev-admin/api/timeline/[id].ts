import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, isLocalOnly, saveStaticDataSchema } from '../../../lib/admin-utils';

export const prerender = false;

function getTimelineItemSchema() {
  return saveStaticDataSchema.shape.timeline.element;
}

export const PUT: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Timeline item ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const timelineSchema = getTimelineItemSchema();
    const result = timelineSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Invalid timeline item data', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = await getStaticData();
    const index = data.timeline.findIndex(t => t.id === id);

    if (index === -1) {
      return Response.json({ error: 'Timeline item not found' }, { status: 404 });
    }

    data.timeline[index] = { ...result.data, updatedAt: new Date().toISOString() };
    await saveStaticData(data);

    return Response.json({ success: true, timelineItem: result.data }, { status: 200 });
  } catch (error) {
    console.error('Error saving timeline item:', error);
    return Response.json({ error: 'Failed to save timeline item' }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Timeline item ID is required' }, { status: 400 });
    }

    const data = await getStaticData();
    const index = data.timeline.findIndex(t => t.id === id);

    if (index === -1) {
      return Response.json({ error: 'Timeline item not found' }, { status: 404 });
    }

    data.timeline.splice(index, 1);
    await saveStaticData(data);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to delete timeline item' }, { status: 500 });
  }
};

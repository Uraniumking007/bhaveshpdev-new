import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, isLocalOnly, saveStaticDataSchema } from '../../../lib/admin-utils';

export const prerender = false;

function getCertificationSchema() {
  return saveStaticDataSchema.shape.certifications.element;
}

export const PUT: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Certification ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const certSchema = getCertificationSchema();
    const result = certSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Invalid certification data', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = await getStaticData();
    const index = data.certifications.findIndex(c => c.id === id);

    if (index === -1) {
      return Response.json({ error: 'Certification not found' }, { status: 404 });
    }

    data.certifications[index] = { ...result.data, updatedAt: new Date().toISOString() };
    await saveStaticData(data);

    return Response.json({ success: true, certification: result.data }, { status: 200 });
  } catch (error) {
    console.error('Error saving certification:', error);
    return Response.json({ error: 'Failed to save certification' }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Certification ID is required' }, { status: 400 });
    }

    const data = await getStaticData();
    const index = data.certifications.findIndex(c => c.id === id);

    if (index === -1) {
      return Response.json({ error: 'Certification not found' }, { status: 404 });
    }

    data.certifications.splice(index, 1);
    await saveStaticData(data);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
};

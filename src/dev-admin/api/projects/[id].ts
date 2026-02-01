import type { APIRoute } from 'astro';
import { getStaticData, saveStaticData, isLocalOnly, saveStaticDataSchema } from '../../../lib/admin-utils';

export const prerender = false;

function getProjectSchema() {
  return saveStaticDataSchema.shape.projects.element;
}

export const PUT: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const projectSchema = getProjectSchema();
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Invalid project data', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = await getStaticData();
    const index = data.projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    data.projects[index] = { ...result.data, updatedAt: new Date().toISOString() };
    await saveStaticData(data);

    return Response.json({ success: true, project: result.data }, { status: 200 });
  } catch (error) {
    console.error('Error saving project:', error);
    return Response.json({ error: 'Failed to save project' }, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  if (!isLocalOnly(request)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const id = params.id;
    if (!id) {
      return Response.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const data = await getStaticData();
    const index = data.projects.findIndex(p => p.id === id);

    if (index === -1) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    data.projects.splice(index, 1);
    await saveStaticData(data);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
};

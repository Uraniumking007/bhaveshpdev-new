import type { Pool } from 'pg';
import { getPool } from '@/db/connection';
import { createKysely } from '@/db/schema';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const title = data.get('title')?.toString();
    const slug = data.get('slug')?.toString();
    const description = data.get('description')?.toString();
    const markdown = data.get('markdown')?.toString();
    const cover_image_url = data.get('cover_image_url')?.toString();
    const canonical_url = data.get('canonical_url')?.toString();
    const isDraft = data.get('draft')?.toString() === 'true';
    const isScheduled = data.get('schedule')?.toString() === 'true';
    const scheduled_at_str = data.get('scheduled_at')?.toString();
    const action = data.get('action')?.toString();

    if (!title || !slug || !markdown) {
      return new Response(JSON.stringify({ error: 'Title, slug, and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pool = await getPool();
    const db = createKysely(pool);

    let scheduled_at: Date | null = null;
    let published_at: Date | null;
    let draft = isDraft;

    if (action === 'publish' && !isScheduled) {
      published_at = new Date();
      draft = false;
    } else if (isScheduled && scheduled_at_str) {
      scheduled_at = new Date(scheduled_at_str);
      draft = false;
    }

    const result = await db
      .insertInto('blog_posts')
      .values({
        title,
        slug,
        description: description || null,
        markdown: markdown || null,
        cover_image_url: cover_image_url || null,
        canonical_url: canonical_url || null,
        draft,
        scheduled_at,
        published_at,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('id')
      .executeTakeFirst();

    if (result?.id) {
      await db
        .insertInto('blog_post_revisions')
        .values({
          post_id: result.id,
          markdown: markdown || '',
          tiptap_json: null,
          created_at: new Date(),
          created_by: 'admin',
          summary: description || null,
        })
        .execute();
    }

    await pool.end();

    return new Response(JSON.stringify({ success: true, slug }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Post creation error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

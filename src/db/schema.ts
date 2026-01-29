import type { Generated } from 'kysely';
import { Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import type { Pool } from 'pg';

export interface Database {
  blog_posts: BlogPostsTable;
  blog_post_revisions: BlogPostRevisionsTable;
}

export interface BlogPostsTable {
  id: Generated<number>;
  slug: string;
  title: string;
  description: Generated<string | null>;
  canonical_url: Generated<string | null>;
  cover_image_url: Generated<string | null>;
  draft: Generated<boolean>;
  scheduled_at: Generated<Date | null>;
  published_at: Generated<Date | null>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface BlogPostRevisionsTable {
  id: Generated<number>;
  post_id: number;
  markdown: string;
  tiptap_json: Generated<Record<string, unknown> | null>;
  created_at: Generated<Date>;
  created_by: Generated<string | null>;
  summary: Generated<string | null>;
}

export function createKysely(pool: Pool) {
  return new Kysely<Database>({
    dialect: new PostgresDialect({ pool }),
  });
}

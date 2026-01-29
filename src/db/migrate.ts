import type { Pool } from 'pg';
import pg from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function runMigrations(pool: Pool) {
  const migrationPath = join(process.cwd(), 'src/db/migrations');
  const migrationFiles = [
    '001_create_blog_tables.sql',
  ];

  for (const file of migrationFiles) {
    const sql = readFileSync(join(migrationPath, file), 'utf-8');
    await pool.query(sql);
    console.log(`✓ Migration applied: ${file}`);
  }

  console.log('All migrations completed successfully');
}

import type { Pool } from 'pg';
import pg from 'pg';
import { getPool } from './connection';
import { runMigrations } from './migrate';

async function main() {
  const pool = await getPool();

  try {
    await runMigrations(pool);
    console.log('✓ Database setup complete');
  } catch (error) {
    console.error('✗ Database setup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

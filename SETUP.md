# Dependencies

Added for database functionality:
- pg: Postgres driver
- kysely: Type-safe SQL query builder

Added for contact form:
- nodemailer: SMTP email sending

Added for RSS:
- @astrojs/rss: RSS feed generation

Added for content (future):
- remark/rehype plugins for Markdown rendering

# Installation
bun install pg kysely nodemailer @astrojs/rss

# Database Setup
Run database setup script:
bun run db:setup

This will apply migrations from src/db/migrations/ directory.

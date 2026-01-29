-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    canonical_url TEXT,
    cover_image_url TEXT,
    draft BOOLEAN NOT NULL DEFAULT false,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog_post_revisions table
CREATE TABLE IF NOT EXISTS blog_post_revisions (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    markdown TEXT NOT NULL,
    tiptap_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    summary TEXT,
    CONSTRAINT fk_post_revisions_post_id
        FOREIGN KEY (post_id)
        REFERENCES blog_posts(id)
        ON DELETE CASCADE
);

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_blog_posts_search
    ON blog_posts
    USING GIN (to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '')));

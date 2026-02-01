import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../../public/data/static-data.json');

export function isLocalOnly(request: Request): boolean {
  const host = request.headers.get('host') || '';
  const forwarded = request.headers.get('x-forwarded-for');
  const remote = request.headers.get('x-vercel-ip-country');

  if (forwarded) return false;
  if (remote) return false;

  const hostname = host.split(':')[0];

  const isLocal = hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local');

  return isLocal && host !== '';
}

export async function getStaticData() {
  const content = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(content);
}

const saveStaticDataSchema = z.object({
  projects: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().min(1, 'Image is required'),
    link: z.string().url().nullable(),
    github: z.string().url().nullable(),
    technologies: z.array(z.object({
      projectId: z.string(),
      technologyId: z.string(),
    })),
    categories: z.array(z.object({
      projectId: z.string(),
      categoryId: z.string(),
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
    projectInitiated: z.string().nullable(),
    projectCompleted: z.string().nullable(),
    isCompleted: z.boolean(),
    endDate: z.string().nullable(),
    isFeatured: z.boolean(),
    images: z.array(z.string()),
  })),
  technologies: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Technology name is required'),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Category name is required'),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    date: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    credentialUrl: z.string().url().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    pdfUrl: z.string().nullable(),
    visible: z.boolean(),
  })),
  timeline: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required'),
    description: z.string(),
    yearStart: z.string(),
    yearEnd: z.string().nullable(),
    ongoing: z.boolean(),
    type: z.enum(['work', 'education']),
    visibility: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
});

export type SaveStaticData = z.infer<typeof saveStaticDataSchema>;
export { saveStaticDataSchema };

export async function saveStaticData(data: SaveStaticData) {
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_PATH, content, 'utf-8');
}

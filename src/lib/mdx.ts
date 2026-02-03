import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    image?: string;
    content: string;
}

// Get all posts sorted by date
export function getAllPosts(): Post[] {
    if (!fs.existsSync(contentDirectory)) {
        console.warn('[mdx.ts] Blog content directory not found:', contentDirectory);
        return [];
    }

    const files = fs.readdirSync(contentDirectory);

    return files
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(filename => {
            const slug = filename.replace(/\.mdx?$/, '');
            const raw = fs.readFileSync(path.join(contentDirectory, filename), 'utf8');
            const { data, content } = matter(raw);

            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                date: data.date || new Date().toISOString(),
                tags: data.tags || [],
                image: data.image,
                content,
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post
export function getPostBySlug(slug: string): Post | null {
    const candidates = [
        path.join(contentDirectory, `${slug}.mdx`),
        path.join(contentDirectory, `${slug}.md`),
    ];

    const filePath = candidates.find(p => fs.existsSync(p));

    if (!filePath) {
        console.warn(`[mdx.ts] Post not found: ${slug}`);
        return null;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        image: data.image,
        content,
    };
}

// Get all slugs for static generation
export function getPostSlugs(): string[] {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs
        .readdirSync(contentDirectory)
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(f => f.replace(/\.mdx?$/, ''));
}

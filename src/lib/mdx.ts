// src/lib/mdx.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface Post {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    image?: string;
    content: string;
    excerpt: string;
}

// Helper to normalize slugs (lowercase, hyphens)
const normalizeSlug = (slug: string) => slug.toLowerCase();

export async function getAllPosts(): Promise<Post[]> {
    try {
        const fileNames = await fs.readdir(postsDirectory);
        const allPosts = await Promise.all(
            fileNames
                .filter((f) => f.endsWith('.mdx'))
                .map(async (fileName) => {
                    const slug = normalizeSlug(fileName.replace(/\.mdx$/, ''));
                    const fullPath = path.join(postsDirectory, fileName);
                    const fileContents = await fs.readFile(fullPath, 'utf8');
                    const { data, content } = matter(fileContents);

                    const firstParagraph = content
                        .split('\n')
                        .find((line) => line.trim() !== '') || '';

                    return {
                        slug,
                        title: data.title || slug,
                        date: data.date || new Date().toISOString().split('T')[0],
                        tags: data.tags || [],
                        image: data.image,
                        content,
                        excerpt: firstParagraph.slice(0, 150),
                    } as Post;
                })
        );

        return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const normalizedSlug = normalizeSlug(slug);
        const fullPath = path.join(postsDirectory, `${normalizedSlug}.mdx`);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const firstParagraph = content
            .split('\n')
            .find((line) => line.trim() !== '') || '';

        return {
            slug: normalizedSlug,
            title: data.title || normalizedSlug,
            date: data.date || new Date().toISOString().split('T')[0],
            tags: data.tags || [],
            image: data.image,
            content,
            excerpt: firstParagraph.slice(0, 150),
        };
    } catch (error) {
        console.error('Post not found:', slug, error);
        return null;
    }
}

// src/lib/posts.ts
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

export function getAllPosts(): Post[] {
    return fs.readdirSync(contentDirectory)
        .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
        .map(filename => {
            const slug = filename.replace(/\.mdx?$/, '');
            const filePath = path.join(contentDirectory, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                date: data.date || new Date().toISOString(),
                tags: data.tags || [],
                image: data.image,
                content,
            } as Post;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


export function getPostBySlug(slug: string): Post | null {
    try {
        const filePath = path.join(contentDirectory, `${slug}.mdx`);

        if (!fs.existsSync(filePath)) {
            // Try .md extension
            const mdFilePath = path.join(contentDirectory, `${slug}.md`);
            if (!fs.existsSync(mdFilePath)) {
                return null;
            }
            const fileContent = fs.readFileSync(mdFilePath, 'utf8');
            const { data, content } = matter(fileContent);

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

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            date: data.date || new Date().toISOString(),
            tags: data.tags || [],
            image: data.image,
            content,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}
export const runtime = 'edge';

import blogPosts from '@/data/blogPosts.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Blog
                </Link>

                <article>
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <div className="text-gray-500 mb-6">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
                        ))}
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    </div>
                </article>
            </div>
        </div>
    );
}
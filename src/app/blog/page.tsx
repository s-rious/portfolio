import blogPosts from '@/data/blogPosts.json';
import Link from 'next/link';

export default function Blog() {
    // Sort by date, newest first
    const sortedPosts = [...blogPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Blog</h1>
                <p className="text-lg text-gray-700 mb-8">
                    THE BRAIN BEHIND THE CRAFT
                </p>

                <div className="space-y-8">
                    {sortedPosts.map((post) => (
                        <article key={post.id} className="border-b border-gray-200 pb-8">
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <div className="text-sm text-gray-500 mb-3">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <p className="text-gray-600 mb-3">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {tag}
                  </span>
                                ))}
                            </div>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                Read More →
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
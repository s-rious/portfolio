import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

// getAllPosts() uses fs — runs at build time only.
// This page is rendered statically, so no edge runtime declaration needed.

export default function Blog() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-5xl mx-auto">
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden mb-8">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-brand-secondary"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/blog
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            {posts.length} POSTS
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-6xl font-bold mb-3 font-inter text-white">
                                Blog
                            </h1>
                            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                                $ cat thoughts.txt
                            </p>
                            <p className="text-xl text-gray-400 font-inter mt-2">
                                THE BRAIN BEHIND THE CRAFT
                            </p>
                        </div>

                        {posts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 font-mono">$ No posts found. Add .mdx files to src/content/blog/</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post, index) => (
                                    <article
                                        key={post.slug}
                                        className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-brand-primary/50 hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        {/* Post number badge */}
                                        <div className="absolute -left-3 top-6 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-black text-xs font-bold font-mono">
                                            {posts.length - index}
                                        </div>

                                        {/* Hero image if present */}
                                        {post.image && (
                                            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.parentElement!.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Title + Date row */}
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <Link href={`/blog/${post.slug}`} className="flex-1">
                                                <h2 className="text-2xl md:text-3xl font-semibold font-inter text-white group-hover:text-brand-primary transition-colors duration-300">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            <div className="text-xs text-gray-500 font-mono whitespace-nowrap">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    year: '2-digit'
                                                })}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded text-xs font-mono"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-gray-300 mb-4 font-sans leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        {/* Read more */}
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent font-mono text-sm transition-colors duration-300"
                                        >
                                            <span>READ_POST</span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
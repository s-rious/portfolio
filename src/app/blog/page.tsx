export const runtime = 'edge';

import blogPosts from '@/data/blogPosts.json';
import Link from 'next/link';

export default function Blog() {
    // Sort by date, newest first
    const sortedPosts = [...blogPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-5xl mx-auto">
                {/* Terminal Container */}
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden mb-8">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#F87171]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#14B8A6]"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/blog
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            {sortedPosts.length} POSTS
                        </div>
                    </div>

                    {/* Terminal Content */}
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

                        <div className="space-y-6">
                            {sortedPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-[#14B8A6]/50 hover:bg-white/10 transition-all duration-300 group"
                                >
                                    {/* Post Number */}
                                    <div className="absolute -left-3 top-6 w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center text-black text-xs font-bold font-mono">
                                        {index + 1}
                                    </div>

                                    {/* Post Header */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <Link href={`/blog/${post.slug}`} className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-semibold font-inter text-white group-hover:text-[#14B8A6] transition-colors duration-300">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <div className="text-xs text-gray-500 font-mono whitespace-nowrap">
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: '2-digit',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] rounded text-xs font-mono"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-gray-300 mb-4 font-sans leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More Link */}
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-[#F87171] hover:text-[#F59E0B] font-mono text-sm transition-colors duration-300"
                                    >
                                        <span>READ_POST</span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
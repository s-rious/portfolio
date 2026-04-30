import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

function parseDate(d: string) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
}

function formatDate(d: string) {
    return parseDate(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blog() {
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <h1
                        className="text-6xl md:text-9xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        BLOG
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Thoughts, updates, and things I feel like saying. Unfiltered.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="border border-white/20 p-12 text-center">
                        <p className="text-gray-500">No posts yet. Check back soon.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured post */}
                        {featured && (
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="group grid grid-cols-1 md:grid-cols-2 border border-white/20 hover:border-[#FF2E63] transition-all duration-300 mb-8"
                            >
                                {/* Image */}
                                <div className="aspect-video md:aspect-auto overflow-hidden bg-white/5 relative">
                                    {featured.image ? (
                                        <img
                                            src={featured.image}
                                            alt={featured.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 min-h-64">
                                            <div className="text-center">
                                                <div className="text-xs text-gray-700 font-mono tracking-widest">[BLOG IMAGE]</div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-[#FF2E63]/0 group-hover:bg-[#FF2E63]/10 transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-2 py-1 border border-[#FF2E63] text-[#FF2E63] text-xs font-mono tracking-widest">
                                                LATEST
                                            </span>
                                            {featured.tags?.slice(0, 1).map((t: string) => (
                                                <span key={t} className="text-xs text-gray-600 font-mono">#{t}</span>
                                            ))}
                                        </div>

                                        <h2
                                            className="text-4xl md:text-5xl font-black mb-4 leading-none group-hover:text-[#FF2E63] transition-colors duration-300"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {featured.title}
                                        </h2>

                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {featured.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-8">
                                        <span className="text-xs text-gray-600 font-mono tracking-wider">
                                            {formatDate(featured.date)}
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono tracking-wider group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                            READ →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Remaining posts */}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {rest.map(post => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group border border-white/20 hover:border-[#FF2E63] transition-all duration-300"
                                    >
                                        <div className="aspect-video bg-white/5 overflow-hidden relative">
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-xs text-gray-700 font-mono tracking-widest">[BLOG IMAGE]</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-[#FF2E63]/0 group-hover:bg-[#FF2E63]/10 transition-colors duration-300" />
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-xs text-gray-500 tracking-wider font-mono">
                                                    {formatDate(post.date)}
                                                </span>
                                                {post.tags?.slice(0, 1).map((t: string) => (
                                                    <span key={t} className="text-xs text-gray-600 font-mono">#{t}</span>
                                                ))}
                                            </div>

                                            <h3
                                                className="text-2xl font-black mb-3 group-hover:text-[#FF2E63] transition-colors duration-300"
                                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                            >
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                                                <span>READ MORE</span>
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
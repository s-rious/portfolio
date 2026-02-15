import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

export default function Blog() {
    const posts = getAllPosts();
    const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day)
    }

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <h1
                        className="text-6xl md:text-8xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        BLOG
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl text-gray-400 max-w-2xl">
                        My ramblings that you won't see anywhere else.
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="border border-white/20 p-12 text-center">
                        <p className="text-gray-500">No posts yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group border border-white/20 hover:border-[#FF2E63] transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-white/5 overflow-hidden relative">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">📝</div>
                                                <div className="text-xs text-gray-600">[BLOG IMAGE]</div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-[#FF2E63]/0 group-hover:bg-[#FF2E63]/10 transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs text-gray-500 tracking-wider">
                                            {parseLocalDate(post.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })
                                            }
                                        </span>
                                        <div className="flex gap-2">
                                            {post.tags?.slice(0, 2).map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-gray-600"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h2
                                        className="text-2xl font-black mb-3 group-hover:text-[#FF2E63] transition-colors"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                    >
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors">
                                        <span>READ MORE</span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
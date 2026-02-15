import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MDXContent from '@/components/mdx/MDXContent';
import { getPostBySlug, getPostSlugs, Post } from '@/lib/mdx';

// This function is required for static generation
export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

// Generate metadata for each post
export async function generateMetadata({
                                           params
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPost({
                                           params
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const post: Post | null = getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Image */}
            {post.image ? (
                <div className="relative w-full h-[60vh] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
                </div>
            ) : (
                <div className="relative w-full h-[40vh] bg-white/5 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-4">📝</div>
                        <div className="text-sm text-gray-600">[HERO IMAGE PLACEHOLDER]</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                </div>
            )}

            {/* Content */}
            <div className="relative -mt-32 pt-32">
                <div className="max-w-4xl mx-auto px-6 pb-20">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span>BACK TO BLOG</span>
                    </Link>

                    <article>
                        <div className="mb-12">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags?.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-500 tracking-wider">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                {post.title}
                            </h1>

                            {/* Meta */}
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <span>
                                    {parseLocalDate(post.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span>•</span>
                                <span>Cameron Rydwell</span>
                            </div>

                            <div className="w-full h-px bg-white/10 mt-8" />
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <MDXContent content={post.content} />
                        </div>

                        {/* Footer */}
                        <div className="mt-16 pt-8 border-t border-white/10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group">
                                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                    <span>BACK TO BLOG</span>
                                </Link>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">SHARE:</span>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://camry.dev/blog/${post.slug}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-500 hover:text-[#FF2E63] transition-colors"
                                    >
                                        TWITTER
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://camry.dev/blog/${post.slug}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-500 hover:text-[#FF2E63] transition-colors"
                                    >
                                        LINKEDIN
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
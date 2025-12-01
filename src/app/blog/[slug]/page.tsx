import blogPosts from '@/data/blogPosts.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden">
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-brand-secondary group-hover:bg-[#EF4444] transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-brand-accent group-hover:bg-brand-accent/80 transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-brand-primary group-hover:bg-brand-primary/80 transition-colors"></div>
                            </div>
                            <span className="text-sm font-mono ml-2">← BLOG</span>
                        </Link>

                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            blog/{post.slug}
                        </div>

                        <div className="text-gray-500 text-xs font-mono">
                            {(() => {
                                const [y, m, d] = post.date.split('-');
                                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
                            })()}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <article className="font-mono text-white">
                            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-inter text-white leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/10">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white/5 backdrop-blur-sm text-brand-primary border border-brand-primary/30 rounded-md text-xs font-mono"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <div className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-gray-300 font-sans">
                                    <span className="text-gray-500 font-mono">$ cat {post.slug}.txt</span>
                                    <div className="mt-4 pl-4 border-l-2 border-brand-primary/30">
                                        {post.content}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-6 border-t border-white/10">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent font-mono text-sm transition-colors duration-300 group"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                    <span>RETURN TO BLOG</span>
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/mdx/MDXContent';
import { getPostBySlug, getPostSlugs, Post } from '@/lib/mdx';
import BackLink from '@/components/BackLink';

export async function generateStaticParams() {
    return getPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Not Found' };
    return { title: post.title, description: post.excerpt };
}

function parseDate(d: string) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post: Post | null = getPostBySlug(slug);
    if (!post) notFound();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>

            {/* Hero */}
            <div style={{ position: 'relative', width: '100%', height: post.image ? '60vh' : '40vh', overflow: 'hidden', background: 'var(--gray-900)' }}>
                {post.image ? (
                    <img src={post.image} alt={post.title} style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        filter: 'grayscale(20%) brightness(0.65)',
                    }} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <span style={{ fontSize: '5rem', opacity: 0.3 }}>📝</span>
                    </div>
                )}
                {/* Bottom fade — pure overlay, no gradient */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                    background: 'var(--black)',
                    maskImage: 'linear-gradient(to bottom, transparent, black)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
                }} />
            </div>

            {/* Content */}
            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 6vw 6rem' }}>

                {/* Back */}
                <BackLink href="/blog" label="← BACK TO BLOG" />

                <article>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {post.tags?.map(t => (
                            <span key={t} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                                color: 'var(--gray-500)', border: '1px solid var(--gray-800)', padding: '3px 10px',
                            }}>
                #{t}
              </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                        letterSpacing: '0.02em',
                        lineHeight: 0.95,
                        marginBottom: '1.5rem',
                    }}>
                        {post.title}
                    </h1>

                    {/* Meta row */}
                    <div style={{
                        display: 'flex', gap: '1.5rem', alignItems: 'center',
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
                        color: 'var(--gray-500)',
                        paddingBottom: '2.5rem',
                        borderBottom: '1px solid var(--gray-800)',
                        marginBottom: '2.5rem',
                    }}>
                        <span>{parseDate(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span style={{ color: 'var(--gray-700)' }}>·</span>
                        <span>Cameron Rydwell</span>
                    </div>

                    {/* Body */}
                    <div className="prose-editorial">
                        <MDXContent content={post.content} />
                    </div>

                    {/* Footer */}
                    <div style={{
                        marginTop: '5rem', paddingTop: '2.5rem',
                        borderTop: '1px solid var(--gray-800)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        flexWrap: 'wrap', gap: '1rem',
                    }}>
                        <BackLink href="/blog" label="← ALL POSTS" />

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-600)' }}>SHARE:</span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://camry.dev/blog/${post.slug}`)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                X →
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
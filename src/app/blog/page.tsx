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
        <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)', paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

                {/* Header */}
                <div style={{ marginBottom: '5rem' }}>
          <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.2em', color: 'var(--gray-500)', display: 'block', marginBottom: '0.75rem',
          }}>
            Journal / {posts.length} entr{posts.length !== 1 ? 'ies' : 'y'}
          </span>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 0.9,
                        marginBottom: '1.5rem',
                    }}>
                        BLOG
                    </h1>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--gray-400)', maxWidth: '480px', lineHeight: 1.6 }}>
                        Thoughts, updates, and things I feel like saying. Unfiltered.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div style={{
                        border: '1px solid var(--gray-800)', padding: '4rem',
                        textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--gray-500)',
                    }}>
                        No posts yet. Check back soon.
                    </div>
                ) : (
                    <>
                        {/* Featured Post — Full Width */}
                        {featured && (
                            <Link href={`/blog/${featured.slug}`} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0',
                                border: '1px solid var(--gray-800)',
                                textDecoration: 'none',
                                color: 'var(--white)',
                                marginBottom: '1px',
                                background: 'var(--gray-900)',
                            }}
                                  className="featured-post"
                            >
                                {/* Image */}
                                <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', background: 'var(--gray-800)' }}>
                                    {featured.image ? (
                                        <img src={featured.image} alt={featured.title} style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            display: 'block', filter: 'grayscale(20%)',
                                            transition: 'filter 0.5s, transform 0.5s',
                                        }}
                                             className="post-img"
                                        />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                            <span style={{ fontSize: '3rem' }}>📝</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--red)', border: '1px solid var(--red)', padding: '3px 8px' }}>
                        LATEST
                      </span>
                                            {featured.tags?.slice(0, 1).map((t: string) => (
                                                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                          #{t}
                        </span>
                                            ))}
                                        </div>

                                        <h2 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                            letterSpacing: '0.02em',
                                            lineHeight: 1,
                                            marginBottom: '1rem',
                                            transition: 'color 0.2s',
                                        }}
                                            className="post-title"
                                        >
                                            {featured.title}
                                        </h2>

                                        <p style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '1.1rem',
                                            color: 'var(--gray-400)',
                                            lineHeight: 1.65,
                                        }}>
                                            {featured.excerpt}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                      {formatDate(featured.date)}
                    </span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-400)' }}>
                      READ →
                    </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Remaining posts grid */}
                        {rest.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '1px',
                                background: 'var(--gray-800)',
                                border: '1px solid var(--gray-800)',
                            }}>
                                {rest.map(post => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`}
                                          style={{
                                              display: 'block',
                                              background: 'var(--gray-900)',
                                              textDecoration: 'none',
                                              color: 'var(--white)',
                                              transition: 'background 0.2s',
                                          }}
                                          className="post-card"
                                    >
                                        {/* Image */}
                                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--gray-800)' }}>
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} style={{
                                                    width: '100%', height: '100%', objectFit: 'cover',
                                                    display: 'block', filter: 'grayscale(30%)',
                                                    transition: 'filter 0.4s, transform 0.4s',
                                                }}
                                                     className="post-img"
                                                />
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                    <span style={{ fontSize: '2rem' }}>📝</span>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                          {formatDate(post.date)}
                        </span>
                                                {post.tags?.slice(0, 1).map((t: string) => (
                                                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-600)' }}>
                            #{t}
                          </span>
                                                ))}
                                            </div>

                                            <h3 style={{
                                                fontFamily: 'var(--font-display)',
                                                fontSize: '1.6rem',
                                                letterSpacing: '0.03em',
                                                marginBottom: '0.5rem',
                                                transition: 'color 0.2s',
                                            }}
                                                className="post-title"
                                            >
                                                {post.title}
                                            </h3>

                                            <p style={{
                                                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                                                color: 'var(--gray-400)', lineHeight: 1.5,
                                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                                            }}>
                                                {post.excerpt}
                                            </p>

                                            <div style={{ marginTop: '1.25rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                          READ MORE →
                        </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
        .featured-post:hover .post-title { color: var(--red); }
        .featured-post:hover .post-img { filter: grayscale(0%) !important; transform: scale(1.03); }
        .post-card:hover { background: var(--gray-800) !important; }
        .post-card:hover .post-title { color: var(--red); }
        .post-card:hover .post-img { filter: grayscale(0%) !important; transform: scale(1.04); }
        @media (max-width: 768px) {
          .featured-post { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
'use client';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            background: 'var(--gray-900)',
            borderTop: '1px solid var(--gray-800)',
            padding: '4rem 2rem 2.5rem',
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* Top Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem',
                }}>

                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
              <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  letterSpacing: '0.06em',
                  color: 'var(--white)',
              }}>
                CAMRY<span style={{ color: 'var(--red)' }}>.</span>DEV
              </span>
                        </div>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.95rem',
                            color: 'var(--gray-400)',
                            lineHeight: 1.7,
                            maxWidth: '240px',
                        }}>
                            Content Creator, Fitness Addict, Engineer
                        </p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem' }}>
                            <span style={{ width: '6px', height: '6px', background: 'var(--red)', display: 'block' }} />
                            <span style={{ width: '6px', height: '6px', background: 'var(--gray-600)', display: 'block' }} />
                            <span style={{ width: '6px', height: '6px', background: 'var(--gray-700)', display: 'block' }} />
                        </div>
                    </div>

                    {/* Navigate */}
                    <div>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--gray-500)',
                display: 'block',
                marginBottom: '1rem',
            }}>NAVIGATE</span>
                        {[
                            { name: 'Projects', href: '/projects' },
                            { name: 'Blog',     href: '/blog'     },
                            { name: 'About',    href: '/about'    },
                            { name: 'Contact',  href: '/contact'  },
                        ].map(link => (
                            <a key={link.href} href={link.href} style={{
                                display: 'block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.08em',
                                color: 'var(--gray-400)',
                                textDecoration: 'none',
                                padding: '0.35rem 0',
                                transition: 'color 0.2s',
                            }}
                               onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                               onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Connect */}
                    <div>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--gray-500)',
                display: 'block',
                marginBottom: '1rem',
            }}>CONNECT</span>
                        {[
                            { name: 'GitHub',   url: 'https://github.com/s-rious' },
                            { name: 'X',        url: 'https://x.com/s7rious' },
                            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/cameron-rydwell-52681a268' },
                            { name: 'YouTube',  url: 'https://youtube.com/seriousreal' },
                            { name: 'Twitch',   url: 'https://twitch.tv/s_rious' },
                            { name: 'TikTok',   url: 'https://tiktok.com/@s_rious' },
                        ].map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                                display: 'block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                letterSpacing: '0.08em',
                                color: 'var(--gray-400)',
                                textDecoration: 'none',
                                padding: '0.35rem 0',
                                transition: 'color 0.2s',
                            }}
                               onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                               onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
                            >
                                {s.name} ↗
                            </a>
                        ))}
                    </div>

                    {/* Availability */}
                    <div>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--gray-500)',
                display: 'block',
                marginBottom: '1rem',
            }}>AVAILABILITY</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <span style={{
                  display: 'block',
                  width: '6px', height: '6px',
                  background: '#22C55E',
                  borderRadius: '50%',
              }} />
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                color: '#22C55E',
                            }}>Open to partnerships</span>
                        </div>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'var(--gray-400)',
                            lineHeight: 1.6,
                        }}>
                            Brands, collaborations,<br />sponsored content.
                        </p>
                        <a href="mailto:him@camry.dev" style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.12em',
                            color: 'var(--white)',
                            textDecoration: 'none',
                            borderBottom: '1px solid var(--red)',
                            paddingBottom: '2px',
                        }}>
                            him@camry.dev
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid var(--gray-800)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
          <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--gray-600)',
          }}>
            © {year} Cameron Rydwell. SF & LA, CA.
          </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: 'var(--gray-600)',
                    }}>
          </span>
                </div>
            </div>
        </footer>
    );
}
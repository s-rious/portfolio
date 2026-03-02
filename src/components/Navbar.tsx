'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { name: 'Projects', path: '/projects' },
    { name: 'Blog',     path: '/blog'     },
    { name: 'About',    path: '/about'    },
    { name: 'Contact',  path: '/contact'  },
];

export default function Navbar() {
    const [scrolled,    setScrolled]    = useState(false);
    const [menuOpen,    setMenuOpen]    = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => setMenuOpen(false), [pathname]);

    return (
        <>
            {/* ── NAV BAR ─────────────────────────────────────── */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 100,
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                    background: scrolled ? 'rgba(8,8,8,0.97)' : 'transparent',
                    borderBottom: scrolled ? '1px solid #1C1B1A' : '1px solid transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                }}
            >
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                letterSpacing: '0.06em',
                color: 'var(--white)',
            }}>
              CAMRY<span style={{ color: 'var(--red)' }}>.</span>DEV
            </span>
                    </Link>

                    {/* Desktop links */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2.5rem',
                        transition: 'opacity 0.3s',
                        opacity: scrolled ? 0 : 1,
                        pointerEvents: scrolled ? 'none' : 'auto',
                    }} className="hide-mobile">
                        {NAV_LINKS.map(link => {
                            const active = pathname === link.path;
                            return (
                                <Link key={link.path} href={link.path} style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    color: active ? 'var(--red)' : 'var(--gray-400)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                    paddingBottom: active ? '2px' : '0',
                                    borderBottom: active ? '1px solid var(--red)' : '1px solid transparent',
                                }}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Hamburger (shows when scrolled) */}
                    <button
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            opacity: scrolled ? 1 : 0,
                            pointerEvents: scrolled ? 'auto' : 'none',
                            transition: 'opacity 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            zIndex: 110,
                        }}
                    >
                        {[0,1,2].map(i => (
                            <span key={i} style={{
                                display: 'block',
                                width: '22px',
                                height: '1.5px',
                                background: 'var(--white)',
                                transition: 'transform 0.3s, opacity 0.3s',
                                transform: menuOpen
                                    ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                                        : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                                            : 'scaleX(0)'
                                    : 'none',
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>
            </nav>

            {/* ── SLIDE-OVER MENU ─────────────────────────────── */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99,
                pointerEvents: menuOpen ? 'auto' : 'none',
            }}>
                {/* Backdrop */}
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(8,8,8,0.85)',
                        opacity: menuOpen ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                    }}
                />

                {/* Panel */}
                <div style={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0,
                    width: '320px',
                    maxWidth: '85vw',
                    background: 'var(--gray-900)',
                    borderLeft: '1px solid var(--gray-800)',
                    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5rem 2rem 2rem',
                }}>
                    {/* Eyebrow */}
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gray-500)',
                        marginBottom: '2rem',
                    }}>
            NAVIGATE
          </span>

                    {NAV_LINKS.map((link, i) => {
                        const active = pathname === link.path;
                        return (
                            <Link key={link.path} href={link.path} style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.2rem',
                                letterSpacing: '0.06em',
                                color: active ? 'var(--red)' : 'var(--white)',
                                textDecoration: 'none',
                                padding: '0.75rem 0',
                                borderBottom: '1px solid var(--gray-800)',
                                transition: 'color 0.2s',
                                animationDelay: `${i * 60}ms`,
                            }}>
                                {link.name.toUpperCase()}
                            </Link>
                        );
                    })}

                    {/* Social links bottom */}
                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
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
                            { name: 'X',  url: 'https://x.com/s7rious' },
                            { name: 'YouTube',  url: 'https://youtube.com/seriousreal' },
                        ].map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                               style={{
                                   display: 'block',
                                   fontFamily: 'var(--font-mono)',
                                   fontSize: '0.7rem',
                                   letterSpacing: '0.1em',
                                   color: 'var(--gray-400)',
                                   textDecoration: 'none',
                                   padding: '0.4rem 0',
                                   transition: 'color 0.2s',
                               }}>
                                {s.name} →
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
      `}</style>
        </>
    );
}
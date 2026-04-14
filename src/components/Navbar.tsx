'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const navLinks = [
        { name: 'ON TOUR', path: '/tour' },
        /* { name: 'PROJECTS', path: '/projects' }, */
        { name: 'BLOG', path: '/blog' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
    ];

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 50,
                    transition: 'background 0.3s, border-color 0.3s',
                    background: isScrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--gray-800)' : '1px solid transparent',
                }}
            >
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '1.25rem 6vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', position: 'relative', zIndex: 50 }}>
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.25rem',
                            letterSpacing: '0.05em',
                            color: 'var(--white)',
                        }}>
                            CAMRY.DEV
                        </span>
                    </Link>

                    {/* Desktop nav — hidden when scrolled */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2.5rem',
                        opacity: isScrolled ? 0 : 1,
                        pointerEvents: isScrolled ? 'none' : 'auto',
                        transition: 'opacity 0.3s',
                    }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                href={link.path}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.62rem',
                                    letterSpacing: '0.16em',
                                    textDecoration: 'none',
                                    color: isActive(link.path) ? 'var(--red)' : 'var(--gray-400)',
                                    borderBottom: isActive(link.path) ? '1px solid var(--red)' : '1px solid transparent',
                                    paddingBottom: '2px',
                                    transition: 'color 0.2s, border-color 0.2s',
                                    // ON TOUR gets a subtle accent
                                    ...(link.path === '/tour' && !isActive(link.path) ? {
                                        color: 'var(--white)',
                                    } : {}),
                                }}
                                onMouseEnter={e => {
                                    if (!isActive(link.path)) {
                                        (e.currentTarget as HTMLElement).style.color = 'var(--white)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive(link.path)) {
                                        (e.currentTarget as HTMLElement).style.color =
                                            link.path === '/tour' ? 'var(--white)' : 'var(--gray-400)';
                                    }
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger — shows when scrolled */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            position: 'relative',
                            zIndex: 50,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            opacity: isScrolled ? 1 : 0,
                            pointerEvents: isScrolled ? 'auto' : 'none',
                            transition: 'opacity 0.3s',
                        }}
                        aria-label="Toggle menu"
                    >
                        <div style={{ width: '24px', height: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <span style={{
                                display: 'block', width: '100%', height: '1.5px', background: 'var(--white)',
                                transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                                transition: 'transform 0.3s',
                            }} />
                            <span style={{
                                display: 'block', width: '100%', height: '1.5px', background: 'var(--white)',
                                opacity: isMenuOpen ? 0 : 1,
                                transition: 'opacity 0.3s',
                            }} />
                            <span style={{
                                display: 'block', width: '100%', height: '1.5px', background: 'var(--white)',
                                transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                                transition: 'transform 0.3s',
                            }} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Slide-over menu */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 40,
                pointerEvents: isMenuOpen ? 'auto' : 'none',
            }}>
                {/* Overlay */}
                <div
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(8,8,8,0.85)',
                        opacity: isMenuOpen ? 1 : 0,
                        transition: 'opacity 0.4s',
                    }}
                />

                {/* Panel */}
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0,
                    width: '320px', maxWidth: '80vw',
                    background: 'var(--black)',
                    borderLeft: '1px solid var(--gray-800)',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6rem 2.5rem 2.5rem',
                }}>
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                letterSpacing: '0.04em',
                                textDecoration: 'none',
                                color: isActive(link.path) ? 'var(--red)' : link.path === '/tour' ? 'var(--white)' : 'var(--gray-400)',
                                padding: '1rem 0',
                                borderBottom: '1px solid var(--gray-800)',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = isActive(link.path) ? 'var(--red)' : 'var(--white)')}
                            onMouseLeave={e => (e.currentTarget.style.color = isActive(link.path) ? 'var(--red)' : link.path === '/tour' ? 'var(--white)' : 'var(--gray-400)')}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
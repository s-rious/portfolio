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
        { name: 'PROJECTS', path: '/projects' },
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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-xl border-b border-white/10`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo - Always visible */}
                    <Link href="/" className="relative z-50">
                        <h1
                            className="text-xl font-black tracking-tight"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            CAMRY.DEV
                        </h1>
                    </Link>

                    {/* Desktop Navigation - Hidden when scrolled */}
                    <div className={`hidden lg:flex items-center gap-8 transition-opacity duration-300 ${
                        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="relative group"
                            >
                                <span
                                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                                        isActive(link.path) ? 'text-[#FF2E63]' : 'text-white hover:text-[#FF2E63]'
                                    }`}
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    {link.name}
                                </span>
                                {isActive(link.path) && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF2E63]" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger Button - Always visible on mobile, shows on desktop when scrolled */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`relative z-50 p-2 transition-all duration-300 lg:${
                            isScrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                                    isMenuOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Slide-Over Menu (All Screen Sizes) */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 ${
                    isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            >
                {/* Black Overlay */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                        isMenuOpen ? 'opacity-80' : 'opacity-0'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Panel (slides from right) */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-80 max-w-[80vw] bg-black border-l border-white/10 transition-transform duration-500 ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex flex-col h-full p-8 pt-24">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`py-4 border-b border-white/10 transition-all duration-300 ${
                                    isActive(link.path) ? 'text-[#FF2E63]' : 'text-white hover:text-[#FF2E63]'
                                }`}
                                style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '1.5rem',
                                    animation: isMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.1}s both` : 'none'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
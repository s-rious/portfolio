'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'PROJECTS', path: '/projects' },
        { name: 'BLOG', path: '/blog' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={`${isSticky ? 'fixed' : 'sticky'} top-0 left-0 right-0 bg-black shadow-lg z-50 transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex items-center justify-center gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-xl">;</span>
                            </div>
                            <span className="text-white text-xl font-semibold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                CAMRY
              </span>
                        </div>
                    </Link>
                    {/* Vertical Divider */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium tracking-wide transition-colors ${
                                    isActive(link.path)
                                        ? 'text-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden absolute right-6 top-6 p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <div className="space-y-1.5">
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                    </div>
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden pt-6 mt-6 border-t border-gray-700">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-sm font-medium tracking-wide transition-colors ${
                                        isActive(link.path)
                                            ? 'text-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
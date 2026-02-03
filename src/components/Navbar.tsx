// components/Navbar.tsx - Replace entire file
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'PROJECTS', path: '/projects' },
        { name: 'BLOG', path: '/blogImgs' },
        { name: 'ABOUT', path: '/about' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-xl shadow-2xl border-b border-white/5 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                            <span className="text-black font-bold text-xl font-mono">;</span>
                        </div>
                        <span className="text-white text-xl font-semibold tracking-tight font-inter">
              CAMRY.DEV
            </span>
                    </Link>
                    <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium tracking-wide transition-all duration-300 font-inter relative group py-2 ${
                                    isActive(link.path)
                                        ? 'text-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#14B8A6] via-[#F87171] to-[#F59E0B] transition-all duration-500 ease-out ${
                                    isActive(link.path)
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                }`}></span>
                                <span className="absolute inset-0 -z-10 bg-white/5 backdrop-blur-sm rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/contact"
                        className="hidden lg:block px-6 py-2 relative overflow-hidden text-white font-medium rounded-lg transition-all duration-300 font-inter group border border-white/10"
                    >
                        <span className="absolute inset-0 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/10"></span>
                        <span className="absolute inset-0 bg-gradient-to-t from-[#14B8A6] via-[#F87171] to-[#F59E0B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                        <span className="relative z-10">CONTACT</span>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        <div className="space-y-1.5">
                            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                        </div>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden pt-6 mt-6 border-t border-white/10 backdrop-blur-xl">
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-sm font-medium tracking-wide transition-all duration-300 font-inter px-4 py-2 rounded-lg ${
                                        isActive(link.path)
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-6 py-2 bg-white/10 backdrop-blur-md text-white font-medium rounded-lg hover:bg-white/20 border border-white/10 transition-all duration-300 text-center font-inter mt-2"
                            >
                                CONTACT
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
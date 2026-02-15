export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative mt-auto overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
                borderTop: '1px solid rgba(255, 46, 99, 0.2)'
            }}
        >
            {/* Electric line decoration */}
            <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
                <div
                    className="h-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #FF2E63, #00E5FF, #CCFF00, transparent)',
                        animation: 'gradient-shift 4s ease infinite',
                        backgroundSize: '200% 100%'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Logo & Tagline */}
                    <div>
                        <div className="flex items-center gap-3 mb-4 group">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                                style={{
                                    background: 'linear-gradient(135deg, #FF2E63 0%, #00E5FF 100%)',
                                    boxShadow: '0 0 20px rgba(255, 46, 99, 0.3)'
                                }}
                            >
                                <span
                                    className="font-bold text-xl font-mono"
                                    style={{ color: '#0A0A0A' }}
                                >
                                    ;
                                </span>
                            </div>
                            <span
                                className="text-xl font-black tracking-tight"
                                style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    color: '#F5F5F5'
                                }}
                            >
                                CAMRY.DEV
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            Building the intersection of software and hardware. One project at a time.
                        </p>

                        {/* Electric dots */}
                        <div className="flex gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: '#FF2E63',
                                    boxShadow: '0 0 10px rgba(255, 46, 99, 0.6)',
                                    animation: 'neon-flicker 2s ease-in-out infinite'
                                }}
                            />
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: '#00E5FF',
                                    boxShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
                                    animation: 'neon-flicker 2s ease-in-out infinite 0.3s'
                                }}
                            />
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: '#CCFF00',
                                    boxShadow: '0 0 10px rgba(204, 255, 0, 0.6)',
                                    animation: 'neon-flicker 2s ease-in-out infinite 0.6s'
                                }}
                            />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            className="font-black mb-4 text-lg"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                color: '#F5F5F5',
                                letterSpacing: '0.05em'
                            }}
                        >
                            NAVIGATE
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'Projects', href: '/projects' },
                                { name: 'Blog', href: '/blog' },
                                { name: 'About', href: '/about' },
                                { name: 'Contact', href: '/contact' }
                            ].map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#F5F5F5] transition-all duration-300"
                                    >
                                        <span
                                            className="w-0 h-px group-hover:w-3 transition-all duration-300"
                                            style={{
                                                background: 'linear-gradient(90deg, #FF2E63, #00E5FF)',
                                                boxShadow: '0 0 5px rgba(255, 46, 99, 0.5)'
                                            }}
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3
                            className="font-black mb-4 text-lg"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                color: '#F5F5F5',
                                letterSpacing: '0.05em'
                            }}
                        >
                            CONNECT
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'GitHub', href: 'https://github.com/s-rious', color: '#FF2E63' },
                                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cameron-rydwell-52681a268', color: '#00E5FF' },
                                { name: 'Twitter', href: 'https://x.com/s7rious', color: '#CCFF00' }
                            ].map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#F5F5F5] transition-all duration-300"
                                    >
                                        <span
                                            className="w-0 h-px group-hover:w-3 transition-all duration-300"
                                            style={{
                                                background: link.color,
                                                boxShadow: `0 0 5px ${link.color}`
                                            }}
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="mt-8 pt-8 text-center"
                    style={{
                        borderTop: '1px solid rgba(255, 46, 99, 0.1)'
                    }}
                >
                    <p className="text-sm text-gray-500">
                        © {currentYear} Cameron Rydwell.
                    </p>
                </div>
            </div>

            {/* Bottom electric pulse */}
            <div className="absolute bottom-0 left-0 right-0 h-px">
                <div
                    className="h-full opacity-30"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #FF2E63, #00E5FF, #CCFF00, transparent)',
                        animation: 'gradient-shift 6s ease infinite',
                        backgroundSize: '200% 100%'
                    }}
                />
            </div>
        </footer>
    );
}
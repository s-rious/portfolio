export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-xl">;</span>
                            </div>
                            <span className="text-white text-xl font-semibold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                CAMRY.DEV
              </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            BLENDING THE DIGITAL AND PHYSICAL WORLD.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="https://github.com/s-rious" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/cameron-rydwell-52681a268" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
                            <li><a href="https://x.com/s7rious" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Cameron Rydwell. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
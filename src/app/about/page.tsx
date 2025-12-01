export const runtime = 'edge';

import aboutData from '@/data/about.json';

export default function About() {
    return (
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-6xl mx-auto">
                {/* Terminal Container */}
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#F87171]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#14B8A6]"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/about
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            PROFILE
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Left Column - Image */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-32">
                                    {/* Profile Image Placeholder */}
                                    <div className="aspect-square bg-gradient-to-br from-[#14B8A6]/20 via-[#F87171]/20 to-[#F59E0B]/20 rounded-lg border-2 border-white/10 flex items-center justify-center overflow-hidden mb-6">
                                        <div className="text-center">
                                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                                <span className="text-5xl font-bold text-white font-mono">;</span>
                                            </div>
                                            <p className="text-gray-500 text-sm font-mono">PROFILE IMAGE</p>
                                        </div>
                                    </div>

                                    {/* Socials */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-mono text-gray-500 uppercase mb-4">Connect</h3>
                                        {Object.entries(aboutData.socials).map(([platform, url]) => (
<a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#14B8A6]/50 transition-all duration-300 group"
                                            >
                                            <span className="text-gray-400 group-hover:text-[#14B8A6] font-mono text-sm transition-colors duration-300">
                                        {platform.toUpperCase()}
                                            </span>
                                            </a>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Information */}
                            <div className="lg:col-span-2 space-y-8 font-mono text-white">
                                {/* Name & Basic Info */}
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-2 font-inter text-white">
                                        {aboutData.name}
                                    </h1>
                                    <p className="text-xl text-gray-400 font-inter mb-6">
                                        {aboutData.title}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                            Age: {aboutData.age}
                                        </span>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                            {aboutData.schoolStatus}
                                        </span>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                            {aboutData.major}
                                        </span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="border-l-2 border-[#14B8A6]/30 pl-6">
                                    <h2 className="text-sm text-gray-500 uppercase mb-3">$ whoami</h2>
                                    <p className="text-gray-300 leading-relaxed font-sans">
                                        {aboutData.bio}
                                    </p>
                                </div>

                                {/* Languages Certified */}
                                <div>
                                    <h2 className="text-sm text-gray-500 uppercase mb-4">$ skills --certified</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {aboutData.languagesCertified.map((lang) => (
                                            <span
                                                key={lang}
                                                className="px-4 py-2 bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] rounded-md text-sm"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Languages Learning */}
                                <div>
                                    <h2 className="text-sm text-gray-500 uppercase mb-4">$ skills --learning</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {aboutData.languagesLearning.map((lang) => (
                                            <span
                                                key={lang}
                                                className="px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] rounded-md text-sm"
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Awards */}
                                <div>
                                    <h2 className="text-sm text-gray-500 uppercase mb-4">$ achievements --list</h2>
                                    <div className="space-y-2">
                                        {aboutData.awards.map((award, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-[#F87171]/50 transition-all duration-300"
                                            >
                                                <span className="text-gray-300">
                                                    <span className="text-[#F87171] mr-2">›</span>
                                                    {award}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
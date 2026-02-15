'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
    const [currentStatus, setCurrentStatus] = useState<any>(null);
    const [gear, setGear] = useState<any>(null);
    const [roadmap, setRoadmap] = useState<any[]>([]);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Load all data
        Promise.all([
            import('@/data/projects.json'),
            import('@/data/currentStatus.json'),
            import('@/data/gear.json'),
            import('@/data/roadmap.json')
        ]).then(([projectsData, statusData, gearData, roadmapData]) => {
            setFeaturedProjects(projectsData.default.filter((p: any) => p.featured).slice(0, 3));
            setCurrentStatus(statusData.default);
            setGear(gearData.default);
            setRoadmap(roadmapData.default);
        }).catch(() => {
            // Fallback if files don't exist yet
            import('@/data/projects.json').then((data) => {
                setFeaturedProjects(data.default.filter((p: any) => p.featured).slice(0, 3));
            });
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    /* useEffect(() => {
        fetch('/api/youtube/rss')
            .then(res => res.json())
            .then(data => {
                setCurrentStatus((prev: any) => ({
                    ...(prev || {}),
                    latestVideo: {
                        title: data.title,
                        uploadedAgo: new Date(data.publishedAt).toLocaleDateString(),
                        url: data.url,
                        thumbnail: data.thumbnail,
                    }
                }))
            })
            .catch(console.error)
    }, []) */


    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'bbae9f51-efb6-45bc-beaa-7a8585764cbf', // Same key as contact form
                    subject: 'New Subscriber',
                    email: subscribeEmail,
                    message: `New subscriber: ${subscribeEmail}`
                }),
            });

            if (response.ok) {
                setSubscribeStatus('success');
                setSubscribeEmail('');
                setTimeout(() => setSubscribeStatus('idle'), 5000);
            } else {
                new Error('Failed');
            }
        } catch (error) {
            setSubscribeStatus('error');
            setTimeout(() => setSubscribeStatus('idle'), 5000);
        }
    };

    // Hero scroll logic (now 4 scenes instead of 5)
    const [heroScrollHeight, setHeroScrollHeight] = useState(4000) // SSR fallback
    useEffect(() => {
        setHeroScrollHeight(window.innerHeight * 4)
    }, [])

    const sceneIndex = Math.min(3, Math.floor((scrollY / heroScrollHeight) * 4));

    return (
        <div className="bg-black text-white">
            {/* Spacer for hero scroll */}
            <div style={{ height: `${heroScrollHeight}px` }} />
            {/* Sticky Hero */}
            <div
                className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10"
                style={{
                    opacity: scrollY < heroScrollHeight ? 1 : 0,
                    pointerEvents: scrollY < heroScrollHeight ? 'auto' : 'none'
                }}
            >
                {/* Scene 0: Name + Title */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    style={{
                        opacity: sceneIndex === 0 ? 1 : 0,
                        transition: 'opacity 0.6s ease'
                    }}
                >
                    <h1
                        className="text-7xl md:text-9xl font-black tracking-tight mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        CAMERON RYDWELL
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl md:text-2xl text-gray-400 tracking-wide">
                        Content Creator × Engineer
                    </p>
                </div>

                {/* Scene 1: What You Do Grid */}
                <div
                    className="absolute inset-0 flex items-center justify-center px-6"
                    style={{
                        opacity: sceneIndex === 1 ? 1 : 0,
                        transition: 'opacity 0.6s ease'
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl">
                        {[
                            { word: 'GAMES', image: '/imgs/interests/games.png' },
                            { word: 'CODE', image: '/imgs/interests/code.jpg' },
                            { word: 'CARS', image: '/imgs/interests/cars.jpg' },
                            { word: 'FILM', image: '/imgs/interests/film.png' },
                            { word: 'ESPORTS', image: '/imgs/interests/esports.jpg' },
                            { word: 'GYM', image: '/imgs/interests/gym.jpg' },
                        ].map((item, i) => (
                            <div
                                key={item.word}
                                className="text-center relative group cursor-pointer z-0 h-32 md:h-40 flex items-center justify-center"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                                }}
                            >
                                {/* Background Preview Image */}
                                <div
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        filter: 'blur(8px)',
                                        transform: 'scale(1.2)'
                                    }}
                                />
                                <div
                                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-white/20"
                                />

                                <h2
                                    className="text-4xl md:text-6xl font-black relative z-10 group-hover:scale-110 transition-transform duration-300"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    {item.word}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    style={{
                        opacity: sceneIndex === 3 ? 1 : 0,
                        transition: 'opacity 0.6s ease'
                    }}
                >
                    <h2
                        className="text-6xl md:text-8xl font-black mb-12 relative z-10"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        OFF WE GO...
                    </h2>

                    {/* Curtain Reveal Hint */}
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="text-sm text-gray-500 tracking-widest animate-pulse">
                            SCROLL TO EXPLORE
                        </div>
                        <svg width="24" height="40" viewBox="0 0 24 40" className="animate-bounce">
                            <rect x="8" y="4" width="8" height="32" rx="4" fill="none" stroke="white" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="2" fill="white">
                                <animate attributeName="cy" values="12;24;12" dur="2s" repeatCount="indefinite"/>
                            </circle>
                        </svg>
                    </div>

                    {/* Curtain Edge Preview */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, transparent 0%, #1A1A1A 100%)',
                            opacity: 0.6
                        }}
                    />
                </div>
            </div>

            {/* Main Content - Different Background Color */}
            <div className="relative z-20 bg-[#1A1A1A]">

                {/* What's Happening Section - Now appears immediately after hero */}
                {currentStatus && (
                    <section className="py-32 px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2
                                className="text-5xl md:text-6xl font-black mb-16"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                WHAT'S HAPPENING
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Latest Video */}
                                <div className="border border-white/20 hover:border-[#FF2E63] transition-colors duration-300 group">
                                    <div className="aspect-video overflow-hidden bg-black">
                                        <img
                                            src={currentStatus.latestVideo.thumbnail}
                                            alt={currentStatus.latestVideo.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="text-xs text-gray-500 mb-2 tracking-wider">LATEST VIDEO</div>
                                        <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                            {currentStatus.latestVideo?.title || 'Coming Soon'}
                                        </h3>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>{currentStatus.latestVideo?.uploadedAgo || 'Soon'}</span>
                                        </div>
                                        <a
                                            href={currentStatus.latestVideo.url}
                                            target="_blank"
                                            className="inline-block mt-4 px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider"
                                        >
                                            WATCH NOW
                                        </a>
                                    </div>
                                </div>

                                {/* Current Project */}
                                <div className="border border-white/20">
                                    <div className="p-6">
                                        <div className="text-xs text-gray-500 mb-2 tracking-wider">CURRENT PROJECT</div>
                                        <h3 className="text-4xl font-black mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                            {currentStatus.currentProject?.name || 'PROJECT NAME'}
                                        </h3>
                                        <p className="text-gray-400 mb-4">
                                            {currentStatus.currentProject?.description || 'Project description'}
                                        </p>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-500">{currentStatus.currentProject?.status || 'Status'}</span>
                                                <span className="text-white">{currentStatus.currentProject?.progress || 0}%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#FF2E63] transition-all duration-500"
                                                    style={{ width: `${currentStatus.currentProject?.progress || 0}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ETA: {currentStatus.currentProject?.eta || 'TBD'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Next Stream */}
                            {currentStatus.nextStream && (
                                <div className="border border-white/20 p-8 bg-white/5">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1 tracking-wider">NEXT STREAM</div>
                                            <div className="text-3xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                {currentStatus.nextStream.title}
                                            </div>
                                            <div className="text-gray-400 mt-2">
                                                {new Date(currentStatus.nextStream.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        <a
                                            href={currentStatus.nextStream.url}
                                            target="_blank"
                                            className="px-8 py-3 bg-[#FF2E63] hover:bg-[#FF2E63]/80 text-white font-black transition-all duration-300 text-sm tracking-wider"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            VISIT TWITCH
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Featured Work */}
                <section className="py-32 px-6 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-black mb-16"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            FEATURED WORK
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={project.link || '#'}
                                    target="_blank"
                                    className="group border border-white/20 hover:border-[#FF2E63] transition-all duration-300"
                                >
                                    <div className="aspect-video bg-white/5 overflow-hidden relative">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                [PROJECT IMAGE]
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-[#FF2E63]/0 group-hover:bg-[#FF2E63]/10 transition-colors duration-300" />
                                    </div>
                                    <div className="p-6">
                                        <h3
                                            className="text-2xl font-black mb-2 group-hover:text-[#FF2E63] transition-colors"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags?.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-500"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Setup */}
                {gear && (
                    <section className="py-32 px-6 border-t border-white/10">
                        <div className="max-w-7xl mx-auto">
                            <h2
                                className="text-5xl md:text-6xl font-black mb-16"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                MY SETUP
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Coding */}
                                <div>
                                    <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                        CODING
                                    </h3>
                                    <div className="space-y-4">
                                        {gear.coding?.map((item: any) => (
                                            <div key={item.name} className="border-l-2 border-white/20 pl-4 hover:border-[#FF2E63] transition-colors">
                                                <div className="text-sm text-gray-500">{item.category}</div>
                                                <div className="font-medium">{item.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Creation */}
                                <div>
                                    <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                        CONTENT
                                    </h3>
                                    <div className="space-y-4">
                                        {gear.content?.map((item: any) => (
                                            <div key={item.name} className="border-l-2 border-white/20 pl-4 hover:border-[#00E5FF] transition-colors">
                                                <div className="text-sm text-gray-500">{item.category}</div>
                                                <div className="font-medium">{item.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gaming */}
                                <div>
                                    <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                        GAMING / STREAMING
                                    </h3>
                                    <div className="space-y-4">
                                        {gear.gaming?.map((item: any) => (
                                            <div key={item.name} className="border-l-2 border-white/20 pl-4 hover:border-[#CCFF00] transition-colors">
                                                <div className="text-sm text-gray-500">{item.category}</div>
                                                <div className="font-medium">{item.name}</div>
                                                {item.specs && <div className="text-xs text-gray-600 mt-1">{item.specs}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* What's Next */}
                {roadmap.length > 0 && (
                    <section className="py-32 px-6 border-t border-white/10">
                        <div className="max-w-7xl mx-auto">
                            <h2
                                className="text-5xl md:text-6xl font-black mb-16"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                WHAT'S NEXT
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {roadmap.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border border-white/20 p-6 hover:border-[#FF2E63] transition-colors duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">{item.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                        {item.title}
                                                    </h3>
                                                    <span className={`text-xs px-2 py-1 ${
                                                        item.status === 'Active' ? 'bg-[#FF2E63]/20 text-[#FF2E63]' :
                                                            item.status === 'In Progress' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' :
                                                                'bg-white/10 text-gray-500'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                                                <div className="text-xs text-gray-600">ETA: {item.eta}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Follow Me */}
                <section className="py-32 px-6 border-t border-white/10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2
                            className="text-5xl md:text-6xl font-black mb-8"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            WHY STICK AROUND?
                        </h2>

                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                            Follow along to see my day to day lifestyle as I figure out my identity as a 21 year old man located in Northern California. Explore the troubles of life through my endless passions in coding, content creation, gaming, car building, and gym bro'ing.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
                            {[
                                'Real-time project updates',
                                'Regularly scheduled videos/streams',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#FF2E63]" />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-12">
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={subscribeEmail}
                                    onChange={(e) => setSubscribeEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    disabled={subscribeStatus === 'loading'}
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 focus:border-[#FF2E63] text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={subscribeStatus === 'loading'}
                                    className="px-8 py-3 bg-[#FF2E63] hover:bg-[#FF2E63]/80 text-white font-black tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    {subscribeStatus === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
                                </button>
                            </div>
                            {subscribeStatus === 'success' && (
                                <p className="text-[#00E5FF] text-sm mt-3 text-center">✓ Subscribed! You'll get updates soon.</p>
                            )}
                            {subscribeStatus === 'error' && (
                                <p className="text-[#FF2E63] text-sm mt-3 text-center">✗ Failed. Please try again.</p>
                            )}
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
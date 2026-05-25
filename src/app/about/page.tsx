import aboutData from '@/data/about.json';
import eventsData from '@/data/events.json';

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
}

function formatEventDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const now = new Date();

const latestVideo = [...eventsData]
    .filter(e => e.category === 'Video' && new Date(e.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] ?? null;

const nextEvent = [...eventsData]
    .filter(e => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;
const latestVideoThumb = latestVideo
    ? (latestVideo.thumbnail || (() => {
        const id = getYouTubeId(latestVideo.url);
        return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
    })())
    : null;

const ORIGIN = [
    {
        number: '01',
        color: '#FF2E63',
        era: 'EARLY YEARS',
        period: 'Childhood - High School',
        body: [
            'Growing up, I lacked much drive in what I wanted to do and wanted to be. I started off as a clothing model for ABC News, growing a passion for fashion. Afterwards, I began to question what my identity would be, testing the waters with eSports, freelance GFX/VFX work, and local computer technician gigs.',
            'I took on a coding class my freshman year of high school, learning Python, and immediately was hooked. After receiving my certification I attended West-MEC, a local trade school in the valley. This led to self-developing numerous websites, mobile apps, and the publication of my first game "Word Escape" alongside a classmate and long-term friend.',
        ],
    },
    {
        number: '02',
        color: '#00E5FF',
        era: 'BREAKTHROUGH',
        period: 'FBLA Competitions',
        body: [
            'Built my first serious project: RYDWELL SCHOOLS, a mobile app for FBLA\'s Mobile Application Development competition. Won 1st place in Arizona State, advanced to Nationals in Chicago.',
            'Followed that up with WORD ESCAPE for the Computer Game & Programming Simulation competition. Another State championship, another trip to Nationals, this time in Atlanta. That\'s when the real question hit: do I keep coding, or venture into the next chapter?',
        ],
    },
    {
        number: '03',
        color: '#CCFF00',
        era: 'NOW',
        period: 'Present Day',
        body: [
            'Following the rise of AI, I reevaluated my path and swapped majors to Electrical Engineering, closing the gap between physical systems and software. By combining hardware knowledge with development experience, I landed exactly where I always wanted to be.',
            'One simple love remains constant: create what I\'m passionate about. And ever since I made that decision, I have not stopped pushing to become the person I want to be.',
        ],
    },
];

const CREATORS = [
    { name: 'Tim Burton & Henry Selick', note: 'Stop-motion aesthetic, dark whimsy, unique visual storytelling' },
    { name: 'A24 Films', note: 'Clean, bold, professional presentation. Earth without Art is just Eh.' },
    { name: 'Ludwig', note: 'Atop the streaming sphere, bad at almost every game, but winner of spirit and success.' },
    { name: 'Victor Nguyen', note: 'Film, day-to-day life, LA dreams, stanced car. What else could you ask for?' },
];

const PHILOSOPHY = [
    { name: 'Alan Watts', note: 'A philosophical entertainer who always knows how to convey the message of humanity.' },
    { name: 'William Shakespeare', note: 'One of the best writers of all time with a strong skeptical exploration of human existence.' },
    { name: 'James Gunn', note: 'Even when you succeed, you can still show your personality and convey your own desires.' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* ══════════════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════════════ */}
                <div className="mb-20">

                    {/* Name */}
                    <div className="mb-10">
                        <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">CAMRY.DEV / ABOUT</div>
                        <h1
                            className="text-6xl md:text-9xl font-black mb-4 leading-none"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            CAMERON<br />RYDWELL
                        </h1>
                        <div className="w-32 h-1 bg-white mb-6" />
                        <p className="text-xl text-gray-400 max-w-xl">
                            {aboutData.title}
                        </p>
                    </div>

                    {/* Photo + Bio grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Photo */}
                        <div className="lg:col-span-4">
                            <div className="border border-white/20 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                <img
                                    src={aboutData.image}
                                    alt={aboutData.imageTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bio + Stats */}
                        <div className="lg:col-span-8 flex flex-col justify-between gap-10">

                            <div>
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">BIO</div>
                                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                    {aboutData.bio}
                                </p>
                                <div className="border-l-4 border-[#FF2E63] pl-6">
                                    <p className="text-white text-xl leading-relaxed italic">
                                        "If you set your goals ridiculously high, and it's a failure, you will fail above everyone else's success."
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: 'AGE', value: String(aboutData.age) },
                                    { label: 'LOCATION', value: aboutData.location },
                                    { label: 'STATUS', value: aboutData.schoolStatus },
                                    { label: 'MAJOR', value: aboutData.major },
                                ].map(stat => (
                                    <div key={stat.label} className="border border-white/20 p-4 hover:border-[#FF2E63] transition-colors duration-300">
                                        <div className="text-xs text-gray-600 font-mono mb-1 tracking-wider">{stat.label}</div>
                                        <div
                                            className="text-sm font-black leading-tight"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem' }}
                                        >
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════
                    RIGHT NOW
                ══════════════════════════════════════════════════ */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-2 h-2 rounded-full bg-[#FF2E63]" style={{ boxShadow: '0 0 8px #FF2E63' }} />
                        <div className="text-xs text-gray-600 tracking-widest font-mono">LIVE STATUS</div>
                    </div>
                    <h2
                        className="text-5xl font-black mb-10"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        RIGHT NOW
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Latest video */}
                        {latestVideo && (
                            <a
                                href={latestVideo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group border border-white/20 hover:border-[#FF2E63] transition-all duration-300"
                            >
                                <div className="aspect-video overflow-hidden bg-white/5 relative">
                                    {latestVideoThumb ? (
                                        <img
                                            src={latestVideoThumb}
                                            alt={latestVideo.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-xs text-gray-700 font-mono tracking-widest">[THUMBNAIL]</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 border border-white/20 text-xs font-mono tracking-wider text-white">
                                        LATEST VIDEO
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-gray-600 font-mono mb-2">{formatEventDate(latestVideo.date)} · {latestVideo.platform}</div>
                                    <h3
                                        className="text-2xl font-black mb-2 group-hover:text-[#FF2E63] transition-colors duration-300"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                    >
                                        {latestVideo.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{latestVideo.description}</p>
                                    <div className="text-xs text-gray-600 font-mono mt-4 group-hover:text-gray-400 transition-colors duration-300">
                                        WATCH ↗
                                    </div>
                                </div>
                            </a>
                        )}

                        {/* Next event */}
                        <div className="border border-white/20 p-6 flex flex-col justify-between hover:border-[#00E5FF] transition-colors duration-300">
                            <div>
                                <div className="text-xs text-gray-600 font-mono mb-6 tracking-wider">COMING UP</div>
                                {nextEvent ? (
                                    <>
                                        <div className="text-xs font-mono tracking-wider mb-2" style={{ color: '#00E5FF' }}>
                                            {nextEvent.category.toUpperCase()} · {nextEvent.platform.toUpperCase()}
                                        </div>
                                        <h3
                                            className="text-3xl font-black mb-4 leading-tight"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {nextEvent.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-6">{nextEvent.description}</p>
                                        <div className="text-xs text-gray-600 font-mono">{formatEventDate(nextEvent.date)}</div>
                                    </>
                                ) : (
                                    <p className="text-gray-600 text-sm font-mono tracking-wider">NOTHING SCHEDULED YET. CHECK BACK SOON.</p>
                                )}
                            </div>
                            {nextEvent?.url && (
                                <a
                                    href={nextEvent.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 text-xs font-mono tracking-wider text-gray-500 hover:text-[#00E5FF] transition-colors duration-300"
                                >
                                    <span>SET A REMINDER</span>
                                    <span>↗</span>
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    ORIGIN STORY
                ══════════════════════════════════════════════════ */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-16"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        THE ORIGIN STORY
                    </h2>

                    <div className="space-y-0 divide-y divide-white/10">
                        {ORIGIN.map(chapter => (
                            <div key={chapter.number} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-14 items-start">

                                {/* Left: number + era */}
                                <div className="md:col-span-3">
                                    <div
                                        className="text-7xl font-black leading-none mb-3 opacity-20"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: chapter.color }}
                                    >
                                        {chapter.number}
                                    </div>
                                    <div
                                        className="text-2xl font-black mb-1"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: chapter.color }}
                                    >
                                        {chapter.era}
                                    </div>
                                    <div className="text-xs text-gray-600 font-mono tracking-wider">{chapter.period}</div>
                                </div>

                                {/* Right: body */}
                                <div className="md:col-span-9 space-y-4">
                                    {chapter.body.map((para, i) => (
                                        <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    SKILLS
                ══════════════════════════════════════════════════ */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        SKILLS & EXPERTISE
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border border-white/20 p-8">
                            <div className="text-xs text-gray-600 tracking-widest font-mono mb-6">CERTIFIED</div>
                            <div className="flex flex-wrap gap-3">
                                {aboutData.languagesCertified?.map((lang: string) => (
                                    <span
                                        key={lang}
                                        className="px-4 py-2 text-sm font-mono tracking-wider border transition-colors duration-300 hover:bg-[#FF2E63]/10"
                                        style={{ borderColor: '#FF2E63', color: '#FF2E63' }}
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border border-white/20 p-8">
                            <div className="text-xs text-gray-600 tracking-widest font-mono mb-6">CURRENTLY LEARNING</div>
                            <div className="flex flex-wrap gap-3">
                                {aboutData.languagesLearning?.map((lang: string) => (
                                    <span
                                        key={lang}
                                        className="px-4 py-2 text-sm font-mono tracking-wider border border-[#00E5FF]/40 text-[#00E5FF]/60 transition-colors duration-300 hover:border-[#00E5FF] hover:text-[#00E5FF]"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    INSPIRATIONS
                ══════════════════════════════════════════════════ */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        INSPIRATIONS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Creators */}
                        <div>
                            <div
                                className="text-2xl font-black mb-6"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#FF2E63' }}
                            >
                                CREATORS
                            </div>
                            <div className="space-y-3">
                                {CREATORS.map(item => (
                                    <div
                                        key={item.name}
                                        className="border border-white/10 p-5 hover:border-[#FF2E63] transition-colors duration-300"
                                    >
                                        <div
                                            className="text-base font-black mb-1"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {item.name}
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Philosophy */}
                        <div>
                            <div
                                className="text-2xl font-black mb-6"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#00E5FF' }}
                            >
                                PHILOSOPHY
                            </div>
                            <div className="space-y-3">
                                {PHILOSOPHY.map(item => (
                                    <div
                                        key={item.name}
                                        className="border border-white/10 p-5 hover:border-[#00E5FF] transition-colors duration-300"
                                    >
                                        <div
                                            className="text-base font-black mb-1"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                        >
                                            {item.name}
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    ACHIEVEMENTS
                ══════════════════════════════════════════════════ */}
                {aboutData.awards && aboutData.awards.length > 0 && (
                    <section className="mb-20 border-t border-white/10 pt-20">
                        <h2
                            className="text-5xl font-black mb-12"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            ACHIEVEMENTS
                        </h2>
                        <div className="space-y-3">
                            {aboutData.awards.map((award: string, index: number) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 items-center border border-white/10 hover:border-[#FF2E63] transition-colors duration-300 p-5"
                                >
                                    <div
                                        className="col-span-1 text-2xl font-black text-white/10"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className="col-span-11">
                                        <p className="text-gray-300 text-sm leading-relaxed">{award}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ══════════════════════════════════════════════════
                    CONNECT
                ══════════════════════════════════════════════════ */}
                <section className="border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        LET'S CONNECT
                    </h2>
                    <p className="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
                        Partnerships, collaborations, brand deals, or just want to say something, I read everything.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {aboutData.socials && Object.entries(aboutData.socials)
                            .filter(([platform]) => platform !== 'email')
                            .map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 border border-white/20 hover:border-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all duration-300 text-sm tracking-wider"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    {platform.toUpperCase()}
                                </a>
                            ))}
                        <a
                            href={`mailto:${(aboutData.socials as any)?.email ?? 'him@camry.dev'}`}
                            className="px-8 py-3 bg-[#FF2E63] hover:bg-[#FF2E63]/80 text-white transition-all duration-300 text-sm tracking-wider"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            EMAIL ME
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
}
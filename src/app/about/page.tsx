import aboutData from '@/data/about.json';

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-20">
                    <h1
                        className="text-6xl md:text-9xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        CAMERON RYDWELL
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-2xl text-gray-400 max-w-3xl">
                        {aboutData.title || 'Full-Stack Software Engineer, Studying Electrical Engineering'}
                    </p>
                </div>

                {/* Profile Image */}
                <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="w-full h-[480px] bg-white/5 border border-white/20 overflow-hidden">
                        <img
                            src={aboutData.image}
                            alt={aboutData.imageTitle}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div>
                        <h2
                            className="text-4xl font-black mb-6"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            WHO I AM
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {aboutData.bio || 'I\'m a full-stack software engineer with a passion for creating innovative solutions that bridge the gap between hardware and software.'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-4 py-2 bg-white/5 border border-white/20">
                                <span className="text-xs text-gray-500">AGE</span>
                                <div className="font-black">{aboutData.age || '21'}</div>
                            </div>
                            <div className="px-4 py-2 bg-white/5 border border-white/20">
                                <span className="text-xs text-gray-500">LOCATION</span>
                                <div className="font-black">{aboutData.location}</div>
                            </div>
                            <div className="px-4 py-2 bg-white/5 border border-white/20">
                                <span className="text-xs text-gray-500">STATUS</span>
                                <div className="font-black">{aboutData.schoolStatus || 'Undergraduate Student'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Origin Story */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        THE ORIGIN STORY
                    </h2>

                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-3">
                                <div className="text-4xl font-black text-[#FF2E63]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    EARLY YEARS
                                </div>
                                <div className="text-sm text-gray-600 mt-2">Childhood - High School</div>
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Growing up, I lacked much drive in what I wanted to do and wanted to be. I started off as a clothing model for ABC News, growing a passion for fashion. Afterwards, I had began to question what my identity would be, testing the waters with eSports, freelance GFX/VFX work, and 'local computer technician' gigs.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    I took on a coding class my freshman year of Highschool, learning Python, and immediately was
                                    hooked. After receiving my certification, I was introduced to the idea of attending a local trade
                                    school named "West-MEC" in the valley area. This journey allowed me to grow as a developer as I succeeded
                                    in self-developing numerous websites, applications (both mobile and P.C.), and the publishment of my first game "Word Escape" in partnership with a classmate and longterm friend.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-3">
                                <div className="text-4xl font-black text-[#00E5FF]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    FOUNDATION
                                </div>
                                <div className="text-sm text-gray-600 mt-2">FBLA Competitions</div>
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Built my first serious project: RYDWELL SCHOOLS, a mobile app for FBLA's Mobile
                                    Application Development competition. Won 1st place in Arizona State, advanced to Nationals.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    Followed that up with WORD ESCAPE for the Computer Game & Programming Simulation
                                    competition. Another State championship, another trip to Nationals. That's when I was hit with the question:
                                    Do I want to continue coding, or venture into the next chapter?
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-3">
                                <div className="text-4xl font-black text-[#CCFF00]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    NOW
                                </div>
                                <div className="text-sm text-gray-600 mt-2">Present Day</div>
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    Following the rise of A.I., I have since reevaluated my decision on coding and swapped majors to Electrical Engineering
                                    to give me the leg up across all fields. By combining my love for physical engineering and manufacturing with software
                                    development, I feel as if I have fallen right into the playing cards I have always dreamed of.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    As I grow, I realized I have one simple love: create what I'm passionate about. And ever since then, I have not stopped
                                    pushing to become the person I want to be.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Deep Dive */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        SKILLS & EXPERTISE
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border border-white/20 p-8">
                            <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                CERTIFIED
                            </h3>
                            <div className="space-y-3">
                                {aboutData.languagesCertified?.map((lang: string) => (
                                    <div key={lang} className="flex items-center justify-between group">
                                        <span className="text-lg">{lang}</span>
                                        <div className="w-24 h-1 bg-[#FF2E63] group-hover:w-32 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border border-white/20 p-8">
                            <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                CURRENTLY LEARNING
                            </h3>
                            <div className="space-y-3">
                                {aboutData.languagesLearning?.map((lang: string) => (
                                    <div key={lang} className="flex items-center justify-between group">
                                        <span className="text-lg text-gray-400">{lang}</span>
                                        <div className="w-16 h-1 bg-[#00E5FF]/50 group-hover:w-24 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interests */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        BEYOND THE CODE
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cars */}
                        <div className="border border-white/20 hover:border-[#FF2E63] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.carPhoto}
                                    alt="Car Photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                CARS
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Growing up in a track-based family, I stood out as the black sheep: I love stanced lowered cars, and have been building my own for 2 years.
                            </p>
                        </div>

                        {/* Gaming/Esports */}
                        <div className="border border-white/20 hover:border-[#00E5FF] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.streamPhoto}
                                    alt="Gaming/Esports"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                GAMING & ESPORTS
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Starting out in Fortnite, I have always loved the competitive spirit of eSports. Having my own journey in VALORANT,
                                I have earned a reputation in the lower tier scene and wonder what could've been.
                            </p>
                        </div>

                        {/* Film */}
                        <div className="border border-white/20 hover:border-[#CCFF00] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.filmPhoto}
                                    alt="Film"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                FILMMAKING
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                The best way for me to express myself, my visions, and my creative ideas. My newest passion, hobby, and hopefully my future!
                            </p>
                        </div>

                        {/* Gym */}
                        <div className="border border-white/20 hover:border-[#FF2E63] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.gymPhoto}
                                    alt="Fitness"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                FITNESS
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                After starting my Gym journey due to weight loss goals, I have fallen in love with the idea of shadowing the image of my favorite superhero: my dad.
                            </p>
                        </div>

                        {/* Hardware */}
                        <div className="border border-white/20 hover:border-[#00E5FF] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.electricalPhoto}
                                    alt="Electrical Hardware"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                HARDWARE
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Hardware is still my weak-suit, but as I continue learning, I've grown to love the intricacies of systems alike.
                            </p>
                        </div>

                        {/* Content Creation */}
                        <div className="border border-white/20 hover:border-[#CCFF00] transition-colors p-8">
                            <div className="w-full h-48 mb-6 overflow-hidden">
                                <img
                                    src={aboutData.setupPhoto}
                                    alt="Content Creation"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                CONTENT
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                A culmination of all I am and all I wish to be. My true self for your enjoyment!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Inspirations */}
                <section className="mb-20 border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        INSPIRATIONS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-black mb-6 text-[#FF2E63]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                CREATORS
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF2E63] mt-1">•</span>
                                    <span><strong>Tim Burton & Henry Selick</strong> : Stop-motion aesthetic, dark whimsy, unique visual storytelling</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF2E63] mt-1">•</span>
                                    <span><strong>A24 Films</strong> : Clean, bold, professional presentation. Earth without Art is just Eh.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF2E63] mt-1">•</span>
                                    <span><strong>Ludwig</strong> : Atop the streaming sphere, bad at almost every video game, but winner of spirit and success.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF2E63] mt-1">•</span>
                                    <span><strong>Victor Nguyen</strong> : Film, day-to-day life, LA dreams, stanced car, what else could you ask for?</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black mb-6 text-[#00E5FF]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                PHILOSOPHY
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#00E5FF] mt-1">•</span>
                                    <span><strong>Alan Watts</strong> : A philosophical entertainer who always knows how to convey the message of humanity</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#00E5FF] mt-1">•</span>
                                    <span><strong>William Shakespeare</strong> : One of the best writers of all time with a strong skeptical exploration of human existence.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#00E5FF] mt-1">•</span>
                                    <span><strong>James Gunn</strong> : Even when you succeed, you can still show your personality and convey your own desires.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Awards */}
                {aboutData.awards && aboutData.awards.length > 0 && (
                    <section className="mb-20 border-t border-white/10 pt-20">
                        <h2
                            className="text-5xl font-black mb-12"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            ACHIEVEMENTS
                        </h2>
                        <div className="space-y-4">
                            {aboutData.awards.map((award: string, index: number) => (
                                <div
                                    key={index}
                                    className="border-l-2 border-[#FF2E63] pl-6 py-3 hover:border-[#00E5FF] transition-colors"
                                >
                                    <p className="text-lg">{award}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Connect */}
                <section className="border-t border-white/10 pt-20">
                    <h2
                        className="text-5xl font-black mb-12"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        LET'S CONNECT
                    </h2>
                    <div className="flex flex-wrap gap-4">
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
                    </div>
                </section>
            </div>
        </div>
    );
}
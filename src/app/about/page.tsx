'use client';

import { useState } from 'react';
import aboutData from '@/data/about.json';

function Divider() {
    return <div style={{ height: '1px', background: 'var(--gray-800)', margin: '5rem 0' }} />;
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--gray-500)',
            display: 'block',
            marginBottom: '1rem',
        }}>
      {children}
    </span>
    );
}

export default function About() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)', paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

                {/* ── MASTHEAD ──────────────────────────────────── */}
                <div style={{ marginBottom: '6rem' }}>
                    <Label>About</Label>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(4rem, 14vw, 12rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 0.88,
                    }}>
                        CAMERON<br />
                        <span className="about-outline-text">RYDWELL</span>
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-body)', fontStyle: 'italic',
                        fontSize: '1.3rem', color: 'var(--gray-300)',
                        maxWidth: '500px', marginTop: '1.5rem', lineHeight: 1.6,
                    }}>
                        {aboutData.title}
                    </p>
                </div>

                {/* ── PROFILE GRID ──────────────────────────────── */}
                <div className="about-profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>

                    {/* Photo */}
                    <div style={{ position: 'sticky', top: '5rem' }}>
                        <div style={{
                            border: '1px solid var(--gray-800)',
                            overflow: 'hidden',
                            aspectRatio: '3/4',
                        }}>
                            <img src={aboutData.image} alt={aboutData.imageTitle} style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                display: 'block', filter: 'grayscale(15%)',
                            }} />
                        </div>

                        {/* Quick stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--gray-800)', marginTop: '1px' }}>
                            {[
                                { label: 'Age',      value: String(aboutData.age) },
                                { label: 'Location', value: aboutData.location    },
                                { label: 'Status',   value: aboutData.schoolStatus },
                                { label: 'Major',    value: aboutData.major        },
                            ].map(stat => (
                                <div key={stat.label} style={{ background: 'var(--gray-900)', padding: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)', display: 'block', marginBottom: '4px' }}>
                    {stat.label.toUpperCase()}
                  </span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--white)' }}>
                    {stat.value}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bio + story */}
                    <div>
                        <Label>Who I am</Label>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontSize: '1.2rem',
                            color: 'var(--gray-200)', lineHeight: 1.8, marginBottom: '2.5rem',
                        }}>
                            {aboutData.bio}
                        </p>

                        {/* Connect */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {aboutData.socials && Object.entries(aboutData.socials)
                                .filter(([k]) => k !== 'email')
                                .map(([platform, url]) => (
                                    <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer"
                                       style={{
                                           fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em',
                                           color: 'var(--gray-400)', textDecoration: 'none',
                                           border: '1px solid var(--gray-700)', padding: '0.5rem 1rem',
                                           transition: 'border-color 0.2s, color 0.2s',
                                       }}
                                       onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--white)'; }}
                                       onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-700)'; e.currentTarget.style.color = 'var(--gray-400)'; }}
                                    >
                                        {platform.toUpperCase()} ↗
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>

                <Divider />

                {/* ── ORIGIN STORY ──────────────────────────────── */}
                <div>
                    <Label>Timeline</Label>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', marginBottom: '4rem' }}>
                        THE ORIGIN STORY
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {[
                            {
                                era: 'EARLY YEARS',
                                period: 'Childhood to High School',
                                color: 'var(--red)',
                                text: [
                                    'Growing up, I lacked much drive in what I wanted to do. I started as a clothing model for ABC News, growing a passion for fashion. Afterwards, I tested the waters with eSports, freelance GFX/VFX work, and local computer tech gigs.',
                                    'A coding class my freshman year changed everything. Python got me hooked. From there, West-MEC — a local trade school — gave me the runway to build: websites, mobile apps, PC apps, and my first published game, Word Escape.',
                                ],
                            },
                            {
                                era: 'BREAKTHROUGH',
                                period: 'FBLA Competitions',
                                color: '#4ADE80',
                                text: [
                                    'Built RYDWELL SCHOOLS, a mobile app for FBLA\'s Mobile Application Development competition. Won 1st place in Arizona State. Advanced to Nationals in Chicago.',
                                    'Followed with WORD ESCAPE for Computer Game & Programming Simulation. Another State championship. Another trip to Nationals Atlanta. That\'s when I asked myself: do I keep coding, or venture into the next chapter?',
                            ],
                        },
                        {
                            era: 'NOW',
                            period: 'Present Day',
                            color: 'var(--white)',
                            text: [
                            'Following the rise of AI, I swapped majors to Electrical Engineering, giving myself the leg up across all fields. Combining physical engineering with software development, I\'ve found my lane.',
                            'One simple truth: create what I\'m passionate about. I haven\'t stopped pushing since.',
                            ],
                        },
                            ].map((item, i) => (
                            <div key={item.era} style={{
                        display: 'grid',
                        gridTemplateColumns: '200px 1fr',
                        gap: '3rem',
                        padding: '3rem 0',
                        borderTop: i === 0 ? '1px solid var(--gray-800)' : undefined,
                        borderBottom: '1px solid var(--gray-800)',
                    }}>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.6rem',
                                letterSpacing: '0.04em',
                                color: item.color,
                                lineHeight: 1,
                            }}>
                                {item.era}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-600)', marginTop: '6px' }}>
                                {item.period}
                            </div>
                        </div>
                        <div>
                            {item.text.map((para, j) => (
                                <p key={j} style={{
                                    fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                                    color: 'var(--gray-300)', lineHeight: 1.75,
                                    marginBottom: j < item.text.length - 1 ? '1rem' : 0,
                                }}>
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <Divider />

            {/* ── SKILLS ────────────────────────────────────── */}
            <div>
                <Label>Technical</Label>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', marginBottom: '4rem' }}>
                    SKILLS & EXPERTISE
                </h2>

                <div className="about-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--gray-800)' }}>
                    {[
                        { heading: 'CERTIFIED', items: aboutData.languagesCertified, accent: 'var(--red)' },
                        { heading: 'LEARNING', items: aboutData.languagesLearning, accent: 'var(--gray-500)' },
                    ].map(col => (
                        <div key={col.heading} style={{ background: 'var(--gray-900)', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                                <span style={{ width: '8px', height: '8px', background: col.accent, display: 'block' }} />
                                <Label>{col.heading}</Label>
                            </div>
                            {col.items?.map((item: string) => (
                                <div key={item} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '0.85rem 0', borderBottom: '1px solid var(--gray-800)',
                                }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--white)' }}>
                      {item}
                    </span>
                                    <div style={{ width: '40px', height: '1px', background: col.accent }} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Divider />

            {/* ── BEYOND THE CODE ───────────────────────────── */}
            <div>
                <Label>Interests</Label>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', marginBottom: '5rem' }}>
                    BEYOND THE CODE
                </h2>

                {/* Two uneven columns, items offset by varying top margins */}
                <div className="scatter-grid">

                    {/* Left column — wider */}
                    <div className="scatter-col-left">
                        <div style={{ marginBottom: '3rem' }}>
                            <ScatterCard title="CARS" photo={aboutData.carPhoto}
                                         desc="Growing up in a track-based family, I stood out as the black sheep: stanced and lowered, building my own for 2 years." />
                        </div>
                        <div style={{ marginLeft: '8%', marginBottom: '3rem' }}>
                            <ScatterCard title="FILM" photo={aboutData.filmPhoto}
                                         desc="Candid photos, vlog clips, everywhere I end up. I always find somewhere worth documenting." />
                        </div>
                        <div style={{ marginLeft: '3%' }}>
                            <ScatterCard title="HARDWARE" photo={aboutData.electricalPhoto}
                                         desc="Still my weakest field, but the one I find most fascinating." />
                        </div>
                    </div>

                    {/* Right column — narrower, shifted down to break symmetry */}
                    <div className="scatter-col-right">
                        <div style={{ marginTop: '10%', marginBottom: '3rem' }}>
                            <ScatterCard title="GAMING" photo={aboutData.streamPhoto}
                                         desc="From Fortnite to VALORANT, I've earned a deep respect for the scene and still remain overwhelmingly passionate." />
                        </div>
                        <div style={{ marginLeft: '-5%', marginBottom: '3rem' }}>
                            <ScatterCard title="FITNESS" photo={aboutData.gymPhoto}
                                         desc="Started for weight loss. Stayed to shadow my favorite superhero: my dad." />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <ScatterCard title="CONTENT" photo={aboutData.setupPhoto}
                                         desc="Displaying my true self on screen, for all to see" />
                        </div>
                    </div>

                </div>
            </div>

            <Divider />

            {/* ── INSPIRATIONS ──────────────────────────────── */}
            <div>
                <Label>Influences</Label>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', marginBottom: '4rem' }}>
                    INSPIRATIONS
                </h2>

                <div className="about-inspo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    {[
                        {
                            heading: 'CREATORS', color: 'var(--red)',
                            items: [
                                { name: 'Tim Burton & Henry Selick', desc: 'Stop-motion aesthetic, dark whimsy, unique visual storytelling' },
                                { name: 'A24 Films', desc: 'Clean, bold, professional. Earth without Art is just Eh.' },
                                { name: 'Ludwig', desc: 'Atop the streaming sphere, winner of spirit and success.' },
                                { name: 'Victor Nguyen', desc: 'Film, day-to-day life, LA dreams, stanced car. What else?' },
                            ],
                        },
                        {
                            heading: 'PHILOSOPHY', color: 'var(--white)',
                            items: [
                                { name: 'Alan Watts', desc: 'A philosophical entertainer who conveys the message of humanity' },
                                { name: 'William Shakespeare', desc: 'The greatest writer. Skeptical exploration of human existence.' },
                                { name: 'James Gunn', desc: 'Even in success, you can still show your personality and desires.' },
                            ],
                        },
                    ].map(col => (
                        <div key={col.heading}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                                <span style={{ width: '8px', height: '8px', background: col.color, display: 'block' }} />
                                <Label>{col.heading}</Label>
                            </div>
                            {col.items.map(ins => (
                                <div key={ins.name} style={{
                                    padding: '1.25rem 0',
                                    borderBottom: '1px solid var(--gray-800)',
                                }}>
                                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '3px' }}>
                                        {ins.name}
                                    </p>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.5 }}>
                                        {ins.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Divider />

            {/* ── ACHIEVEMENTS ──────────────────────────────── */}
            {aboutData.awards?.length > 0 && (
                <div>
                    <Label>Recognition</Label>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em', marginBottom: '4rem' }}>
                        ACHIEVEMENTS
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {aboutData.awards.map((award: string, i: number) => (
                            <div key={i} style={{
                                display: 'grid',
                                gridTemplateColumns: '3rem 1fr',
                                gap: '2rem',
                                alignItems: 'start',
                                padding: '2.5rem 0',
                                borderBottom: '1px solid var(--gray-800)',
                            }}>
                                {/* Index number */}
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--red)',
                                    letterSpacing: '0.1em',
                                    paddingTop: '4px',
                                }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                                <div>
                                    <p style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                                        letterSpacing: '0.03em',
                                        color: 'var(--white)',
                                        lineHeight: 1.1,
                                    }}>
                                        {award}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

    <style>{`
        .about-outline-text {
          -webkit-text-stroke: 1px var(--white);
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* ── Scatter layout — two uneven columns with offset ── */
        .scatter-grid {
          display: grid;
          grid-template-columns: 55% 40%;
          gap: 0 5%;
          align-items: start;
        }
        .scatter-col-left, .scatter-col-right {
          display: flex;
          flex-direction: column;
        }

        /* Mobile: single column */
        @media (max-width: 800px) {
          .scatter-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .scatter-col-right { margin-top: 0 !important; }
        }

        @media (max-width: 900px) {
          .about-profile-grid  { grid-template-columns: 1fr !important; }
          .about-profile-grid > div:first-child { position: static !important; }
          .about-inspo-grid    { grid-template-columns: 1fr !important; }
          .about-timeline-row  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .about-skills-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
</div>
);
}

// ─── Scatter Card ─────────────────────────────────────────────────────────────
function ScatterCard({ title, photo, desc }: { title: string; photo: string; desc: string }) {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: 'var(--gray-900)',
                border: '1px solid var(--gray-800)',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
                borderColor: hov ? 'var(--red)' : 'var(--gray-800)',
            }}
        >
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--gray-800)' }}>
                <img src={photo} alt={title} style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    filter: hov ? 'grayscale(0%)' : 'grayscale(40%)',
                    transform: hov ? 'scale(1.04)' : 'scale(1)',
                    transition: 'filter 0.5s, transform 0.5s',
                }} />
            </div>
            <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    letterSpacing: '0.04em',
                    marginBottom: '0.4rem',
                    color: hov ? 'var(--red)' : 'var(--white)',
                    transition: 'color 0.2s',
                }}>
                    {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-400)', lineHeight: 1.55 }}>
                    {desc}
                </p>
            </div>
        </div>
    );
}
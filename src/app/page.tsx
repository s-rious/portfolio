'use client';

import { useEffect, useState } from 'react';
import TickerSection from '@/components/TickerSection';

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gray-500)',
        }}>{children}</span>
    );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [status, setStatus]           = useState<any>(null);
    const [gear, setGear]               = useState<any>(null);
    const [roadmap, setRoadmap]         = useState<any[]>([]);
    const [email, setEmail]             = useState('');
    const [subStatus, setSubStatus]     = useState<'idle'|'loading'|'success'|'error'>('idle');
    const [heroH, setHeroH]             = useState(2000);
    const [livePlatform, setLivePlatform] = useState<'youtube' | 'twitch'>('youtube');

    useEffect(() => {
        setHeroH(window.innerHeight * 2.4);
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        Promise.all([
            import('@/data/currentStatus.json'),
            import('@/data/gear.json'),
            import('@/data/roadmap.json'),
        ]).then(([s, g, r]) => {
            setStatus(s.default);
            setGear(g.default);
            setRoadmap(r.default);
        });
    }, []);

    const progress = Math.min(1, scrollY / heroH);
    const scene    = Math.min(1, Math.floor(progress * 2));

    const handleSub = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubStatus('loading');
        try {
            const r = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'bbae9f51-efb6-45bc-beaa-7a8585764cbf',
                    subject: 'New Subscriber — CAMRY.DEV',
                    email,
                    message: `New subscriber: ${email}`,
                }),
            });
            if (r.ok) { setSubStatus('success'); setEmail(''); }
            else new Error();
        } catch { setSubStatus('error'); }
        setTimeout(() => setSubStatus('idle'), 5000);
    };

    // ── RENDER ───────────────────────────────────────────────────────────────
    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)' }}>

            {/* ═══════════════════════════════════════════════════════ HERO SCROLL */}
            <div style={{ height: `${heroH}px` }} />

            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: scrollY < heroH ? 1 : 0,
                pointerEvents: scrollY < heroH ? 'auto' : 'none',
                transition: 'opacity 0.6s ease',
            }}>

                {/* SCENE 0 — Identity */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 6vw',
                    opacity: scene === 0 ? 1 : 0,
                    transition: 'opacity 0.7s ease',
                    pointerEvents: 'none',
                }}>
                    {/* Top label */}
                    <div style={{ position: 'absolute', top: '5rem', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Label>Sacramento, CA — Available for Partnerships</Label>
                        <Label>camry.dev</Label>
                    </div>

                    {/* Main name */}
                    <div style={{ overflow: 'hidden' }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(5rem, 16vw, 15rem)',
                            lineHeight: 0.88,
                            letterSpacing: '-0.01em',
                            color: 'var(--white)',
                            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
                        }}>
                            CAMERON
                        </h1>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(5rem, 16vw, 15rem)',
                            lineHeight: 0.88,
                            letterSpacing: '-0.01em',
                            color: 'var(--white)',
                            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s both',
                            WebkitTextStroke: '1px var(--white)',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            RYDWELL
                        </h1>
                    </div>

                    {/* Bottom row */}
                    <div style={{
                        position: 'absolute', bottom: '4rem', left: '6vw', right: '6vw',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                        animation: 'fadeIn 1s ease 0.4s both',
                    }}>
                        <div>
                            <Label>Role</Label>
                            <p style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                letterSpacing: '0.1em',
                                color: 'var(--gray-200)',
                                marginTop: '6px',
                            }}>
                                Engineer × Creator × Visionary
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Label>Scroll to enter</Label>
                            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                                <svg width="18" height="32" viewBox="0 0 18 32" fill="none">
                                    <rect x="1" y="1" width="16" height="30" rx="8" stroke="var(--gray-600)" strokeWidth="1.5" />
                                    <circle cx="9" cy="9" r="2.5" fill="var(--red)">
                                        <animate attributeName="cy" values="9;22;9" dur="2.2s" repeatCount="indefinite" />
                                    </circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SCENE 1 — Transition */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    opacity: scene === 1 ? 1 : 0,
                    transition: 'opacity 0.7s ease',
                    pointerEvents: 'none',
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 10vw, 9rem)',
                        letterSpacing: '0.02em',
                        color: 'var(--white)',
                        textAlign: 'center',
                    }}>
                        DEFINE.
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gray-500)',
                        marginTop: '1.5rem',
                    }}>
                        — KEEP SCROLLING —
                    </p>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════ MAIN CONTENT */}
            <div style={{ position: 'relative', zIndex: 20, background: 'var(--gray-900)' }}>

                {/* ── TICKER ───────────────────────────────────────── */}
                <TickerSection />

                {/* ── SECTION: WHAT'S HAPPENING ────────────────────── */}
                {status && (
                    <section style={{ padding: '8rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                            {/* Header row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em' }}>
                                    WHAT'S HAPPENING
                                </h2>
                                <Label>Updated regularly</Label>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>

                                {/* Latest Video */}
                                <div style={{ background: 'var(--gray-900)', padding: '0' }}>
                                    <a href={status.latestVideo.url} target="_blank" rel="noopener noreferrer"
                                       style={{ display: 'block', textDecoration: 'none' }}>
                                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                                            <img src={status.latestVideo.thumbnail} alt={status.latestVideo.title}
                                                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)', transition: 'filter 0.4s, transform 0.4s' }}
                                                 className="video-thumb"
                                            />
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: 'rgba(8,8,8,0.35)',
                                                transition: 'background 0.3s',
                                            }}
                                                 className="video-overlay"
                                            >
                                                <div style={{
                                                    width: '52px', height: '52px',
                                                    border: '1.5px solid var(--white)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'background 0.2s',
                                                }}
                                                     className="play-btn"
                                                >
                                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="var(--white)">
                                                        <path d="M0 0L16 9L0 18V0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <div style={{ padding: '1.75rem' }}>
                                        <Label>Latest Video</Label>
                                        <h3 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.75rem',
                                            letterSpacing: '0.03em',
                                            margin: '0.5rem 0 0.75rem',
                                            lineHeight: 1.1,
                                        }}>
                                            {status.latestVideo.title}
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-500)', marginBottom: '1.25rem' }}>
                                            {status.latestVideo.uploadedAgo}
                                        </p>
                                        <a href={status.latestVideo.url} target="_blank" rel="noopener noreferrer"
                                           style={{
                                               display: 'inline-block',
                                               fontFamily: 'var(--font-mono)',
                                               fontSize: '0.65rem',
                                               letterSpacing: '0.14em',
                                               color: 'var(--white)',
                                               textDecoration: 'none',
                                               border: '1px solid var(--white)',
                                               padding: '0.6rem 1.2rem',
                                               transition: 'background 0.2s, color 0.2s',
                                           }}
                                           onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--black)'; }}
                                           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)'; }}
                                        >
                                            WATCH NOW ↗
                                        </a>
                                    </div>
                                </div>

                                {/* Current Project + Next Stream stacked */}
                                <div style={{ background: 'var(--gray-900)', display: 'flex', flexDirection: 'column' }}>

                                    {/* Current Project */}
                                    <div style={{ padding: '1.75rem', flex: 1 }}>
                                        <Label>Current Project</Label>
                                        <h3 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                                            letterSpacing: '0.03em',
                                            margin: '0.5rem 0 0.75rem',
                                            lineHeight: 1.1,
                                        }}>
                                            {status.currentProject.name}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '1rem',
                                            color: 'var(--gray-400)',
                                            marginBottom: '2rem',
                                            lineHeight: 1.6,
                                        }}>
                                            {status.currentProject.description}
                                        </p>

                                        {/* Progress */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                                                    {status.currentProject.status}
                                                </span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--white)' }}>
                                                    {status.currentProject.progress}%
                                                </span>
                                            </div>
                                            <div style={{ height: '1px', background: 'var(--gray-700)', position: 'relative' }}>
                                                <div style={{
                                                    position: 'absolute', top: 0, left: 0, bottom: 0,
                                                    width: `${status.currentProject.progress}%`,
                                                    background: 'var(--red)',
                                                }} />
                                            </div>
                                        </div>

                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                                            ETA — {status.currentProject.eta}
                                        </p>
                                    </div>

                                    {/* Next Stream — platform toggle + embed */}
                                    {status.nextStream && (
                                        <div style={{
                                            borderTop: '1px solid var(--gray-800)',
                                            background: '#0F0A0A',
                                        }}>
                                            {/* Header row */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '1.25rem 1.75rem 0',
                                                flexWrap: 'wrap',
                                                gap: '0.75rem',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{
                                                        display: 'block', width: '7px', height: '7px',
                                                        background: 'var(--red)', borderRadius: '50%',
                                                    }} />
                                                    <Label>Next Stream</Label>
                                                </div>

                                                {/* Platform toggle */}
                                                <div style={{ display: 'flex' }}>
                                                    {(['youtube', 'twitch'] as const).map((p, i) => {
                                                        const active = livePlatform === p;
                                                        const label  = p === 'youtube' ? 'YOUTUBE' : 'TWITCH';
                                                        return (
                                                            <button
                                                                key={p}
                                                                onClick={() => setLivePlatform(p)}
                                                                style={{
                                                                    fontFamily: 'var(--font-mono)',
                                                                    fontSize: '0.58rem',
                                                                    letterSpacing: '0.14em',
                                                                    padding: '4px 12px',
                                                                    border: '1px solid var(--red)',
                                                                    borderRight: i === 0 ? 'none' : '1px solid var(--red)',
                                                                    background: active ? 'var(--red)' : 'transparent',
                                                                    color: active ? 'var(--white)' : 'var(--red)',
                                                                    cursor: 'pointer',
                                                                    transition: 'background 0.15s, color 0.15s',
                                                                }}
                                                            >
                                                                {label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Stream title + date */}
                                            <div style={{ padding: '0.9rem 1.75rem 1rem' }}>
                                                <p style={{
                                                    fontFamily: 'var(--font-display)',
                                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                                                    letterSpacing: '0.03em',
                                                    color: 'var(--white)',
                                                    lineHeight: 1.1,
                                                    marginBottom: '0.4rem',
                                                }}>
                                                    {status.nextStream.title}
                                                </p>
                                                <p style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.62rem',
                                                    letterSpacing: '0.1em',
                                                    color: 'var(--gray-500)',
                                                }}>
                                                    {new Date(status.nextStream.date).toLocaleDateString('en-US', {
                                                        weekday: 'long', month: 'short', day: 'numeric',
                                                        hour: 'numeric', minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>

                                            {/* Embed */}
                                            <div style={{ aspectRatio: '16/9', width: '100%' }}>
                                                {livePlatform === 'youtube' ? (
                                                    <iframe
                                                        src="https://www.youtube.com/embed/live_stream?channel=UCtLkQJdn-nysUBA7nNPR7QA&autoplay=0"
                                                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <iframe
                                                        src={`https://player.twitch.tv/?channel=s_rious&parent=${typeof window !== 'undefined' ? window.location.hostname : 'camry.dev'}&autoplay=false`}
                                                        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── SECTION: THE SETUP ──────────────────────────── */}
                {gear && (
                    <section style={{ padding: '8rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em' }}>
                                    THE SETUP
                                </h2>
                                <Label>What I use to make things</Label>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', borderTop: '1px solid var(--gray-800)', borderLeft: '1px solid var(--gray-800)' }}>
                                {[
                                    { label: 'Coding',          items: gear.coding,   accent: 'var(--red)'     },
                                    { label: 'Content',         items: gear.content,  accent: 'var(--white)'   },
                                    { label: 'Gaming / Stream', items: gear.gaming,   accent: 'var(--gray-400)' },
                                ].map(col => (
                                    <div key={col.label} style={{
                                        borderRight: '1px solid var(--gray-800)',
                                        borderBottom: '1px solid var(--gray-800)',
                                        padding: '2rem',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                                            <span style={{ width: '8px', height: '8px', background: col.accent, display: 'block' }} />
                                            <Label>{col.label}</Label>
                                        </div>
                                        {col.items?.map((item: any) => (
                                            <div key={item.name} style={{
                                                padding: '0.75rem 0',
                                                borderBottom: '1px solid var(--gray-800)',
                                            }}>
                                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)', marginBottom: '3px' }}>
                                                    {item.category}
                                                </p>
                                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--white)' }}>
                                                    {item.name}
                                                </p>
                                                {item.specs && !item.subspecs && (
                                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gray-600)', marginTop: '2px' }}>
                                                        {item.specs}
                                                    </p>
                                                )}
                                                {item.subspecs && (
                                                    <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        {item.subspecs.map((sub: string, si: number) => (
                                                            <p key={si} style={{
                                                                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                                                                color: 'var(--gray-600)', paddingLeft: '0.75rem',
                                                                borderLeft: '1px solid var(--gray-700)',
                                                            }}>
                                                                {sub}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── SECTION: WHAT'S NEXT ────────────────────────── */}
                {roadmap.length > 0 && (
                    <section style={{ padding: '8rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em' }}>
                                    WHAT'S NEXT
                                </h2>
                                <Label>Live roadmap</Label>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                                {roadmap.map((item, i) => {
                                    const statusColor = item.status === 'Active' ? 'var(--red)'
                                        : item.status === 'In Progress' ? '#4ADE80'
                                            : 'var(--gray-500)';
                                    return (
                                        <div key={i} style={{
                                            background: 'var(--gray-900)',
                                            padding: '2rem',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <span style={{ width: '10px', height: '10px', background: 'var(--red)', display: 'block', flexShrink: 0, marginTop: '4px' }} />
                                                <span style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.58rem',
                                                    letterSpacing: '0.12em',
                                                    color: statusColor,
                                                    border: `1px solid ${statusColor}`,
                                                    padding: '3px 8px',
                                                }}>
                                                    {item.status?.toUpperCase()}
                                                </span>
                                            </div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
                                                {item.title}
                                            </h3>
                                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.5, marginBottom: '1rem' }}>
                                                {item.description}
                                            </p>
                                            <Label>ETA — {item.eta}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── SECTION: WHY STICK AROUND ───────────────────── */}
                <section style={{ padding: '8rem 6vw' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <Label>Why follow along</Label>

                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(3rem, 8vw, 7rem)',
                            letterSpacing: '0.02em',
                            margin: '1rem 0 2rem',
                            lineHeight: 0.92,
                        }}>
                            ONE LIFE.<br />
                            <span style={{ WebkitTextStroke: '1px var(--white)', WebkitTextFillColor: 'transparent' }}>
                                ALL OF IT.
                            </span>
                        </h2>

                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.2rem',
                            color: 'var(--gray-300)',
                            lineHeight: 1.75,
                            maxWidth: '600px',
                            marginBottom: '3rem',
                        }}>
                            Come along for the day-to-day of a 21-year-old in Northern California who loves film, builds cars, games, lifts, and new tech.
                        </p>

                        {/* Subscribe form */}
                        <form onSubmit={handleSub} style={{ display: 'flex', gap: '0', maxWidth: '480px', marginBottom: '1rem' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                disabled={subStatus === 'loading'}
                                style={{
                                    flex: 1,
                                    background: 'var(--gray-800)',
                                    border: '1px solid var(--gray-700)',
                                    borderRight: 'none',
                                    padding: '0.9rem 1.2rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    color: 'var(--white)',
                                    outline: 'none',
                                }}
                            />
                            <button type="submit" disabled={subStatus === 'loading'}
                                    style={{
                                        background: 'var(--red)',
                                        border: '1px solid var(--red)',
                                        padding: '0.9rem 1.5rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.14em',
                                        color: 'var(--white)',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#BF0015')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}
                            >
                                {subStatus === 'loading' ? '...' : 'SUBSCRIBE'}
                            </button>
                        </form>

                        {subStatus === 'success' && (
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4ADE80', letterSpacing: '0.1em' }}>
                                ✓ You're in.
                            </p>
                        )}
                        {subStatus === 'error' && (
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--red)', letterSpacing: '0.1em' }}>
                                ✗ Something went wrong. Try again or email directly.
                            </p>
                        )}

                        {/* Social row */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                            {[
                                { name: 'YouTube', url: 'https://youtube.com/seriousreal' },
                                { name: 'Twitch',  url: 'https://twitch.tv/s_rious' },
                                { name: 'X', url: 'https://x.com/s7rious' },
                            ].map(s => (
                                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                                   style={{
                                       fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em',
                                       color: 'var(--gray-400)', textDecoration: 'none',
                                       borderBottom: '1px solid var(--gray-700)', paddingBottom: '2px',
                                       transition: 'color 0.2s, border-color 0.2s',
                                   }}
                                   onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)'; }}
                                   onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray-400)'; e.currentTarget.style.borderColor = 'var(--gray-700)'; }}
                                >
                                    {s.name} ↗
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
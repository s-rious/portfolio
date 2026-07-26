'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TickerSection from '@/components/TickerSection';

const CATEGORY_COLORS: Record<string, string> = {
    Stream:      'var(--red)',
    Video:       'var(--white)',
    'IRL Event': '#4ADE80',
    Collab:      '#00E5FF',
};

function extractYouTubeId(url: string): string | null {
    const patterns = [
        /youtu\.be\/([^?&#/]+)/,
        /youtube\.com\/watch\?v=([^&#]+)/,
        /youtube\.com\/live\/([^?&#/]+)/,
        /youtube\.com\/shorts\/([^?&#/]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function getYouTubeThumbnail(url: string): string {
    const id = extractYouTubeId(url);
    if (!id) return '';
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

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

function ContentMixChart({ data }: { data: { label: string; value: number; views: number; color: string }[] }) {
    const maxViews = Math.max(...data.map(d => d.views), 1);
    return (
        <div>
            <Label>Views by Format</Label>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {data.map(item => (
                    <div key={item.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--gray-400)' }}>
                                {item.label} <span style={{ color: 'var(--gray-600)' }}>({item.value})</span>
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: item.views === 0 ? 'var(--gray-700)' : item.color }}>
                                {item.views.toLocaleString()}
                            </span>
                        </div>
                        <div style={{ height: '2px', background: 'var(--gray-800)' }}>
                            <div style={{ height: '100%', width: `${(item.views / maxViews) * 100}%`, background: item.views === 0 ? 'transparent' : item.color }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CTRChart({ data }: { data: { label: string; value: number; color: string }[] }) {
    return (
        <div>
            <Label>CTR</Label>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {data.map(item => (
                    <div key={item.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--gray-400)' }}>{item.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: item.color }}>{item.value}%</span>
                        </div>
                        <div style={{ height: '2px', background: 'var(--gray-800)' }}>
                            <div style={{ height: '100%', width: `${(item.value / 12) * 100}%`, background: item.color }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrafficDonut({ data }: { data: { label: string; value: number; color: string }[] }) {
    const R = 36, cx = 48, cy = 48, strokeW = 13;
    const circumference = 2 * Math.PI * R;
    let cumulative = 0;
    return (
        <div>
            <Label>Traffic</Label>
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <svg viewBox="0 0 96 96" width="72" height="72" style={{ flexShrink: 0 }}>
                    <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeW} />
                    {data.map((seg, i) => {
                        const dash = (seg.value / 100) * circumference;
                        const gap  = circumference - dash;
                        const off  = -(cumulative / 100) * circumference;
                        cumulative += seg.value;
                        return <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color} strokeWidth={strokeW} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={off} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />;
                    })}
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, minWidth: 0 }}>
                    {data.map(seg => (
                        <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: '5px', height: '5px', background: seg.color, flexShrink: 0 }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.06em', color: 'var(--gray-500)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seg.label}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: seg.color, flexShrink: 0 }}>{seg.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const [gear, setGear]                      = useState<any>(null);
    const [roadmap, setRoadmap]                = useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents]  = useState<any[]>([]);
    const [derivedVideo, setDerivedVideo]      = useState<any>(null);
    const [derivedStream, setDerivedStream]    = useState<any>(null);
    const [derivedProject, setDerivedProject]  = useState<any>(null);
    const [analytics, setAnalytics]            = useState<any>(null);
    const [email, setEmail]                    = useState('');
    const [subStatus, setSubStatus]            = useState<'idle'|'loading'|'success'|'error'>('idle');
    const [livePlatform, setLivePlatform]      = useState<'youtube' | 'twitch'>('youtube');

    useEffect(() => {
        Promise.all([
            import('@/data/gear.json'),
            import('@/data/roadmap.json'),
            import('@/data/events.json'),
            import('@/data/projects.json'),
        ]).then(([g, r, e, p]) => {
            setGear(g.default);
            setRoadmap(r.default);

            const proj = p.default as any;
            if (proj.weeklyAnalytics) setAnalytics(proj.weeklyAnalytics);

            const raw = e.default as any;
            const events: any[] = Array.isArray(raw) ? raw : (raw.events ?? raw.schedule ?? Object.values(raw).find(Array.isArray) ?? []);
            const now = new Date();

            const pastVideos = events
                .filter(ev => ev.category === 'Video' && new Date(ev.date) <= now)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            if (pastVideos.length > 0) {
                const v = pastVideos[0];
                setDerivedVideo({
                    ...v,
                    thumbnail: v.thumbnail || getYouTubeThumbnail(v.url),
                    uploadedAgo: new Date(v.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                });
            }

            const upcomingStreams = events
                .filter(ev => ev.category === 'Stream' && new Date(ev.date) > now)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setDerivedStream(upcomingStreams[0] ?? null);

            const upcomingProjects = events
                .filter(ev => ev.category !== 'Stream' && new Date(ev.date) > now)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setDerivedProject(upcomingProjects[0] ?? null);

            const upcoming = events
                .filter(ev => new Date(ev.date) > now)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3);
            setUpcomingEvents(upcoming);
        });
    }, []);

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

    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)' }}>

            {/* ══ HERO ══ */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
            }}>
                {/* Top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6rem 6vw 0' }}>
                    <Label>OC & LA, CA — Available for Partnerships</Label>
                    <Label>camry.dev</Label>
                </div>

                {/* SERIOUS + CAMERON RYDWELL */}
                <div style={{ padding: '0 6vw' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
                            lineHeight: 0.88,
                            letterSpacing: '-0.01em',
                            color: 'var(--white)',
                            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
                        }}>
                            SERIOUS
                        </h1>
                    </div>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        letterSpacing: '0.14em',
                        color: 'var(--gray-500)',
                        marginTop: '1rem',
                        animation: 'fadeIn 1s ease 0.2s both',
                    }}>
                        CAMERON RYDWELL
                    </p>
                </div>

                {/* Bottom bar + ticker grouped together at the bottom */}
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        padding: '0 6vw 2.5rem',
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
                            <Label>Scroll to continue</Label>
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
                    <TickerSection />
                </div>
            </section>

            {/* ══ MAIN CONTENT ══ */}
            <div style={{ position: 'relative', background: 'var(--gray-900)' }}>

                {/* WHAT'S HAPPENING */}
                {(derivedVideo || derivedStream || derivedProject) && (
                    <section style={{ padding: '8rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.03em' }}>
                                    WHAT'S HAPPENING
                                </h2>
                                <Label>Updated regularly</Label>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>

                                {/* LEFT: video + analytics */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                    <div style={{ background: 'var(--gray-900)' }}>
                                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--gray-800)' }}>
                                            {extractYouTubeId(derivedVideo?.url ?? '') ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${extractYouTubeId(derivedVideo?.url ?? '')}`}
                                                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gray-600)', letterSpacing: '0.1em' }}>NO VIDEO</span>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.75rem' }}>
                                            <Label>Latest Video</Label>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', letterSpacing: '0.03em', margin: '0.5rem 0 0.75rem', lineHeight: 1.1 }}>
                                                {derivedVideo?.title ?? '—'}
                                            </h3>
                                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-500)', marginBottom: '1.25rem' }}>
                                                {derivedVideo?.uploadedAgo ?? ''}
                                            </p>
                                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                <a
                                                    href={derivedVideo?.url ?? '#'} target="_blank" rel="noopener noreferrer"
                                                    style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--white)', textDecoration: 'none', border: '1px solid var(--white)', padding: '0.6rem 1.2rem', transition: 'background 0.2s, color 0.2s' }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--black)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)'; }}
                                                >
                                                    WATCH NOW ↗
                                                </a>
                                                <Link
                                                    href="/projects"
                                                    style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--gray-400)', textDecoration: 'none', border: '1px solid var(--gray-700)', padding: '0.6rem 1.2rem', transition: 'border-color 0.2s, color 0.2s' }}
                                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--white)'; e.currentTarget.style.color = 'var(--white)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-700)'; e.currentTarget.style.color = 'var(--gray-400)'; }}
                                                >
                                                    ALL PROJECTS ↗
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {analytics && (
                                        <div style={{ background: 'var(--gray-900)', padding: '1.5rem 1.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                                                <Label>Recent Analytics</Label>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--gray-700)' }}>{analytics.weekLabel}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                                <ContentMixChart data={analytics.contentMix} />
                                                <CTRChart data={analytics.ctrBenchmarks} />
                                                <TrafficDonut data={analytics.trafficSources} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT: current project + next stream */}
                                <div style={{ background: 'var(--gray-900)', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '1.75rem', flex: 1 }}>
                                        <Label>Current Project</Label>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.03em', margin: '0.5rem 0 0.75rem', lineHeight: 1.1 }}>
                                            {derivedProject?.title ?? 'COMING SOON'}
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray-400)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                            {derivedProject?.description ?? 'Nothing scheduled yet — check back soon.'}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: CATEGORY_COLORS[derivedProject?.category] ?? 'var(--gray-500)', border: `1px solid ${CATEGORY_COLORS[derivedProject?.category] ?? 'var(--gray-700)'}`, padding: '3px 8px' }}>
                                                {derivedProject?.category?.toUpperCase() ?? 'UPCOMING'}
                                            </span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gray-600)' }}>
                                                {derivedProject?.platform ?? ''}
                                            </span>
                                        </div>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                                            ETA —{' '}
                                            {derivedProject ? new Date(derivedProject.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                                        </p>
                                    </div>

                                    {derivedStream ? (
                                        <div style={{ borderTop: '1px solid var(--gray-800)', background: '#0F0A0A' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.75rem 0', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ display: 'block', width: '7px', height: '7px', background: 'var(--red)', borderRadius: '50%' }} />
                                                    <Label>Next Stream</Label>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    {(['youtube', 'twitch'] as const).map((p, i) => {
                                                        const active = livePlatform === p;
                                                        return (
                                                            <button key={p} onClick={() => setLivePlatform(p)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', padding: '4px 12px', border: '1px solid var(--red)', borderRight: 'none', background: active ? 'var(--red)' : 'transparent', color: active ? 'var(--white)' : 'var(--red)', cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}>
                                                                {p === 'youtube' ? 'YOUTUBE' : 'TWITCH'}
                                                            </button>
                                                        );
                                                    })}
                                                    <a href="https://www.tiktok.com/@s.erious/live" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', padding: '4px 12px', border: '1px solid var(--red)', background: 'transparent', color: 'var(--red)', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'var(--white)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}>
                                                        TIKTOK ↗
                                                    </a>
                                                </div>
                                            </div>
                                            <div style={{ padding: '0.9rem 1.75rem 1rem' }}>
                                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', letterSpacing: '0.03em', color: 'var(--white)', lineHeight: 1.1, marginBottom: '0.4rem' }}>
                                                    {derivedStream.title}
                                                </p>
                                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                                                    {new Date(derivedStream.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <div style={{ aspectRatio: '16/9', width: '100%' }}>
                                                {livePlatform === 'youtube' ? (
                                                    <iframe src="https://www.youtube.com/embed/live_stream?channel=UCtLkQJdn-nysUBA7nNPR7QA&autoplay=0" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                                ) : (
                                                    <iframe src={`https://player.twitch.tv/?channel=s_rious&parent=${typeof window !== 'undefined' ? window.location.hostname : 'camry.dev'}&autoplay=false`} style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ borderTop: '1px solid var(--gray-800)', background: '#0F0A0A', padding: '1.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                                <span style={{ display: 'block', width: '7px', height: '7px', background: 'var(--gray-700)', borderRadius: '50%' }} />
                                                <Label>Next Stream</Label>
                                            </div>
                                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                                No stream scheduled yet — check back soon.
                                            </p>
                                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                <a href="https://youtube.com/seriousreal/live" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--white)', textDecoration: 'none', border: '1px solid var(--gray-700)', padding: '0.5rem 1rem', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--white)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-700)')}>YOUTUBE LIVE ↗</a>
                                                <a href="https://twitch.tv/s_rious" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--white)', textDecoration: 'none', border: '1px solid var(--gray-700)', padding: '0.5rem 1rem', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--white)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-700)')}>TWITCH ↗</a>
                                                <a href="https://www.tiktok.com/@s.erious/live" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--white)', textDecoration: 'none', border: '1px solid var(--gray-700)', padding: '0.5rem 1rem', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--white)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-700)')}>TIKTOK ↗</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ON TOUR */}
                {upcomingEvents.length > 0 && (
                    <section style={{ padding: '4rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <Label>Schedule</Label>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.03em', marginTop: '0.25rem' }}>ON TOUR</h2>
                                </div>
                                <Link href="/tour" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--gray-400)', textDecoration: 'none', border: '1px solid var(--gray-700)', padding: '0.6rem 1.2rem', transition: 'color 0.2s, border-color 0.2s', alignSelf: 'flex-end' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray-400)'; e.currentTarget.style.borderColor = 'var(--gray-700)'; }}>
                                    FULL SCHEDULE ↗
                                </Link>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--gray-800)' }}>
                                {upcomingEvents.map((event) => {
                                    const accent = CATEGORY_COLORS[event.category] ?? 'var(--white)';
                                    const d = new Date(event.date);
                                    const time = event.date.includes('T') && !event.date.endsWith('T00:00:00')
                                        ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : null;
                                    const card = (
                                        <div style={{ background: 'var(--gray-900)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'background 0.2s', cursor: event.url ? 'pointer' : 'default' }}
                                             onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                             onMouseLeave={e => (e.currentTarget.style.background = 'var(--gray-900)')}
                                        >
                                            <div>
                                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '0.04em', color: accent, lineHeight: 1 }}>{d.getDate()}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--gray-600)', marginLeft: '0.4rem' }}>{d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                            </div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', letterSpacing: '0.03em', color: 'var(--white)', lineHeight: 1.15 }}>{event.title}</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: 'auto' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.12em', color: accent, border: `1px solid ${accent}`, padding: '2px 6px', alignSelf: 'flex-start' }}>{event.category.toUpperCase()}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--gray-600)' }}>{event.platform?.toUpperCase()}{time ? ` — ${time}` : ''}</span>
                                            </div>
                                        </div>
                                    );
                                    return event.url ? (
                                        <a key={event.id} href={event.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{card}</a>
                                    ) : <div key={event.id}>{card}</div>;
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* THE SETUP */}
                {gear && (
                    <section style={{ padding: '4rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.03em' }}>THE SETUP</h2>
                                <Label>What I use to make things</Label>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', borderTop: '1px solid var(--gray-800)', borderLeft: '1px solid var(--gray-800)' }}>
                                {[
                                    { label: 'Coding',          items: gear.coding,  accent: 'var(--red)'      },
                                    { label: 'Content',         items: gear.content, accent: 'var(--white)'    },
                                    { label: 'Gaming / Stream', items: gear.gaming,  accent: 'var(--gray-400)' },
                                ].map(col => (
                                    <div key={col.label} style={{ borderRight: '1px solid var(--gray-800)', borderBottom: '1px solid var(--gray-800)', padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                            <span style={{ width: '8px', height: '8px', background: col.accent, display: 'block' }} />
                                            <Label>{col.label}</Label>
                                        </div>
                                        {col.items?.map((item: any) => (
                                            <div key={item.name} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--gray-800)' }}>
                                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)', marginBottom: '3px' }}>{item.category}</p>
                                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--white)' }}>{item.name}</p>
                                                {item.specs && !item.subspecs && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--gray-600)', marginTop: '2px' }}>{item.specs}</p>}
                                                {item.subspecs && (
                                                    <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        {item.subspecs.map((sub: string, si: number) => (
                                                            <p key={si} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gray-600)', paddingLeft: '0.75rem', borderLeft: '1px solid var(--gray-700)' }}>{sub}</p>
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

                {/* WHAT'S NEXT */}
                {roadmap.length > 0 && (
                    <section style={{ padding: '4rem 6vw', borderBottom: '1px solid var(--gray-800)' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.03em' }}>WHAT'S NEXT</h2>
                                <Label>Live roadmap</Label>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                                {roadmap.map((item, i) => {
                                    const statusColor = item.status === 'Active' ? 'var(--red)' : item.status === 'In Progress' ? '#4ADE80' : 'var(--gray-500)';
                                    return (
                                        <div key={i} style={{ background: 'var(--gray-900)', padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <span style={{ width: '10px', height: '10px', background: 'var(--red)', display: 'block', flexShrink: 0, marginTop: '4px' }} />
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: statusColor, border: `1px solid ${statusColor}`, padding: '3px 8px' }}>{item.status?.toUpperCase()}</span>
                                            </div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.03em', marginBottom: '0.4rem' }}>{item.title}</h3>
                                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-400)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{item.description}</p>
                                            <Label>ETA — {item.eta}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* WHY STICK AROUND */}
                <section style={{ padding: '8rem 6vw' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <Label>Why follow along</Label>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '0.02em', margin: '1rem 0 2rem', lineHeight: 0.92 }}>
                            ONE LIFE.<br />
                            <span style={{ WebkitTextStroke: '1px var(--white)', WebkitTextFillColor: 'transparent' }}>ALL OF IT.</span>
                        </h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--gray-300)', lineHeight: 1.75, maxWidth: '600px', marginBottom: '3rem' }}>
                            Come along for the day-to-day of a 21-year-old in Northern California who loves film, builds cars, games, lifts, and new tech.
                        </p>
                        <form onSubmit={handleSub} style={{ display: 'flex', gap: '0', maxWidth: '480px', marginBottom: '1rem' }}>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required disabled={subStatus === 'loading'} style={{ flex: 1, background: 'var(--gray-800)', border: '1px solid var(--gray-700)', borderRight: 'none', padding: '0.9rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--white)', outline: 'none' }} />
                            <button type="submit" disabled={subStatus === 'loading'} style={{ background: 'var(--red)', border: '1px solid var(--red)', padding: '0.9rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--white)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = '#BF0015')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}>
                                {subStatus === 'loading' ? '...' : 'SUBSCRIBE'}
                            </button>
                        </form>
                        {subStatus === 'success' && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4ADE80', letterSpacing: '0.1em' }}>✓ You're in.</p>}
                        {subStatus === 'error'   && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--red)', letterSpacing: '0.1em' }}>✗ Something went wrong. Try again or email directly.</p>}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                            {[
                                { name: 'YouTube', url: 'https://youtube.com/seriousreal' },
                                { name: 'Twitch',  url: 'https://twitch.tv/s_rious' },
                                { name: 'TikTok',  url: 'https://tiktok.com/@s_rious' },
                                { name: 'X',       url: 'https://x.com/s7rious' },
                            ].map(s => (
                                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--gray-400)', textDecoration: 'none', borderBottom: '1px solid var(--gray-700)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--white)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray-400)'; e.currentTarget.style.borderColor = 'var(--gray-700)'; }}>
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
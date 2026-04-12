'use client';

import { useState, useMemo } from 'react';
import events from '@/data/events.json';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Event {
    id: number;
    title: string;
    category: string;
    date: string;
    platform: string;
    url: string;
    thumbnail?: string;
    description: string;
    status: string;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
    Stream:      'var(--red)',
    Video:       'var(--white)',
    'IRL Event': '#4ADE80',
    Collab:      '#00E5FF',
};

const CATEGORY_LABELS: Record<string, string> = {
    Stream:      'STREAM',
    Video:       'VIDEO',
    'IRL Event': 'IRL EVENT',
    Collab:      'COLLAB',
};

const ALL_CATEGORIES = ['Stream', 'Video', 'IRL Event', 'Collab'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
    if (!url) return null;
    // Handles: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
    const patterns = [
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function resolveThumbnail(event: Event): string | null {
    // 1. Manual override wins
    if (event.thumbnail) return event.thumbnail;

    // 2. Auto-extract from YouTube URL
    const ytId = extractYouTubeId(event.url);
    if (ytId) {
        // maxresdefault is best quality; falls back gracefully in img onError
        return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }

    // 3. No thumbnail — render placeholder
    return null;
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: 'var(--gray-500)',
        }}>{children}</span>
    );
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const hasTime = dateStr.includes('T') && !dateStr.endsWith('T00:00:00');
    return {
        full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        time: hasTime ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : null,
    };
}

// ─── PLACEHOLDER SVG ─────────────────────────────────────────────────────────
function ThumbnailPlaceholder({ accent }: { accent: string }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Subtle grid pattern */}
            <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id={`grid-${accent}`} width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke={accent} strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${accent})`} />
            </svg>
            {/* Center dot */}
            <div style={{
                width: '6px',
                height: '6px',
                background: accent,
                opacity: 0.4,
            }} />
        </div>
    );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
    const accent    = CATEGORY_COLORS[event.category] ?? 'var(--white)';
    const date      = formatDate(event.date);
    const hasUrl    = !!event.url;
    const thumbSrc  = resolveThumbnail(event);

    // For YouTube maxresdefault fallback — some videos only have hqdefault
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const ytId = extractYouTubeId(event.url);
        if (ytId && e.currentTarget.src.includes('maxresdefault')) {
            e.currentTarget.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        }
    };

    const cardInner = (
        <>
            {/* Thumbnail area — always 16/9 */}
            <div style={{
                aspectRatio: '16/9',
                overflow: 'hidden',
                position: 'relative',
                opacity: past ? 0.5 : 1,
            }}>
                {thumbSrc ? (
                    <img
                        src={thumbSrc}
                        alt={event.title}
                        onError={handleImgError}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            filter: past ? 'grayscale(80%)' : 'grayscale(15%)',
                            transition: 'transform 0.4s, filter 0.4s',
                        }}
                        className="event-thumb"
                    />
                ) : (
                    <ThumbnailPlaceholder accent={past ? 'var(--gray-700)' : accent} />
                )}

                {/* Category badge over image */}
                <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    color: past ? 'var(--gray-600)' : accent,
                    border: `1px solid ${past ? 'var(--gray-800)' : accent}`,
                    padding: '3px 8px',
                    background: 'rgba(8,8,8,0.75)',
                    backdropFilter: 'blur(4px)',
                }}>
                    {CATEGORY_LABELS[event.category] ?? event.category.toUpperCase()}
                </div>

                {/* Hover overlay */}
                {hasUrl && !past && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(8,8,8,0)',
                        transition: 'background 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                         className="event-overlay"
                    />
                )}

                {/* Accent bar at bottom of image */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '2px',
                    background: past ? 'var(--gray-800)' : accent,
                    opacity: past ? 0.3 : 1,
                }} />
            </div>

            {/* Card body */}
            <div style={{
                padding: '1.25rem 1.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                flex: 1,
                opacity: past ? 0.5 : 1,
            }}>
                {/* Date + platform row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.1em',
                        color: 'var(--gray-500)',
                    }}>
                        {date.full}{date.time ? ` — ${date.time}` : ''}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.52rem',
                        letterSpacing: '0.1em',
                        color: 'var(--gray-700)',
                    }}>
                        {event.platform.toUpperCase()}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    letterSpacing: '0.03em',
                    lineHeight: 1.05,
                    color: past ? 'var(--gray-600)' : 'var(--white)',
                }}>
                    {event.title}
                </h3>

                {/* Description */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: past ? 'var(--gray-700)' : 'var(--gray-500)',
                    lineHeight: 1.6,
                    flex: 1,
                }}>
                    {event.description}
                </p>

                {/* CTA */}
                {hasUrl && (
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.14em',
                        color: past ? 'var(--gray-700)' : accent,
                        marginTop: '0.25rem',
                    }}>
                        {past ? 'WATCH ↗' : 'DETAILS ↗'}
                    </div>
                )}
            </div>
        </>
    );

    const sharedStyle: React.CSSProperties = {
        background: past ? 'rgba(255,255,255,0.015)' : 'var(--gray-900)',
        border: `1px solid ${past ? 'rgba(255,255,255,0.05)' : 'var(--gray-800)'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
        textDecoration: 'none',
        color: 'inherit',
    };

    if (hasUrl && !past) {
        return (
            <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                style={sharedStyle}
                onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-800)')}
            >
                {cardInner}
            </a>
        );
    }

    if (hasUrl && past) {
        return (
            <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...sharedStyle, cursor: 'pointer' }}
            >
                {cardInner}
            </a>
        );
    }

    return <div style={sharedStyle}>{cardInner}</div>;
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Tour() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [pastOpen, setPastOpen]           = useState(false);

    const toggleFilter = (cat: string) => {
        setActiveFilters(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const now = new Date();

    const upcoming = useMemo(() =>
            (events as Event[])
                .filter(e => e.status === 'upcoming' && new Date(e.date) >= now)
                .filter(e => activeFilters.length === 0 || activeFilters.includes(e.category))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        [activeFilters]
    );

    const past = useMemo(() =>
            (events as Event[])
                .filter(e => e.status === 'past' || new Date(e.date) < now)
                .filter(e => activeFilters.length === 0 || activeFilters.includes(e.category))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [activeFilters]
    );

    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh' }}>

            {/* ── HEADER ─────────────────────────────────────────── */}
            <div style={{ padding: '10rem 6vw 5rem', borderBottom: '1px solid var(--gray-800)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <Label>Live calendar</Label>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(5rem, 16vw, 13rem)',
                        lineHeight: 0.88,
                        letterSpacing: '-0.01em',
                        margin: '1rem 0 0',
                    }}>
                        ON TOUR
                    </h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '2rem',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.1rem',
                            color: 'var(--gray-400)',
                            maxWidth: '520px',
                            lineHeight: 1.7,
                        }}>
                            Streams. Videos. Events. Everything SERIOUS and CAMRY —
                            all in one place. Filter by what you care about.
                        </p>
                        <Label>{upcoming.length} upcoming</Label>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 6vw 8rem' }}>

                {/* ── FILTER BAR ─────────────────────────────────── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                }}>
                    <Label>Filter</Label>

                    {ALL_CATEGORIES.map(cat => {
                        const active = activeFilters.includes(cat);
                        const accent = CATEGORY_COLORS[cat];
                        return (
                            <button
                                key={cat}
                                onClick={() => toggleFilter(cat)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.6rem',
                                    letterSpacing: '0.14em',
                                    padding: '5px 14px',
                                    border: `1px solid ${active ? accent : 'var(--gray-700)'}`,
                                    background: active ? `${accent}18` : 'transparent',
                                    color: active ? accent : 'var(--gray-500)',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => {
                                    if (!active) {
                                        (e.currentTarget as HTMLElement).style.borderColor = accent;
                                        (e.currentTarget as HTMLElement).style.color = accent;
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!active) {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-700)';
                                        (e.currentTarget as HTMLElement).style.color = 'var(--gray-500)';
                                    }
                                }}
                            >
                                {cat.toUpperCase()}
                            </button>
                        );
                    })}

                    {activeFilters.length > 0 && (
                        <button
                            onClick={() => setActiveFilters([])}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.6rem',
                                letterSpacing: '0.14em',
                                padding: '5px 14px',
                                border: '1px solid var(--gray-800)',
                                background: 'transparent',
                                color: 'var(--gray-600)',
                                cursor: 'pointer',
                                transition: 'color 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-600)')}
                        >
                            CLEAR
                        </button>
                    )}
                </div>

                {/* ── UPCOMING GRID ──────────────────────────────── */}
                {upcoming.length === 0 ? (
                    <div style={{
                        border: '1px solid var(--gray-800)',
                        padding: '4rem',
                        textAlign: 'center',
                    }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--gray-600)' }}>
                            NOTHING SCHEDULED IN THIS CATEGORY YET.
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1px',
                        background: 'var(--gray-800)',
                    }}>
                        {upcoming.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}

                {/* ── PAST EVENTS (COLLAPSIBLE) ──────────────────── */}
                {past.length > 0 && (
                    <div style={{ marginTop: '5rem', borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
                        <button
                            onClick={() => setPastOpen(p => !p)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginBottom: pastOpen ? '2rem' : 0,
                            }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                letterSpacing: '0.05em',
                                color: 'var(--gray-600)',
                            }}>
                                PAST
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.58rem',
                                letterSpacing: '0.12em',
                                color: 'var(--gray-700)',
                                border: '1px solid var(--gray-800)',
                                padding: '2px 8px',
                            }}>
                                {past.length} EVENT{past.length !== 1 ? 'S' : ''}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                color: 'var(--gray-700)',
                                transform: pastOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                                display: 'inline-block',
                            }}>
                                ↓
                            </span>
                        </button>

                        {pastOpen && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '1px',
                                background: 'var(--gray-800)',
                            }}>
                                {past.map(event => (
                                    <EventCard key={event.id} event={event} past />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
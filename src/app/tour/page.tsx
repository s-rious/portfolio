'use client';

import { useState, useMemo } from 'react';
import events from '@/data/events.json';
import streamSchedule from '@/data/streamSchedule.json';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Event {
    id: number;
    title: string;
    categories: string[];
    date: string;
    platform: string;
    url: string;
    thumbnail?: string;
    description: string;
}

type DayState = 'scheduled' | 'no-stream' | 'tbd' | 'off';

interface DaySlot {
    date: Date;
    state: DayState;
    events: Event[];
    pastEvent: boolean;
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

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toDateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getWeekStart(offsetWeeks: number): Date {
    const today = new Date();
    const day = today.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff + offsetWeeks * 7);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function buildWeekSlots(offsetWeeks: number): DaySlot[] {
    const monday = getWeekStart(offsetWeeks);
    const slots: DaySlot[] = [];
    const noStreamSet = new Set<string>(streamSchedule.noStream ?? []);
    const typicalSet  = new Set<string>(streamSchedule.typicalDays ?? []);
    const now = new Date();

    // Bucket ALL events by date (not just Stream) so Video/Collab/IRL Event
    // drops show up on the grid too, not just in the lists below.
    const eventsByDate: Record<string, Event[]> = {};
    for (const ev of events as Event[]) {
        const key = toDateKey(new Date(ev.date));
        (eventsByDate[key] ??= []).push(ev);
    }

    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        const key     = toDateKey(day);
        const dayName = DAY_NAMES[day.getDay()];
        const dayEvents = (eventsByDate[key] ?? [])
            .slice()
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        let state: DayState;
        let pastEvent = false;

        if (dayEvents.length > 0) {
            state = 'scheduled';
            // Past only once every event that day has already happened
            pastEvent = dayEvents.every(ev => new Date(ev.date) < now);
        } else if (noStreamSet.has(dayName)) {
            state = 'no-stream';
        } else if (typicalSet.has(dayName)) {
            state = 'tbd';
        } else {
            state = 'off';
        }

        slots.push({ date: day, state, events: dayEvents, pastEvent });
    }

    return slots;
}

function extractYouTubeId(url: string): string | null {
    if (!url) return null;
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
    if (event.thumbnail) return event.thumbnail;
    const ytId = extractYouTubeId(event.url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    return null;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const hasTime = dateStr.includes('T') && !dateStr.endsWith('T00:00:00');
    return {
        full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        time: hasTime ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : null,
    };
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

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

// Renders one pill per category, all equal visual weight — no "primary" tag.
function TagBadges({ categories, dim = false }: { categories: string[]; dim?: boolean }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {categories.map(cat => {
                const accent = dim ? 'var(--gray-600)' : (CATEGORY_COLORS[cat] ?? 'var(--white)');
                return (
                    <span key={cat} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.14em',
                        color: accent, border: `1px solid ${dim ? 'var(--gray-800)' : accent}`,
                        padding: '3px 7px',
                    }}>
                        {CATEGORY_LABELS[cat] ?? cat.toUpperCase()}
                    </span>
                );
            })}
        </div>
    );
}

function ThumbnailPlaceholder({ accent }: { accent: string }) {
    return (
        <div style={{
            width: '100%', height: '100%',
            background: 'var(--black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
        }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id={`grid-${accent}`} width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke={accent} strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${accent})`} />
            </svg>
            <div style={{ width: '6px', height: '6px', background: accent, opacity: 0.4 }} />
        </div>
    );
}

// ─── STREAM SCHEDULE SLOT ────────────────────────────────────────────────────

function eventTimeStr(event: Event): string | null {
    return event.date.includes('T') && !event.date.endsWith('T00:00:00')
        ? new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        : null;
}

function ScheduleSlot({ slot, isToday, isSelected, onSelectDay }: { slot: DaySlot; isToday: boolean; isSelected: boolean; onSelectDay: (key: string) => void }) {
    const { date, state, events: dayEvents, pastEvent } = slot;
    const dayShort = DAY_SHORT[date.getDay()];
    const dayNum   = date.getDate();
    const dateKey  = toDateKey(date);

    const borderColor = isToday ? 'var(--white)' : 'var(--gray-800)';

    if (state === 'off') {
        return (
            <div style={{
                border: `1px solid ${borderColor}`,
                padding: '1.25rem 1rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                minHeight: '130px', opacity: 0.3,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--gray-700)' }}>{dayShort}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gray-800)', lineHeight: 1 }}>{dayNum}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--gray-800)', marginTop: 'auto' }}>—</span>
            </div>
        );
    }

    if (state === 'no-stream') {
        return (
            <div style={{
                border: `1px solid ${borderColor}`,
                padding: '1.25rem 1rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                minHeight: '130px',
                background: isToday ? 'rgba(255,255,255,0.02)' : 'transparent',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: isToday ? 'var(--gray-400)' : 'var(--gray-600)' }}>
                        {dayShort}{isToday && <span style={{ marginLeft: '6px', color: 'var(--white)' }}>●</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: isToday ? 'var(--white)' : 'var(--gray-600)', lineHeight: 1 }}>{dayNum}</span>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.14em', color: 'var(--gray-600)', border: '1px solid var(--gray-800)', padding: '3px 7px' }}>
                        NO STREAM
                    </span>
                </div>
            </div>
        );
    }

    if (state === 'tbd') {
        return (
            <div style={{
                border: `1px solid ${borderColor}`,
                padding: '1.25rem 1rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                minHeight: '130px',
                background: isToday ? 'rgba(255,255,255,0.02)' : 'transparent',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: isToday ? 'var(--gray-400)' : 'var(--gray-600)' }}>
                        {dayShort}{isToday && <span style={{ marginLeft: '6px', color: 'var(--white)' }}>●</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: isToday ? 'var(--white)' : 'var(--gray-600)', lineHeight: 1 }}>{dayNum}</span>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.14em', color: 'var(--red)', border: '1px solid rgba(232,0,29,0.3)', padding: '3px 7px' }}>
                        TBD
                    </span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', letterSpacing: '0.08em', color: 'var(--gray-700)', marginTop: '6px' }}>Unscheduled</p>
                </div>
            </div>
        );
    }

    // Scheduled, MULTIPLE events this day — compact cluster, never grows the
    // row. Tap it to see the actual events in the panel below the grid.
    if (dayEvents.length > 1) {
        const uniqueCats = Array.from(new Set(dayEvents.flatMap(ev => ev.categories)));
        const idleBg = pastEvent ? 'transparent' : (isToday ? 'rgba(232,0,29,0.04)' : 'var(--gray-900)');
        return (
            <button
                onClick={() => onSelectDay(dateKey)}
                style={{
                    border: `1px solid ${isSelected ? 'var(--red)' : (isToday ? 'var(--red)' : 'var(--gray-800)')}`,
                    padding: '1.25rem 1rem',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                    minHeight: '130px',
                    background: isSelected ? 'rgba(232,0,29,0.08)' : idleBg,
                    opacity: pastEvent && !isSelected ? 0.55 : 1,
                    textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer',
                    transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.045)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = idleBg; }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--gray-400)' }}>
                        {dayShort}{isToday && <span style={{ marginLeft: '6px', color: 'var(--red)' }}>●</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', lineHeight: 1 }}>{dayNum}</span>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', letterSpacing: '0.02em', color: 'var(--white)' }}>
                        {dayEvents.length} EVENTS
                    </span>
                    <TagBadges categories={uniqueCats} dim={pastEvent} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.1em', color: isSelected ? 'var(--red)' : 'var(--gray-600)' }}>
                        {isSelected ? 'VIEWING BELOW ↓' : 'TAP TO VIEW ↓'}
                    </span>
                </div>
            </button>
        );
    }

    // Scheduled, single event — direct link, exactly as compact as before
    const ev = dayEvents[0];
    const timeStr = eventTimeStr(ev);

    if (pastEvent) {
        return (
            <a
                href={ev.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    border: '1px solid var(--gray-800)',
                    padding: '1.25rem 1rem',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                    minHeight: '130px', background: 'transparent',
                    textDecoration: 'none', color: 'inherit', opacity: 0.5, cursor: 'pointer',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--gray-600)' }}>{dayShort}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gray-600)', lineHeight: 1 }}>{dayNum}</span>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <TagBadges categories={ev.categories} dim />
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.02em', color: 'var(--gray-600)', lineHeight: 1.15, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                        {ev.title}
                    </p>
                    {timeStr && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--gray-700)' }}>{timeStr}</p>}
                </div>
            </a>
        );
    }

    return (
        <a
            href={ev.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                border: `1px solid ${isToday ? 'var(--red)' : 'var(--gray-800)'}`,
                padding: '1.25rem 1rem',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                minHeight: '130px',
                background: isToday ? 'rgba(232,0,29,0.04)' : 'var(--gray-900)',
                textDecoration: 'none', color: 'inherit',
                transition: 'border-color 0.2s, background 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.background = 'rgba(232,0,29,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = isToday ? 'var(--red)' : 'var(--gray-800)'; e.currentTarget.style.background = isToday ? 'rgba(232,0,29,0.04)' : 'var(--gray-900)'; }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--gray-400)' }}>
                    {dayShort}{isToday && <span style={{ marginLeft: '6px', color: 'var(--red)' }}>●</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--white)', lineHeight: 1 }}>{dayNum}</span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <TagBadges categories={ev.categories} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.02em', color: 'var(--white)', lineHeight: 1.15, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                    {ev.title}
                </p>
                {timeStr && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>{timeStr}</p>}
            </div>
        </a>
    );
}

// ─── SELECTED DAY DETAIL PANEL ─────────────────────────────────────────────────
// Sits directly under the grid. This is where multi-event days get to
// actually expand — the grid row itself never does.

function DayDetailPanel({ slot, onClose }: { slot: DaySlot; onClose: () => void }) {
    return (
        <div style={{ border: '1px solid var(--gray-800)', borderTop: 'none', padding: '1.5rem', background: 'var(--gray-900)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Label>{slot.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — {slot.events.length} events</Label>
                <button
                    onClick={onClose}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--gray-600)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-600)')}
                >
                    CLOSE ✕
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {slot.events.map((ev, idx) => {
                    const evPast  = new Date(ev.date) < new Date();
                    const timeStr = eventTimeStr(ev);
                    return (
                        <a
                            key={`${ev.id}-${idx}`}
                            href={ev.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
                                gap: '0.75rem 1.5rem', padding: '0.85rem 0',
                                borderTop: idx > 0 ? '1px solid var(--gray-800)' : 'none',
                                textDecoration: 'none', color: 'inherit',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <TagBadges categories={ev.categories} dim={evPast} />
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.02em', color: evPast ? 'var(--gray-500)' : 'var(--white)' }}>
                                    {ev.title}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                {timeStr && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>{timeStr}</span>}
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: evPast ? 'var(--gray-700)' : 'var(--red)' }}>
                                    {evPast ? 'WATCH ↗' : 'DETAILS ↗'}
                                </span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────

function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
    // First category drives incidental chrome (border hover, bottom line) — the
    // badges themselves (below) are rendered equal-weight regardless of order.
    const accent   = CATEGORY_COLORS[event.categories[0]] ?? 'var(--white)';
    const date     = formatDate(event.date);
    const hasUrl   = !!event.url;
    const thumbSrc = resolveThumbnail(event);

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const ytId = extractYouTubeId(event.url);
        if (ytId && e.currentTarget.src.includes('maxresdefault')) {
            e.currentTarget.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        }
    };

    const cardInner = (
        <>
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', opacity: past ? 0.5 : 1 }}>
                {thumbSrc ? (
                    <img
                        src={thumbSrc} alt={event.title} onError={handleImgError}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: past ? 'grayscale(80%)' : 'grayscale(15%)', transition: 'transform 0.4s, filter 0.4s' }}
                        className="event-thumb"
                    />
                ) : (
                    <ThumbnailPlaceholder accent={past ? 'var(--gray-700)' : accent} />
                )}
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: 'calc(100% - 1.5rem)' }}>
                    {event.categories.map(cat => (
                        <span key={cat} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.14em', color: past ? 'var(--gray-600)' : (CATEGORY_COLORS[cat] ?? 'var(--white)'), border: `1px solid ${past ? 'var(--gray-800)' : (CATEGORY_COLORS[cat] ?? 'var(--white)')}`, padding: '3px 8px', background: 'rgba(8,8,8,0.75)', backdropFilter: 'blur(4px)' }}>
                            {CATEGORY_LABELS[cat] ?? cat.toUpperCase()}
                        </span>
                    ))}
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: past ? 'var(--gray-800)' : accent, opacity: past ? 0.3 : 1 }} />
            </div>
            <div style={{ padding: '1.25rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, opacity: past ? 0.5 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>
                        {date.full}{date.time ? ` — ${date.time}` : ''}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--gray-700)' }}>
                        {event.platform.toUpperCase()}
                    </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '0.03em', lineHeight: 1.05, color: past ? 'var(--gray-600)' : 'var(--white)' }}>
                    {event.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: past ? 'var(--gray-700)' : 'var(--gray-500)', lineHeight: 1.6, flex: 1 }}>
                    {event.description}
                </p>
                {hasUrl && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: past ? 'var(--gray-700)' : accent, marginTop: '0.25rem' }}>
                        {past ? 'WATCH ↗' : 'DETAILS ↗'}
                    </div>
                )}
            </div>
        </>
    );

    const sharedStyle: React.CSSProperties = {
        background: past ? 'rgba(255,255,255,0.015)' : 'var(--gray-900)',
        border: `1px solid ${past ? 'rgba(255,255,255,0.05)' : 'var(--gray-800)'}`,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.2s',
        textDecoration: 'none', color: 'inherit',
    };

    if (hasUrl) {
        return (
            <a href={event.url} target="_blank" rel="noopener noreferrer"
               style={{ ...sharedStyle, cursor: 'pointer' }}
               onMouseEnter={e => !past && (e.currentTarget.style.borderColor = accent)}
               onMouseLeave={e => !past && (e.currentTarget.style.borderColor = 'var(--gray-800)')}
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
    const [weekOffset, setWeekOffset]       = useState(0);
    const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

    const toggleFilter = (cat: string) => {
        setActiveFilters(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const now = new Date();

    const weekSlots = useMemo(() => buildWeekSlots(weekOffset), [weekOffset]);

    const weekLabel = useMemo(() => {
        const monday = getWeekStart(weekOffset);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        if (weekOffset === 0) return `This Week — ${monday.toLocaleDateString('en-US', opts)} – ${sunday.toLocaleDateString('en-US', opts)}`;
        if (weekOffset === 1) return `Next Week — ${monday.toLocaleDateString('en-US', opts)} – ${sunday.toLocaleDateString('en-US', opts)}`;
        return `${monday.toLocaleDateString('en-US', opts)} – ${sunday.toLocaleDateString('en-US', opts)}`;
    }, [weekOffset]);

    const todayKey = toDateKey(now);

    const selectedSlot = useMemo(
        () => weekSlots.find(s => toDateKey(s.date) === selectedDayKey) ?? null,
        [weekSlots, selectedDayKey]
    );

    const handleWeekChange = (updater: (w: number) => number) => {
        setWeekOffset(updater);
        setSelectedDayKey(null);
    };

    const handleSelectDay = (key: string) => {
        setSelectedDayKey(prev => (prev === key ? null : key));
    };

    // ── Date-based filtering (no status field) ──
    const upcoming = useMemo(() =>
            (events as Event[])
                .filter(e => new Date(e.date) > now)
                .filter(e => activeFilters.length === 0 || e.categories.some(c => activeFilters.includes(c)))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        [activeFilters]
    );

    const past = useMemo(() =>
            (events as Event[])
                .filter(e => new Date(e.date) <= now)
                .filter(e => activeFilters.length === 0 || e.categories.some(c => activeFilters.includes(c)))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [activeFilters]
    );

    const typicalDaysLabel = (streamSchedule.typicalDays ?? []).join(' · ').toUpperCase();

    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh' }}>

            {/* ── HEADER ── */}
            <div style={{ padding: '10rem 6vw 5rem', borderBottom: '1px solid var(--gray-800)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <Label>Live calendar</Label>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 16vw, 13rem)', lineHeight: 0.88, letterSpacing: '-0.01em', margin: '1rem 0 0' }}>
                        ON TOUR
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--gray-400)', maxWidth: '520px', lineHeight: 1.7 }}>
                            Streams. Videos. Events. Everything SERIOUS and CAMRY — all in one place. Filter by what you care about.
                        </p>
                        <Label>{upcoming.length} upcoming</Label>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 6vw 8rem' }}>

                {/* ── STREAM SCHEDULE ── */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <Label>Weekly lineup</Label>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.03em', marginTop: '0.4rem' }}>
                                WEEKLY LINEUP
                            </h2>
                        </div>

                        {/* Week nav */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                            <button
                                onClick={() => handleWeekChange(w => Math.max(0, w - 1))}
                                disabled={weekOffset === 0}
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '0.55rem 1rem', border: '1px solid var(--gray-700)', borderRight: 'none', background: 'transparent', color: weekOffset === 0 ? 'var(--gray-800)' : 'var(--gray-400)', cursor: weekOffset === 0 ? 'not-allowed' : 'pointer', transition: 'color 0.15s' }}
                                onMouseEnter={e => weekOffset > 0 && (e.currentTarget.style.color = 'var(--white)')}
                                onMouseLeave={e => (e.currentTarget.style.color = weekOffset === 0 ? 'var(--gray-800)' : 'var(--gray-400)')}
                            >←</button>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', padding: '0.55rem 1.25rem', border: '1px solid var(--gray-700)', color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
                                {weekLabel}
                            </div>
                            <button
                                onClick={() => handleWeekChange(w => Math.min(3, w + 1))}
                                disabled={weekOffset === 3}
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '0.55rem 1rem', border: '1px solid var(--gray-700)', borderLeft: 'none', background: 'transparent', color: weekOffset === 3 ? 'var(--gray-800)' : 'var(--gray-400)', cursor: weekOffset === 3 ? 'not-allowed' : 'pointer', transition: 'color 0.15s' }}
                                onMouseEnter={e => weekOffset < 3 && (e.currentTarget.style.color = 'var(--white)')}
                                onMouseLeave={e => (e.currentTarget.style.color = weekOffset === 3 ? 'var(--gray-800)' : 'var(--gray-400)')}
                            >→</button>
                        </div>
                    </div>

                    {/* 7-day grid — fixed height, never expands. Multi-event
                        days are a tappable cluster; details land below. */}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any, marginLeft: '-6vw', marginRight: '-6vw', paddingLeft: '6vw', paddingRight: '6vw' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(120px, 1fr))', gap: '1px', background: 'var(--gray-800)', minWidth: '700px' }}>
                            {weekSlots.map((slot, i) => {
                                const isToday = weekOffset === 0 && toDateKey(slot.date) === todayKey;
                                const dateKey = toDateKey(slot.date);
                                return (
                                    <ScheduleSlot
                                        key={i}
                                        slot={slot}
                                        isToday={isToday}
                                        isSelected={selectedDayKey === dateKey}
                                        onSelectDay={handleSelectDay}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail panel — full width, wraps normally, grows freely.
                        This is the ONLY thing that expands; the grid above never does. */}
                    {selectedSlot && selectedSlot.events.length > 1 && (
                        <DayDetailPanel slot={selectedSlot} onClose={() => setSelectedDayKey(null)} />
                    )}

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ display: 'block', width: '8px', height: '8px', background: 'var(--red)' }} />
                            <Label>Scheduled</Label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ display: 'block', width: '8px', height: '8px', border: '1px solid rgba(232,0,29,0.3)' }} />
                            <Label>TBD</Label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ display: 'block', width: '8px', height: '8px', border: '1px solid var(--gray-800)' }} />
                            <Label>No stream</Label>
                        </div>
                        {typicalDaysLabel && (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gray-700)', marginLeft: 'auto' }}>
                                Typical days: {typicalDaysLabel}
                            </span>
                        )}
                    </div>
                </div>

                {/* ── FILTER BAR ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <Label>Filter</Label>
                    {ALL_CATEGORIES.map(cat => {
                        const active = activeFilters.includes(cat);
                        const accent = CATEGORY_COLORS[cat];
                        return (
                            <button
                                key={cat}
                                onClick={() => toggleFilter(cat)}
                                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', padding: '5px 14px', border: `1px solid ${active ? accent : 'var(--gray-700)'}`, background: active ? `${accent}18` : 'transparent', color: active ? accent : 'var(--gray-500)', cursor: 'pointer', transition: 'all 0.15s' }}
                                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = accent; (e.currentTarget as HTMLElement).style.color = accent; } }}
                                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-700)'; (e.currentTarget as HTMLElement).style.color = 'var(--gray-500)'; } }}
                            >
                                {cat.toUpperCase()}
                            </button>
                        );
                    })}
                    {activeFilters.length > 0 && (
                        <button
                            onClick={() => setActiveFilters([])}
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', padding: '5px 14px', border: '1px solid var(--gray-800)', background: 'transparent', color: 'var(--gray-600)', cursor: 'pointer', transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-600)')}
                        >
                            CLEAR
                        </button>
                    )}
                </div>

                {/* ── UPCOMING GRID ── */}
                {upcoming.length === 0 ? (
                    <div style={{ border: '1px solid var(--gray-800)', padding: '4rem', textAlign: 'center' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--gray-600)' }}>
                            NOTHING SCHEDULED IN THIS CATEGORY YET.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                        {upcoming.map(event => <EventCard key={event.id} event={event} />)}
                    </div>
                )}

                {/* ── PAST EVENTS ── */}
                {past.length > 0 && (
                    <div style={{ marginTop: '5rem', borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
                        <button
                            onClick={() => setPastOpen(p => !p)}
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: pastOpen ? '2rem' : 0 }}
                        >
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em', color: 'var(--gray-600)' }}>PAST</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--gray-700)', border: '1px solid var(--gray-800)', padding: '2px 8px' }}>
                                {past.length} EVENT{past.length !== 1 ? 'S' : ''}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gray-700)', transform: pastOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', display: 'inline-block' }}>↓</span>
                        </button>

                        {pastOpen && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                                {past.map(event => <EventCard key={event.id} event={event} past />)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
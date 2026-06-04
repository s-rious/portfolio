'use client';

import { useEffect, useState } from 'react';
import eventsData from '@/data/events.json';

// ============================================================================
// Tuned to your events.json:
//   - Flat array at the top level (no nesting key)
//   - category: "Stream" (capitalized) flags streams
//   - date field holds full datetime, e.g. "2026-06-14T12:30:00"
//   - No per-event duration → 3hr default
//   - Titles/descriptions containing "CANCELLED" are skipped
// ============================================================================

// Category values that count as a stream (case-insensitive, substring match)
const STREAM_CATEGORIES = ['stream'];

// Default stream duration in hours when an event doesn't specify one
const DEFAULT_STREAM_HOURS = 3;

// Pre-live grace: minutes BEFORE start time during which page already hijacks.
// Set to e.g. 5 if you want a 5-min head start.
const PRE_LIVE_GRACE_MINUTES = 0;

// ============================================================================

interface EventLike {
    id?: number;
    title?: string;
    description?: string;
    date?: string;
    category?: string;
    type?: string;
    durationHours?: number;
    duration?: number;
}

function getEventsList(): EventLike[] {
    // Your events.json is a flat array at the top level
    if (Array.isArray(eventsData)) return eventsData as EventLike[];

    // Fallback: if it's ever changed to be nested, try common keys
    const data = eventsData as any;
    if (Array.isArray(data?.events)) return data.events;
    if (Array.isArray(data?.items)) return data.items;
    return [];
}

function parseEventStart(event: EventLike): Date | null {
    if (!event.date) return null;
    const d = new Date(event.date);
    return isNaN(d.getTime()) ? null : d;
}

function isStreamEvent(event: EventLike): boolean {
    const cat = (event.category || event.type || '').toLowerCase();
    return STREAM_CATEGORIES.some((c) => cat.includes(c));
}

function isCancelled(event: EventLike): boolean {
    const haystack = `${event.title || ''} ${event.description || ''}`.toUpperCase();
    return haystack.includes('CANCELLED') || haystack.includes('CANCELED');
}

export function useScheduledLive(): boolean {
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const check = () => {
            const now = new Date();
            const events = getEventsList();

            const liveNow = events.some((event) => {
                if (!isStreamEvent(event)) return false;
                if (isCancelled(event)) return false;

                const start = parseEventStart(event);
                if (!start) return false;

                const effectiveStart = new Date(
                    start.getTime() - PRE_LIVE_GRACE_MINUTES * 60 * 1000
                );

                const durationHours =
                    event.durationHours || event.duration || DEFAULT_STREAM_HOURS;
                const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

                return now >= effectiveStart && now <= end;
            });

            setIsLive(liveNow);
        };

        check();
        const interval = setInterval(check, 30_000); // re-check every 30s
        return () => clearInterval(interval);
    }, []);

    return isLive;
}
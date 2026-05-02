'use client';

import { useState, useRef, useEffect } from 'react';
import workData from '@/data/projects.json';
import eventsData from '@/data/events.json';

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Tab = 'CONTENT' | 'PROGRAMMING' | 'OBSESSIONS';
type PanelMode = 'series' | 'project' | null;

interface StringCoord {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

type ObsessionItem = typeof workData.obsessions[0];

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const STRING_CONNECTIONS: [number, number][] = [
    [0, 2], [0, 4], [1, 3], [1, 5],
    [2, 6], [3, 7], [4, 8], [5, 9],
    [6, 8], [7, 9], [1, 8], [0, 7],
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
}

// ─── CHART: CONTENT MIX ──────────────────────────────────────────────────────

function ContentMixChart({ data }: { data: { label: string; value: number; views: number; color: string }[] }) {
    const maxViews = Math.max(...data.map(d => d.views), 1);
    return (
        <div>
            <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">VIEWS BY FORMAT</div>
            <div className="space-y-5">
                {data.map(item => (
                    <div key={item.label}>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-gray-500">
                                {item.label}
                                <span className="text-gray-700 ml-2">({item.value} published)</span>
                            </span>
                            <span className="text-xs font-mono" style={{ color: item.views === 0 ? '#444' : item.color }}>
                                {item.views.toLocaleString()} views
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/5 overflow-hidden">
                            <div
                                className="h-full"
                                style={{
                                    width: `${(item.views / maxViews) * 100}%`,
                                    backgroundColor: item.views === 0 ? 'transparent' : item.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── CHART: CTR BARS ─────────────────────────────────────────────────────────

function CTRChart({ data }: { data: { label: string; value: number; color: string }[] }) {
    return (
        <div>
            <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">CLICK-THROUGH RATE</div>
            <div className="space-y-5">
                {data.map(item => (
                    <div key={item.label}>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-gray-500">{item.label}</span>
                            <span className="text-xs font-mono" style={{ color: item.color }}>{item.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 overflow-hidden">
                            <div className="h-full" style={{ width: `${(item.value / 12) * 100}%`, backgroundColor: item.color }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── CHART: TRAFFIC DONUT ────────────────────────────────────────────────────

function TrafficDonut({ data }: { data: { label: string; value: number; color: string }[] }) {
    const R = 44, cx = 60, cy = 60, strokeW = 16;
    const circumference = 2 * Math.PI * R;
    let cumulative = 0;

    return (
        <div>
            <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">TRAFFIC SOURCES</div>
            <div className="flex items-center gap-6">
                <svg viewBox="0 0 120 120" width="100" height="100" className="flex-shrink-0">
                    <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeW} />
                    {data.map((seg, i) => {
                        const dash = (seg.value / 100) * circumference;
                        const gap = circumference - dash;
                        const offsetVal = -(cumulative / 100) * circumference;
                        cumulative += seg.value;
                        return (
                            <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color}
                                    strokeWidth={strokeW} strokeDasharray={`${dash} ${gap}`}
                                    strokeDashoffset={offsetVal} transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />
                        );
                    })}
                </svg>
                <div className="space-y-2 flex-1 min-w-0">
                    {data.map(seg => (
                        <div key={seg.label} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: seg.color }} />
                            <span className="text-xs text-gray-500 flex-1 truncate">{seg.label}</span>
                            <span className="text-xs font-mono flex-shrink-0" style={{ color: seg.color }}>{seg.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── OBSESSION CARD ───────────────────────────────────────────────────────────

function ObsessionCard({ obs }: { obs: ObsessionItem }) {
    const type = (obs as any).type ?? 'plain';
    const photo = (obs as any).photo ?? null;
    const quote = (obs as any).quote ?? null;
    const attribution = (obs as any).attribution ?? null;

    return (
        <div
            className="border border-white/10 overflow-hidden"
            style={{
                backgroundColor: '#101010',
                boxShadow: '4px 6px 16px rgba(0,0,0,0.7)',
                borderTop: `2px solid ${obs.color}`,
            }}
        >
            {type === 'photo' && photo && (
                <div className="w-full aspect-video overflow-hidden">
                    <img src={photo} alt={obs.label} className="w-full h-full object-cover" />
                </div>
            )}

            {type === 'quote' && (
                <div className="p-4 pt-5">
                    <div
                        className="text-5xl leading-none mb-2 font-black"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: obs.color, opacity: 0.4 }}
                    >
                        "
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic mb-3">{quote}</p>
                    <div className="text-xs font-mono tracking-wider" style={{ color: obs.color }}>— {attribution}</div>
                </div>
            )}

            {type !== 'quote' && (
                <div className="p-4">
                    <div
                        className="font-black leading-tight mb-1 tracking-wide"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: obs.color, fontSize: '0.85rem' }}
                    >
                        {obs.label}
                    </div>
                    <div className="text-xs text-gray-600 leading-snug">{(obs as any).sub}</div>
                </div>
            )}

            {type === 'quote' && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3 mt-1">
                    <div
                        className="font-black leading-tight tracking-wide"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: obs.color, fontSize: '0.75rem', opacity: 0.6 }}
                    >
                        {obs.label}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── OBSESSIONS BOARD ────────────────────────────────────────────────────────

function ObsessionsBoard({ obsessions }: { obsessions: typeof workData.obsessions }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [strings, setStrings] = useState<StringCoord[]>([]);

    useEffect(() => {
        const measure = () => {
            if (!containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const coords: StringCoord[] = [];
            STRING_CONNECTIONS.forEach(([a, b]) => {
                const aEl = cardRefs.current[a];
                const bEl = cardRefs.current[b];
                if (!aEl || !bEl) return;
                const aRect = aEl.getBoundingClientRect();
                const bRect = bEl.getBoundingClientRect();
                coords.push({
                    x1: aRect.left + aRect.width / 2 - containerRect.left,
                    y1: aRect.top + aRect.height / 2 - containerRect.top,
                    x2: bRect.left + bRect.width / 2 - containerRect.left,
                    y2: bRect.top + bRect.height / 2 - containerRect.top,
                });
            });
            setStrings(coords);
        };
        const raf = requestAnimationFrame(() => setTimeout(measure, 80));
        window.addEventListener('resize', measure);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
    }, []);

    const buildPath = (s: StringCoord) => {
        const dist = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        const sag = dist * 0.15;
        const midX = (s.x1 + s.x2) / 2;
        const midY = (s.y1 + s.y2) / 2 + sag;
        return `M ${s.x1} ${s.y1} Q ${midX} ${midY} ${s.x2} ${s.y2}`;
    };

    return (
        <div ref={containerRef} className="relative">
            <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ zIndex: 1 }}>
                {strings.map((s, i) => {
                    const d = buildPath(s);
                    return (
                        <g key={i}>
                            <path d={d} stroke="#1A0800" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
                            <path d={d} stroke="#5C2E08" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            <path d={d} stroke="#A85C20" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
                            <path d={d} stroke="#D4894A" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.5" strokeDasharray="2 7" />
                        </g>
                    );
                })}
            </svg>
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6" style={{ zIndex: 2 }}>
                {obsessions.map((obs, i) => (
                    <div
                        key={obs.id}
                        ref={el => { cardRefs.current[i] = el; }}
                        className="relative"
                        style={{ transform: `rotate(${obs.rotate}deg)` }}
                    >
                        <div
                            className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 border border-black/40"
                            style={{ backgroundColor: obs.color, boxShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
                        />
                        <div
                            className="absolute z-10 w-1.5 h-1.5 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.35)', top: -8, left: 'calc(50% - 10px)' }}
                        />
                        <ObsessionCard obs={obs} />
                    </div>
                ))}
            </div>
            <div className="text-center mt-10 pb-6 text-gray-700 text-xs tracking-widest font-mono">
                — THESE ARE NOT HOBBIES. THESE ARE THE SOURCE CODE. —
            </div>
        </div>
    );
}

// ─── RIGHT PANEL ─────────────────────────────────────────────────────────────

function RightPanel({ mode, seriesId, projectId, onClose }: {
    mode: PanelMode; seriesId: string | null; projectId: number | null; onClose: () => void;
}) {
    const isOpen = !!mode;
    const series = seriesId ? workData.series.find(s => s.id === seriesId) ?? null : null;
    const project = projectId !== null ? workData.programming.find(p => p.id === projectId) ?? null : null;
    const projectColor = project
        ? (['#FF2E63', '#00E5FF', '#CCFF00', '#2A2A2A'][workData.programming.indexOf(project)] ?? '#FF2E63')
        : '#FF2E63';

    return (
        <>
            <div
                className="fixed inset-0 z-40 transition-all duration-500"
                style={{
                    backdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
                    WebkitBackdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
                    backgroundColor: isOpen ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
                onClick={onClose}
            />
            <div
                className="fixed top-0 right-0 bottom-0 z-50 overflow-y-auto bg-black border-l border-white/10"
                style={{
                    width: 'min(540px, 92vw)',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors duration-200 z-10 text-xs tracking-widest font-mono"
                >
                    [CLOSE]
                </button>

                {mode === 'series' && series && (
                    <div className="p-10 pt-20">
                        <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">CONTENT SERIES</div>
                        <h2 className="text-5xl font-black mb-3 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: series.color }}>
                            {series.name}
                        </h2>
                        <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: series.color }} />
                        <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">"{series.tagline}"</p>
                        <div className="flex flex-wrap gap-3 mb-10">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-500">{series.format} / ep</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-500">{series.cadence}</span>
                            {series.platforms.map(p => (
                                <span key={p} className="px-3 py-1 text-xs border" style={{ borderColor: series.color, color: series.color }}>{p}</span>
                            ))}
                        </div>
                        <div className="space-y-8">
                            <div>
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-3">THE PREMISE</div>
                                <p className="text-gray-300 text-sm leading-relaxed">{series.description}</p>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div>
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-3">WHY IT WORKS</div>
                                <p className="text-gray-300 text-sm leading-relaxed">{series.why}</p>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div>
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-3">EPISODES</div>
                                <div className="text-4xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: series.color }}>
                                    {series.episodeCount === 0 ? 'LAUNCHING SOON' : series.episodeCount}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'project' && project && (
                    <div className="p-10 pt-20">
                        {(project as any).locked ? (
                            <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
                                <div className="text-6xl font-black text-white/5 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    {project.number}
                                </div>
                                <h2 className="text-4xl font-black text-gray-700" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    [REDACTED]
                                </h2>
                                <p className="text-gray-700 text-sm max-w-xs leading-relaxed">
                                    This project reveals itself when it is ready. Watch this space.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-4">PROJECT {project.number}</div>
                                <h2 className="text-5xl font-black mb-3 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: projectColor }}>
                                    {project.title}
                                </h2>
                                <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: projectColor }} />
                                <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">"{project.description}"</p>
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-500">{tag}</span>
                                    ))}
                                </div>
                                <div className="space-y-8">
                                    {project.concept && (
                                        <div>
                                            <div className="text-xs tracking-widest font-mono mb-3" style={{ color: projectColor }}>THE CONCEPT</div>
                                            <p className="text-gray-300 text-sm leading-relaxed">{project.concept}</p>
                                        </div>
                                    )}
                                    {project.build && (
                                        <>
                                            <div className="w-full h-px bg-white/5" />
                                            <div>
                                                <div className="text-xs tracking-widest font-mono mb-3" style={{ color: projectColor }}>THE BUILD</div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{project.build}</p>
                                            </div>
                                        </>
                                    )}
                                    {project.proves && (
                                        <>
                                            <div className="w-full h-px bg-white/5" />
                                            <div>
                                                <div className="text-xs tracking-widest font-mono mb-3" style={{ color: projectColor }}>WHAT THIS PROVES</div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{project.proves}</p>
                                            </div>
                                        </>
                                    )}
                                    {project.awards && project.awards.length > 0 && (
                                        <>
                                            <div className="w-full h-px bg-white/5" />
                                            <div>
                                                <div className="text-xs tracking-widest font-mono mb-4" style={{ color: projectColor }}>RECOGNITION</div>
                                                <div className="space-y-3">
                                                    {project.awards.map((award, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: projectColor }}>▸</span>
                                                            <span className="text-gray-300 text-sm">{award}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {project.link && (
                                        <div className="pt-2">
                                            <a
                                                href={project.link} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-3 px-6 py-3 border text-sm font-black tracking-wider transition-all duration-300 hover:bg-white/5"
                                                style={{ fontFamily: "'Bebas Neue', sans-serif", borderColor: projectColor, color: projectColor }}
                                            >
                                                VIEW PROJECT ↗
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Projects() {
    const [activeTab, setActiveTab] = useState<Tab>('CONTENT');
    const [panelMode, setPanelMode] = useState<PanelMode>(null);
    const [panelSeriesId, setPanelSeriesId] = useState<string | null>(null);
    const [panelProjectId, setPanelProjectId] = useState<number | null>(null);

    const openSeries = (id: string) => { setPanelMode('series'); setPanelSeriesId(id); setPanelProjectId(null); };
    const openProject = (id: number) => { setPanelMode('project'); setPanelProjectId(id); setPanelSeriesId(null); };
    const closePanel = () => { setPanelMode(null); setPanelSeriesId(null); setPanelProjectId(null); };

    const featuredEvent = eventsData.find(e => e.id === workData.featuredVideoId) ?? null;
    const embedId = featuredEvent ? getYouTubeId(featuredEvent.url) : null;
    const analytics = (workData as any).weeklyAnalytics;

    const TABS: { id: Tab; label: string }[] = [
        { id: 'CONTENT', label: 'CONTENT' },
        { id: 'PROGRAMMING', label: 'PROGRAMMING' },
        { id: 'OBSESSIONS', label: 'OBSESSIONS' },
    ];

    const weekStatLabels: Record<string, string> = {
        totalViews: 'TOTAL VIEWS',
        subsGained: 'SUBS GAINED',
        totalWatchTime: 'WATCH TIME',
        avgCTR: 'AVG CTR',
        streamsPublished: 'STREAMS',
        shortsPublished: 'SHORTS',
        videosPublished: 'VIDEOS',
        impressions: 'IMPRESSIONS',
    };
    const statColors = ['#FF2E63', '#00E5FF', '#CCFF00', '#FF2E63', '#00E5FF', '#CCFF00', '#888888', '#555555'];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── HEADER ── */}
                <div className="mb-16">
                    <h1 className="text-6xl md:text-9xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        THE WORK
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl text-gray-400 max-w-2xl">
                        What I make, how I make it, and everything fueling it.
                    </p>
                </div>

                {/* ── TABS ── */}
                <div className="flex items-end border-b border-white/10 mb-16">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-8 py-4 transition-colors duration-300"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: '1.05rem',
                                letterSpacing: '0.08em',
                                color: activeTab === tab.id ? '#FFFFFF' : '#555555',
                            }}
                        >
                            {tab.label}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                                style={{ backgroundColor: activeTab === tab.id ? '#FF2E63' : 'transparent' }}
                            />
                        </button>
                    ))}
                </div>

                {/* ════════════ CONTENT TAB ════════════ */}
                {activeTab === 'CONTENT' && (
                    <div>
                        <section className="mb-20">

                            {/* Featured video embed */}
                            {featuredEvent && (
                                <div className="mb-10">
                                    <div className="text-xs text-gray-600 tracking-widest font-mono mb-6">FEATURED VIDEO</div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div>
                                            <div className="aspect-video bg-white/5 border border-white/20 overflow-hidden mb-4">
                                                {embedId ? (
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${embedId}`}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <a href={featuredEvent.url} target="_blank" rel="noopener noreferrer"
                                                           className="text-sm text-gray-500 hover:text-white transition-colors tracking-widest font-mono">
                                                            WATCH ON {featuredEvent.platform.toUpperCase()} ↗
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-600 font-mono mb-1">{featuredEvent.category.toUpperCase()} · {featuredEvent.platform.toUpperCase()}</div>
                                            <h2 className="text-3xl font-black mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{featuredEvent.title}</h2>
                                            <div className="text-xs text-gray-600 font-mono">
                                                {new Date(featuredEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>

                                        {/* Weekly stats */}
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-xs text-gray-600 tracking-widest font-mono">WEEKLY PERFORMANCE</div>
                                                <div className="text-xs text-gray-700 font-mono">{analytics.weekLabel}</div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {Object.entries(analytics.stats as Record<string, string | number>).map(([key, val], idx) => (
                                                    <div key={key} className="border border-white/20 p-4 hover:border-white/30 transition-colors duration-300">
                                                        <div className="text-xs text-gray-600 font-mono mb-1">{weekStatLabels[key] ?? key.toUpperCase()}</div>
                                                        <div className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: statColors[idx] }}>
                                                            {String(val)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Charts */}
                            <div className="border border-white/20 p-8 grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
                                <ContentMixChart data={analytics.contentMix} />
                                <CTRChart data={analytics.ctrBenchmarks} />
                                <TrafficDonut data={analytics.trafficSources} />
                            </div>

                            {/* Creator notes */}
                            <div className="border border-white/20 p-8">
                                <div className="text-xs text-gray-600 tracking-widest font-mono mb-8">CREATOR BREAKDOWN</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { key: 'strategy' as const, label: 'STRATEGY' },
                                        { key: 'strengths' as const, label: 'WHAT WORKED' },
                                        { key: 'improvements' as const, label: "WHAT'S NEXT" },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <div className="text-sm font-black tracking-wider mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#FF2E63' }}>{label}</div>
                                            <p className="text-sm text-gray-400 leading-relaxed">{analytics.creatorNotes[key]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Series */}
                        <section>
                            <div className="text-xs text-gray-600 tracking-widest font-mono mb-8">ACTIVE SERIES</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {workData.series.map(s => (
                                    <button key={s.id} onClick={() => openSeries(s.id)}
                                            className="group text-left border border-white/20 hover:border-[#FF2E63] p-6 transition-all duration-300"
                                            style={{ borderLeftWidth: 3, borderLeftColor: s.color }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {s.platforms.map(p => <span key={p} className="text-xs text-gray-600 font-mono">{p}</span>)}
                                            </div>
                                            <span className="text-xs font-mono" style={{ color: s.color }}>● {s.status}</span>
                                        </div>
                                        <h3 className="text-2xl font-black mb-2 transition-colors duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", color: s.color }}>
                                            {s.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{s.tagline}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                                            <span>OPEN BREAKDOWN</span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* ════════════ PROGRAMMING TAB ════════════ */}
                {activeTab === 'PROGRAMMING' && (
                    <div className="divide-y divide-white/10">
                        {workData.programming.map((project, i) => {
                            const color = ['#FF2E63', '#00E5FF', '#CCFF00', '#2A2A2A'][i] ?? '#FF2E63';
                            const isActive = panelProjectId === project.id && panelMode === 'project';
                            const isLocked = (project as any).locked;
                            return (
                                <button key={project.id} onClick={() => openProject(project.id)}
                                        className="group w-full text-left py-10 flex items-center gap-8 hover:bg-white/2 transition-all duration-300"
                                >
                                    <div className="text-7xl md:text-9xl font-black flex-shrink-0 leading-none transition-colors duration-300"
                                         style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? color : isLocked ? '#1A1A1A' : 'rgba(255,255,255,0.06)' }}>
                                        {project.number}
                                    </div>
                                    <div className="w-28 flex-shrink-0 overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors duration-300" style={{ height: 72 }}>
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: isLocked ? '#080808' : `${color}12` }}>
                                                <span className="text-xs text-gray-800 font-mono tracking-widest">{isLocked ? '???' : 'camry.dev'}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-gray-600 font-mono mb-2">{isLocked ? '???' : project.tags.slice(0, 3).join(' · ')}</div>
                                        <h2 className="text-3xl md:text-4xl font-black mb-2 transition-colors duration-300"
                                            style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? color : isLocked ? '#333333' : '#FFFFFF' }}>
                                            {project.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                                    </div>
                                    <div className="flex-shrink-0 text-gray-700 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300">→</div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ════════════ OBSESSIONS TAB ════════════ */}
                {activeTab === 'OBSESSIONS' && (
                    <div>
                        <div className="text-xs text-gray-600 tracking-widest font-mono mb-8">WHAT DRIVES EVERYTHING I CREATE</div>
                        <div className="border-l-4 border-[#FF2E63] pl-6 mb-16">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                "If you set your goals ridiculously high, and it's a failure, you will fail above everyone else's success."
                            </p>
                            <div className="text-xs text-gray-600 mt-3 font-mono">— THE GUIDING PRINCIPLE</div>
                        </div>
                        <div className="border border-white/20 p-8 md:p-12" style={{ backgroundColor: '#080808' }}>
                            <ObsessionsBoard obsessions={workData.obsessions} />
                        </div>
                    </div>
                )}

            </div>

            <RightPanel mode={panelMode} seriesId={panelSeriesId} projectId={panelProjectId} onClose={closePanel} />
        </div>
    );
}
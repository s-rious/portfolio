'use client';

import React from 'react';
import Link from 'next/link';
import projectsData from '@/data/projects.json';
import partnershipsData from '@/data/partnerships.json';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Pillar {
    label: string;
    body: string;
}

interface Package {
    tier: string;
    name: string;
    price: string;
    deliverable: string;
    color: string;
    ideal?: string;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Label({ children, color }: { children: React.ReactNode; color?: string }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: color ?? 'var(--gray-500)',
        }}>
            {children}
        </span>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Partnerships() {
    const analytics  = projectsData.weeklyAnalytics;
    const data       = partnershipsData as any;
    const hero       = data.hero       as { kicker: string; title: string; subtitle: string };
    const pitch      = data.pitch      as string | undefined;
    const diff       = data.differentiator as { title: string; body: string; pillars?: Pillar[] };
    const audience   = data.audience   as {
        ageBreakdown: { label: string; value: number }[];
        geo:          { label: string; value: number }[];
        platforms:    { name: string; handle: string; metric: string; value: string; url: string }[];
    };
    const packages   = data.packages   as Package[];
    const mediaKitUrl = (data.mediaKitUrl ?? '') as string;

    const pillars = diff.pillars ?? [];
    const hasMediaKit = !!mediaKitUrl;
    const hasAudienceData = audience.ageBreakdown.some((s: any) => s.value > 0);

    const statLabels: Record<string, string> = {
        totalViews:    'WEEKLY VIEWS',
        subsGained:    'SUBS GAINED',
        totalWatchTime:'WATCH TIME',
        avgCTR:        'AVG CTR',
        impressions:   'IMPRESSIONS',
    };
    const statContext: Record<string, string> = {
        totalViews:    'This week',
        subsGained:    'This week',
        totalWatchTime:'This week',
        avgCTR:        '4% platform avg',
        impressions:   'This week',
    };
    const statColors = ['var(--red)', '#FF2E63', '#00E5FF', '#CCFF00', 'var(--white)'];
    const pillarColors = ['var(--red)', '#00E5FF', '#CCFF00', 'var(--white)'];
    const platformColors = ['var(--red)', '#9B59B6', 'var(--gray-400)'];

    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh' }}>

            {/* ── HERO ── */}
            <div style={{ padding: '10rem 6vw 6rem', borderBottom: '1px solid var(--gray-800)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <Label>{hero.kicker}</Label>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(4rem, 13vw, 11rem)',
                        lineHeight: 0.88,
                        letterSpacing: '-0.01em',
                        margin: '1rem 0',
                    }}>
                        {hero.title}
                    </h1>
                    <div style={{ width: '8rem', height: '4px', background: 'var(--red)', marginBottom: '2.5rem' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'end' }}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.3rem',
                            color: 'var(--gray-200)',
                            maxWidth: '680px',
                            lineHeight: 1.65,
                        }}>
                            {hero.subtitle}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
                            <a
                                href="mailto:him@camry.dev?subject=Partnership%20Inquiry"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.16em',
                                    padding: '0.9rem 1.6rem',
                                    background: 'var(--red)',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                    display: 'block',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                EMAIL ME →
                            </a>
                            <Link
                                href="/contact"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.16em',
                                    padding: '0.9rem 1.6rem',
                                    border: '1px solid var(--gray-700)',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                    display: 'block',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                USE THE FORM ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MEDIA KIT STRIP ── */}
            <div style={{ background: 'var(--gray-900)', borderTop: '1px solid var(--gray-800)', borderBottom: '1px solid var(--gray-800)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ width: '4px', height: '3rem', background: 'var(--red)', flexShrink: 0 }} />
                        <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gray-500)', textTransform: 'uppercase' as const, marginBottom: '0.25rem' }}>
                                Partnership Resource
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1 }}>
                                DOWNLOAD THE MEDIA KIT
                            </div>
                        </div>
                    </div>
                    {hasMediaKit ? (
                        <a
                            href={mediaKitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.16em', padding: '0.9rem 2rem', background: 'var(--red)', color: 'var(--white)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'block', textAlign: 'center' as const }}
                        >
                        MEDIA KIT ↓
                        </a>
                        ) : (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--gray-600)', border: '1px solid var(--gray-700)', padding: '0.9rem 2rem', whiteSpace: 'nowrap' }}>
                    COMING SOON
                </span>
                )}
            </div>
        </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

                {/* ── BY THE NUMBERS ── */}
                <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gray-800)' }}>
                    <Label>Weekly analytics - {analytics.weekLabel}</Label>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '0.03em',
                        margin: '0.6rem 0 3rem',
                        lineHeight: 0.95,
                    }}>
                        BY THE NUMBERS
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--gray-800)', marginBottom: '2rem' }}>
                        {Object.entries(analytics.stats).map(([key, val], i) => (
                            <div key={key} style={{ background: 'var(--gray-900)', padding: '2rem 1.5rem' }}>
                                <Label>{statLabels[key] ?? key.toUpperCase()}</Label>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    color: statColors[i % statColors.length],
                                    marginTop: '0.5rem',
                                    lineHeight: 1,
                                }}>
                                    {String(val)}
                                </div>
                                {statContext[key] && (
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gray-600)', marginTop: '0.4rem' }}>
                                        {statContext[key]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--gray-800)' }}>
                        <div style={{ background: 'rgba(232,0,29,0.06)', borderLeft: '3px solid var(--red)', padding: '1.5rem 2rem' }}>
                            <Label color="var(--red)">Why CTR matters</Label>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray-200)', marginTop: '0.5rem', lineHeight: 1.65 }}>
                                A <strong style={{ color: 'var(--red)' }}>{analytics.stats.avgCTR}</strong> CTR means thumbnails earn clicks, above the YouTube platform average of ~4%. Every impression is working harder. Your sponsor placement gets in front of people who actually clicked.
                            </p>
                        </div>
                        <div style={{ background: 'var(--gray-900)', padding: '1.5rem 2rem' }}>
                            <Label>Content this week</Label>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {analytics.contentMix.map((item: any) => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-400)' }}>
                                            {item.label}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gray-600)' }}>
                                                {item.value} published
                                            </span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: item.color }}>
                                                {Number(item.views).toLocaleString()} views
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── THE TRUST ADVANTAGE ── */}
                <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gray-800)' }}>
                    <Label>The differentiator</Label>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '0.03em',
                        margin: '0.6rem 0 2.5rem',
                        lineHeight: 0.95,
                    }}>
                        {diff.title}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '3rem' }}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.25rem',
                            color: 'var(--gray-200)',
                            lineHeight: 1.75,
                        }}>
                            {diff.body}
                        </p>
                        <div style={{ borderLeft: '3px solid var(--red)', paddingLeft: '2rem' }}>
                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                                letterSpacing: '0.02em',
                                color: 'var(--white)',
                                lineHeight: 1.15,
                            }}>
                                &ldquo;Every viewer here chose to be here. That&apos;s not an audience, that&apos;s a community.&rdquo;
                            </p>
                        </div>
                    </div>

                    {pillars.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                            {pillars.map((pillar: Pillar, i: number) => (
                                <div key={pillar.label} style={{ background: 'var(--gray-900)', padding: '2rem' }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.58rem',
                                        letterSpacing: '0.16em',
                                        color: pillarColors[i % pillarColors.length],
                                        marginBottom: '0.75rem',
                                    }}>
                                        {String(i + 1).padStart(2, '0')} - {pillar.label}
                                    </div>
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.95rem',
                                        color: 'var(--gray-400)',
                                        lineHeight: 1.65,
                                    }}>
                                        {pillar.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── AUDIENCE ── */}
                {hasAudienceData && (
                    <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gray-800)' }}>
                        <Label>The audience</Label>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            letterSpacing: '0.03em',
                            margin: '0.6rem 0 3rem',
                            lineHeight: 0.95,
                        }}>
                            WHO&apos;S WATCHING
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>

                            <div>
                                <Label>Age breakdown</Label>
                                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {audience.ageBreakdown.map((seg: any) => (
                                        <div key={seg.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gray-200)' }}>{seg.label}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--red)' }}>{seg.value}%</span>
                                            </div>
                                            <div style={{ height: '3px', background: 'var(--gray-800)' }}>
                                                <div style={{ width: `${seg.value}%`, height: '100%', background: 'var(--red)' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label>Top geos</Label>
                                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {audience.geo.map((seg: any) => (
                                        <div key={seg.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gray-200)' }}>{seg.label}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00E5FF' }}>{seg.value}%</span>
                                            </div>
                                            <div style={{ height: '3px', background: 'var(--gray-800)' }}>
                                                <div style={{ width: `${seg.value}%`, height: '100%', background: '#00E5FF' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label>Platforms</Label>
                                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {audience.platforms.map((p: any, i: number) => (
                                        <a
                                            key={p.name}
                                            href={p.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '1rem 1.25rem',
                                                border: '1px solid var(--gray-800)',
                                                borderLeft: `3px solid ${platformColors[i % platformColors.length]}`,
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.04em' }}>{p.name}</div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--gray-500)', marginTop: '2px' }}>{p.handle}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: platformColors[i % platformColors.length] }}>{p.value}</div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--gray-600)', letterSpacing: '0.1em' }}>{p.metric.toUpperCase()}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── PACKAGES ── */}
                <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--gray-800)' }}>
                    <Label>The offer</Label>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        letterSpacing: '0.03em',
                        margin: '0.6rem 0 3rem',
                        lineHeight: 0.95,
                    }}>
                        PACKAGES
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--gray-800)' }}>
                        {packages.map((pkg: Package) => (
                            <div
                                key={pkg.tier}
                                style={{
                                    background: 'var(--gray-900)',
                                    padding: '2rem 2.5rem',
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr auto',
                                    gap: '2.5rem',
                                    alignItems: 'center',
                                    borderLeft: `3px solid ${pkg.color}`,
                                }}
                            >
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em', color: pkg.color }}>TIER</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: pkg.color, lineHeight: 1 }}>{pkg.tier}</div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.03em', margin: 0 }}>
                                            {pkg.name}
                                        </h3>
                                        {pkg.ideal && (
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gray-600)' }}>
                                                IDEAL FOR: {pkg.ideal}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.6, margin: 0 }}>
                                        {pkg.deliverable}
                                    </p>
                                </div>

                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: pkg.color, lineHeight: 1 }}>
                                        {pkg.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--gray-600)', marginTop: '1.5rem' }}>
                        Starting rates, negotiable. Product gifting and affiliate structures welcome.
                    </p>
                </section>

                {/* ── CTA ── */}
                <section style={{ padding: '6rem 0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'end' }}>
                        <div>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(3rem, 8vw, 7rem)',
                                letterSpacing: '0.02em',
                                lineHeight: 0.9,
                                marginBottom: '1.5rem',
                            }}>
                                LET&apos;S BUILD<br />
                                <span style={{ WebkitTextStroke: '1px var(--white)', WebkitTextFillColor: 'transparent' }}>
                                    SOMETHING.
                                </span>
                            </h2>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.1rem',
                                color: 'var(--gray-400)',
                                maxWidth: '520px',
                                lineHeight: 1.7,
                            }}>
                                Every inquiry gets read. Response within 24–48 hours. No pitches too small, no conversations wasted.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
                            <a
                                href="mailto:him@camry.dev?subject=Partnership%20Inquiry"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.16em',
                                    padding: '1rem 2rem',
                                    background: 'var(--red)',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    textAlign: 'center',
                                }}
                            >
                                HIM@CAMRY.DEV →
                            </a>
                            <Link
                                href="/contact"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.16em',
                                    padding: '1rem 2rem',
                                    border: '1px solid var(--gray-700)',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    textAlign: 'center',
                                }}
                            >
                                CONTACT FORM ↗
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
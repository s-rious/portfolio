'use client';

import Link from 'next/link';
import projectsData from '@/data/projects.json';
import partnershipsData from '@/data/partnerships.json';
import React from 'react';

function Label({ children, color }: { children: React.ReactNode; color?: string }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: color || 'var(--gray-500)',
        }}>
            {children}
        </span>
    );
}

function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.03em',
            margin: '0.6rem 0 2.5rem',
            lineHeight: 0.95,
        }}>
            {children}
        </h2>
    );
}

export default function Partnerships() {
    const analytics = projectsData.weeklyAnalytics;
    const { hero, differentiator, audience, packages } = partnershipsData;

    const mediaKitUrl = (partnershipsData as any).mediaKitUrl as string;
    const hasMediaKit = !!mediaKitUrl;
    const hasAudienceData = audience.ageBreakdown.some(s => s.value > 0);

    return (
        <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '10rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

                {/* HERO */}
                <section style={{ marginBottom: '6rem' }}>
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

                    <div style={{ width: '8rem', height: '4px', background: 'var(--red)', marginBottom: '2rem' }} />

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.3rem',
                        color: 'var(--gray-200)',
                        maxWidth: '720px',
                        lineHeight: 1.6,
                        marginBottom: '2.5rem',
                    }}>
                        {hero.subtitle}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                            }}
                        >
                            USE THE FORM ↗
                        </Link>

                        {hasMediaKit && (
                            <a
                                href={mediaKitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.16em',
                                    padding: '0.9rem 1.6rem',
                                    border: '1px solid var(--gray-700)',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                }}
                            >
                                MEDIA KIT ↓
                            </a>
                        )}
                    </div>
                </section>

                {/* BY THE NUMBERS */}
                <section style={{ marginBottom: '6rem', borderTop: '1px solid var(--gray-800)', paddingTop: '4rem' }}>
                    <Label>The numbers — {analytics.weekLabel}</Label>
                    <H2>BY THE NUMBERS</H2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                        {Object.entries(analytics.stats).map(([key, val], i) => {
                            const labels: Record<string, string> = {
                                totalViews: 'TOTAL VIEWS',
                                subsGained: 'SUBS GAINED',
                                totalWatchTime: 'WATCH TIME',
                                avgCTR: 'AVG CTR',
                                impressions: 'IMPRESSIONS',
                            };
                            const colors = ['var(--red)', '#FF2E63', '#00E5FF', '#CCFF00', 'var(--white)'];

                            return (
                                <div key={key} style={{ background: 'var(--gray-900)', padding: '2rem 1.5rem' }}>
                                    <Label>{labels[key] ?? key.toUpperCase()}</Label>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                                        color: colors[i % colors.length],
                                        marginTop: '0.5rem',
                                        lineHeight: 1,
                                    }}>
                                        {String(val)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', border: '1px solid var(--red)', background: 'rgba(232,0,29,0.05)' }}>
                        <Label color="var(--red)">Why this matters</Label>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--gray-200)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            An average CTR of <strong style={{ color: 'var(--red)' }}>{analytics.stats.avgCTR}</strong> runs more than 2x the YouTube platform average (~4%). Thumbnails earn clicks — and your sponsor placement gets seen.
                        </p>
                    </div>
                </section>

                {/* THE ENGINEER BONUS */}
                <section style={{ marginBottom: '6rem', borderTop: '1px solid var(--gray-800)', paddingTop: '4rem' }}>
                    <Label>The differentiator</Label>
                    <H2>{differentiator.title}</H2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--gray-200)', lineHeight: 1.75, maxWidth: '900px' }}>
                        {differentiator.body}
                    </p>
                </section>

                {/* AUDIENCE — only renders if real data exists */}
                {hasAudienceData && (
                    <section style={{ marginBottom: '6rem', borderTop: '1px solid var(--gray-800)', paddingTop: '4rem' }}>
                        <Label>The audience</Label>
                        <H2>WHO'S WATCHING</H2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                            {/* Age Breakdown */}
                            <div>
                                <Label>Age breakdown</Label>
                                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {audience.ageBreakdown.map(seg => (
                                        <div key={seg.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gray-200)' }}>{seg.label}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--red)' }}>{seg.value}%</span>
                                            </div>
                                            <div style={{ height: '4px', background: 'var(--gray-800)' }}>
                                                <div style={{ width: `${seg.value}%`, height: '100%', background: 'var(--red)' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Geos */}
                            <div>
                                <Label>Top geos</Label>
                                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {audience.geo.map(seg => (
                                        <div key={seg.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gray-200)' }}>{seg.label}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00E5FF' }}>{seg.value}%</span>
                                            </div>
                                            <div style={{ height: '4px', background: 'var(--gray-800)' }}>
                                                <div style={{ width: `${seg.value}%`, height: '100%', background: '#00E5FF' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Platforms */}
                            <div>
                                <Label>Platforms</Label>
                                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {audience.platforms.map(p => (
                                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                                           style={{
                                               display: 'flex',
                                               justifyContent: 'space-between',
                                               alignItems: 'center',
                                               padding: '0.85rem 1rem',
                                               border: '1px solid var(--gray-800)',
                                               textDecoration: 'none',
                                               color: 'inherit',
                                           }}>
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.04em' }}>{p.name}</div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gray-500)' }}>{p.handle}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--red)' }}>{p.value}</div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--gray-600)', letterSpacing: '0.1em' }}>{p.metric.toUpperCase()}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* PACKAGES */}
                <section style={{ marginBottom: '6rem', borderTop: '1px solid var(--gray-800)', paddingTop: '4rem' }}>
                    <Label>The offer</Label>
                    <H2>PACKAGES</H2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--gray-800)' }}>
                        {packages.map(pkg => (
                            <div key={pkg.tier} style={{
                                background: 'var(--gray-900)',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                borderTop: `2px solid ${pkg.color}`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: pkg.color }}>
                                        TIER {pkg.tier}
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: pkg.color }}>
                                        {pkg.price}
                                    </span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.03em', lineHeight: 1.05 }}>
                                    {pkg.name}
                                </h3>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.6, flex: 1 }}>
                                    {pkg.deliverable}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--gray-600)', marginTop: '1.5rem' }}>
                        Rates are starting points. Product gifting and affiliate deals welcome.
                    </p>
                </section>

                {/* FINAL CTA */}
                <section style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '4rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        letterSpacing: '0.02em',
                        lineHeight: 0.9,
                        marginBottom: '2rem',
                    }}>
                        LET&apos;S BUILD<br />
                        <span style={{ WebkitTextStroke: '1px var(--white)', WebkitTextFillColor: 'transparent' }}>SOMETHING.</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'var(--gray-200)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                        Email me directly or use the form. Every inquiry gets read, response within 24-48 hours.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="mailto:him@camry.dev?subject=Partnership%20Inquiry"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                letterSpacing: '0.16em',
                                padding: '0.9rem 1.6rem',
                                background: 'var(--red)',
                                color: 'var(--white)',
                                textDecoration: 'none'
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
                                padding: '0.9rem 1.6rem',
                                border: '1px solid var(--gray-700)',
                                color: 'var(--white)',
                                textDecoration: 'none'
                            }}
                        >
                            CONTACT FORM ↗
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
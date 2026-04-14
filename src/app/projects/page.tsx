'use client';

import projects from '@/data/projects.json';
import { useState, useMemo } from 'react';
import Link from 'next/link';

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

function ProjectCard({ project, selected }: { project: any; selected: boolean }) {
    const [hov, setHov] = useState(false);
    const parseDate = (d: string) => {
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, m - 1, day);
    };

    return (
        <Link
            href={project.link || '#'}
            target={project.link ? '_blank' : undefined}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'block',
                border: `1px solid ${hov ? 'var(--red)' : selected ? 'var(--gray-700)' : 'var(--gray-800)'}`,
                textDecoration: 'none',
                color: 'var(--white)',
                transition: 'border-color 0.25s',
                background: 'var(--gray-900)',
            }}
        >
            {/* Image */}
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: 'var(--gray-800)' }}>
                {project.image ? (
                    <img src={project.image} alt={project.title} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: hov ? 'grayscale(0%)' : 'grayscale(30%)',
                        transform: hov ? 'scale(1.04)' : 'scale(1)',
                        transition: 'filter 0.5s, transform 0.5s',
                        display: 'block',
                    }} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gray-700)' }}>
                        <Label>No Image</Label>
                    </div>
                )}
                {project.featured && (
                    <span style={{
                        position: 'absolute', top: '12px', right: '12px',
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                        letterSpacing: '0.14em', color: 'var(--white)',
                        background: 'var(--red)', padding: '3px 8px',
                    }}>
            FEATURED
          </span>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    letterSpacing: '0.03em',
                    color: hov ? 'var(--red)' : 'var(--white)',
                    transition: 'color 0.2s',
                    marginBottom: '0.5rem',
                }}>
                    {project.title}
                </h3>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--gray-400)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                }}>
                    {project.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.tags?.map((t: string) => (
                            <span key={t} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em',
                                color: selected ? 'var(--red)' : 'var(--gray-500)',
                                border: `1px solid ${selected ? 'var(--red)' : 'var(--gray-800)'}`,
                                padding: '2px 8px', transition: 'border-color 0.2s, color 0.2s',
                            }}>{t}</span>
                        ))}
                    </div>
                    <Label>{parseDate(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</Label>
                </div>
            </div>
        </Link>
    );
}

export default function Projects() {
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const parseDate = (d: string) => {
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, m - 1, day);
    };

    const allTags = useMemo(() => {
        const s = new Set<string>();
        projects.forEach(p => p.tags?.forEach(t => s.add(t)));
        return Array.from(s).sort();
    }, []);

    const sorted = useMemo(() =>
        [...projects].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()), []);

    const filtered = useMemo(() => {
        if (!activeTags.length) return sorted;
        return sorted.filter(p => activeTags.some(t => p.tags?.includes(t)));
    }, [activeTags, sorted]);

    const toggle = (t: string) => setActiveTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)', paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6vw' }}>

                {/* Header */}
                <div style={{ marginBottom: '5rem' }}>
          <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.2em', color: 'var(--gray-500)', display: 'block', marginBottom: '0.75rem',
          }}>
            Work / {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 0.9,
                        marginBottom: '1.5rem',
                    }}>
                        PROJECTS
                    </h1>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--gray-400)', maxWidth: '480px', lineHeight: 1.6 }}>
                        Games, apps, and websites. The public portfolio of what I've shipped.
                    </p>
                </div>

                {/* Filter */}
                <div style={{
                    borderTop: '1px solid var(--gray-800)',
                    borderBottom: '1px solid var(--gray-800)',
                    padding: '1.25rem 0',
                    marginBottom: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                }}>
                    <Label>Filter</Label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {allTags.map(tag => (
                            <button key={tag} onClick={() => toggle(tag)} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
                                padding: '0.4rem 0.9rem',
                                background: activeTags.includes(tag) ? 'var(--red)' : 'transparent',
                                color: activeTags.includes(tag) ? 'var(--white)' : 'var(--gray-400)',
                                border: `1px solid ${activeTags.includes(tag) ? 'var(--red)' : 'var(--gray-700)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}>
                                {tag}
                            </button>
                        ))}
                    </div>
                    {activeTags.length > 0 && (
                        <button onClick={() => setActiveTags([])} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em',
                            background: 'none', border: 'none', color: 'var(--gray-600)', cursor: 'pointer',
                            marginLeft: 'auto', transition: 'color 0.2s',
                        }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-600)')}
                        >
                            CLEAR ALL ×
                        </button>
                    )}
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div style={{
                        border: '1px solid var(--gray-800)', padding: '4rem',
                        textAlign: 'center',
                        fontFamily: 'var(--font-body)', color: 'var(--gray-500)',
                    }}>
                        No projects match the selected filters.
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '1px',
                        background: 'var(--gray-800)',
                    }}>
                        {filtered.map(p => (
                            <ProjectCard
                                key={p.id}
                                project={p}
                                selected={activeTags.some(t => p.tags?.includes(t))}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
'use client';

import projects from '@/data/projects.json';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function Projects() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day)
    }

    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            project.tags?.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, []);

    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) =>
            parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime()
        );
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return sortedProjects;
        return sortedProjects.filter(project =>
            selectedTags.some(tag => project.tags?.includes(tag))
        );
    }, [selectedTags, sortedProjects]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearTags = () => setSelectedTags([]);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <h1
                        className="text-6xl md:text-9xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        PROJECTS
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl text-gray-400 max-w-2xl">
                        My publicized collection of games, apps, and websites.
                    </p>
                </div>

                {/* Filter Tags */}
                <div className="mb-12 pb-8 border-b border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2
                            className="text-2xl font-black"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            FILTER BY TAG
                        </h2>
                        {selectedTags.length > 0 && (
                            <button
                                onClick={clearTags}
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                CLEAR ALL
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-2 text-sm transition-all duration-300 ${
                                    selectedTags.includes(tag)
                                        ? 'bg-[#FF2E63] text-white border-2 border-[#FF2E63]'
                                        : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/30'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    {selectedTags.length > 0 && (
                        <p className="text-sm text-gray-600 mt-4">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                        </p>
                    )}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="border border-white/20 p-12 text-center">
                        <p className="text-gray-500">No projects match your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link || '#'}
                                target={project.link ? '_blank' : undefined}
                                className="group border border-white/20 hover:border-[#FF2E63] transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-white/5 overflow-hidden relative">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">💻</div>
                                                <div className="text-xs text-gray-600">[PROJECT IMAGE]</div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-[#FF2E63]/0 group-hover:bg-[#FF2E63]/10 transition-colors duration-300" />

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-[#FF2E63] text-white text-xs font-black">
                                            FEATURED
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2
                                        className="text-2xl font-black mb-3 group-hover:text-[#FF2E63] transition-colors"
                                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                    >
                                        {project.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags?.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 text-xs ${
                                                    selectedTags.includes(tag)
                                                        ? 'bg-[#FF2E63]/20 text-[#FF2E63] border border-[#FF2E63]'
                                                        : 'bg-white/5 border border-white/10 text-gray-500'
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Date */}
                                    <div className="text-xs text-gray-600">
                                        {parseLocalDate(project.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                        }
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
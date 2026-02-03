'use client';

import projects from '@/data/projects.json';
import { useState, useMemo } from 'react';

export default function Projects() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, []);

    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return {
                featured: sortedProjects.filter(p => p.featured),
                other: sortedProjects.filter(p => !p.featured)
            };
        }

        const matching = sortedProjects.filter(project =>
            selectedTags.some(tag => project.tags.includes(tag))
        );
        const nonMatching = sortedProjects.filter(project =>
            !selectedTags.some(tag => project.tags.includes(tag))
        );

        return {
            featured: matching,
            other: nonMatching
        };
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
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-6xl mx-auto">
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden mb-8">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-brand-secondary"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/projects
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            {sortedProjects.length} PROJECTS
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Title */}
                        <div className="mb-12">
                            <h1 className="text-5xl md:text-6xl font-bold mb-3 font-inter text-white">
                                Projects
                            </h1>
                        </div>

                        {/* Tag Filter */}
                        <div className="mb-12 pb-8 border-b border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm text-gray-500 font-mono uppercase">
                                    $ filter --by-tag
                                </h2>
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={clearTags}
                                        className="text-xs text-brand-secondary hover:text-brand-accent font-mono transition-colors duration-300"
                                    >
                                        CLEAR_ALL
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                                            selectedTags.includes(tag)
                                                ? 'bg-brand-primary text-black border-2 border-brand-primary shadow-lg shadow-brand-primary/50'
                                                : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-brand-primary/50 hover:text-white'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            {selectedTags.length > 0 && (
                                <p className="text-xs text-gray-500 font-mono mt-4">
                                    {filteredProjects.featured.length} matching project{filteredProjects.featured.length !== 1 ? 's' : ''} found
                                </p>
                            )}
                        </div>

                        {/* Featured */}
                        {filteredProjects.featured.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-sm text-gray-500 font-mono uppercase mb-6 flex items-center gap-2">
                                    <span className="text-brand-secondary">★</span>
                                    {selectedTags.length > 0 ? 'SELECTED PROJECTS' : 'FEATURED PROJECTS'}
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {filteredProjects.featured.map((project) => (
                                        <div
                                            key={project.id}
                                            className="relative bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 backdrop-blur-sm border-2 border-brand-secondary/30 rounded-lg p-6 hover:border-brand-secondary/60 hover:shadow-xl hover:shadow-brand-secondary/20 transition-all duration-300 group"
                                        >
                                            {!selectedTags.length && project.featured && (
                                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                                                    <span className="text-white text-lg">★</span>
                                                </div>
                                            )}

                                            {/* Project image with fallback */}
                                            {project.image && (
                                                <div className="mb-4 rounded-lg overflow-hidden border border-white/10 h-40">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.parentElement!.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <h3 className="text-2xl font-bold text-white mb-3 font-inter group-hover:text-brand-secondary transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 font-sans leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-3 py-1 rounded text-xs font-mono ${
                                                            selectedTags.includes(tag)
                                                                ? 'bg-brand-primary text-black'
                                                                : 'bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary'
                                                        }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent font-mono text-sm transition-colors duration-300"
                                                >
                                                    <span>VIEW_PROJECT</span>
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Other / All */}
                        {filteredProjects.other.length > 0 && (
                            <div>
                                <h2 className="text-sm text-gray-500 font-mono uppercase mb-6">
                                    {selectedTags.length > 0 ? 'OTHER PROJECTS' : 'ALL PROJECTS'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredProjects.other.map((project, index) => (
                                        <div
                                            key={project.id}
                                            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-brand-primary/50 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="absolute -left-3 top-6 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-black text-xs font-bold font-mono">
                                                {index + 1}
                                            </div>

                                            {project.image && (
                                                <div className="mb-4 rounded-lg overflow-hidden border border-white/10 h-40">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.parentElement!.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <h3 className="text-2xl font-bold text-white mb-3 font-inter group-hover:text-brand-primary transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 font-sans leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded text-xs font-mono"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-mono text-sm transition-colors duration-300"
                                                >
                                                    <span>VIEW_PROJECT</span>
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty state */}
                        {selectedTags.length > 0 && filteredProjects.featured.length === 0 && filteredProjects.other.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 font-mono">$ No projects found with selected tags</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
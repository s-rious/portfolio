'use client';

export const runtime = 'edge';

import projects from '@/data/projects.json';
import { useState, useMemo } from 'react';

export default function Projects() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags from projects
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, []);

    // Sort by date, newest first
    const sortedProjects = [...projects].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return {
                featured: sortedProjects.filter(p => p.featured),
                other: sortedProjects.filter(p => !p.featured)
            };
        }

        const matchingProjects = sortedProjects.filter(project =>
            selectedTags.some(tag => project.tags.includes(tag))
        );
        const nonMatchingProjects = sortedProjects.filter(project =>
            !selectedTags.some(tag => project.tags.includes(tag))
        );

        return {
            featured: matchingProjects,
            other: nonMatchingProjects
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
                {/* Terminal Container */}
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden mb-8">
                    {/* Terminal Header */}
                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#F87171]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#14B8A6]"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/projects
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            {sortedProjects.length} PROJECTS
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-8 md:p-12">
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
                                        className="text-xs text-[#F87171] hover:text-[#F59E0B] font-mono transition-colors duration-300"
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
                                                ? 'bg-[#14B8A6] text-black border-2 border-[#14B8A6] shadow-lg shadow-[#14B8A6]/50'
                                                : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:border-[#14B8A6]/50 hover:text-white'
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

                        {/* Featured/Selected Projects */}
                        {filteredProjects.featured.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-sm text-gray-500 font-mono uppercase mb-6 flex items-center gap-2">
                                    <span className="text-[#F87171]">★</span>
                                    {selectedTags.length > 0 ? 'SELECTED PROJECTS' : 'FEATURED PROJECTS'}
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {filteredProjects.featured.map((project) => (
                                        <div
                                            key={project.id}
                                            className="relative bg-gradient-to-br from-[#14B8A6]/10 via-[#F87171]/10 to-[#F59E0B]/10 backdrop-blur-sm border-2 border-[#F87171]/30 rounded-lg p-6 hover:border-[#F87171]/60 hover:shadow-xl hover:shadow-[#F87171]/20 transition-all duration-300 group"
                                        >
                                            {/* Featured Badge */}
                                            {!selectedTags.length && project.featured && (
                                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#F87171] rounded-full flex items-center justify-center">
                                                    <span className="text-white text-lg">★</span>
                                                </div>
                                            )}

                                            <h3 className="text-2xl font-bold text-white mb-3 font-inter group-hover:text-[#F87171] transition-colors duration-300">
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
                                                                ? 'bg-[#14B8A6] text-black'
                                                                : 'bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171]'
                                                        }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.link && (

                                                <a href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[#F87171] hover:text-[#F59E0B] font-mono text-sm transition-colors duration-300"
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

                        {/* All Projects / Other Projects */}
                        {filteredProjects.other.length > 0 && (
                            <div>
                                <h2 className="text-sm text-gray-500 font-mono uppercase mb-6">
                                    {selectedTags.length > 0 ? 'OTHER PROJECTS' : 'ALL PROJECTS'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredProjects.other.map((project, index) => (
                                        <div
                                            key={project.id}
                                            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-[#14B8A6]/50 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            {/* Project Number */}
                                            <div className="absolute -left-3 top-6 w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center text-black text-xs font-bold font-mono">
                                                {index + 1}
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-3 font-inter group-hover:text-[#14B8A6] transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 font-sans leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] rounded text-xs font-mono"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.link && (

                                                <a href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[#14B8A6] hover:text-[#F59E0B] font-mono text-sm transition-colors duration-300"
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

                        {/* No Results */}
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
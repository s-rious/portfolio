'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';

export default function Home() {
    // Terminal conversation state
    const [conversationLines, setConversationLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentLineText, setCurrentLineText] = useState('');

    // Typing Section State
    const [displayText, setDisplayText] = useState('');
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const fullText = 'Developing Projects To Shape a Better World';

    // Horizontal scroll state
    const [scrollProgress, setScrollProgress] = useState(0);
    const projectsSectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Load featured projects from JSON
    const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

    useEffect(() => {
        import('@/data/projects.json').then((data) => {
            const featured = data.default.filter((p: any) => p.featured).slice(0, 3);
            setFeaturedProjects(featured);
        });
    }, []);

    const conversation = [
        { role: 'USER', text: 'CAMRY is a software developer, isnt he?' },
        { role: 'SYSTEM', text: 'CAMRY is a software engineer alongside electrical engineer.' },
        { role: 'USER', text: 'Thats pretty fascinating! He must be really fascinated with creative works as a whole!' },
        { role: 'SYSTEM', text: 'That is true. He is overjoyed with the ability to create art fabricated from his fingertips alone.' },
        { role: 'USER', text: 'Is there any more to know about him?' },
        { role: 'SYSTEM', text: "I'm sure this project of his is riddled with them. But hush now, as I fear the audience might be able to sense the conversation we are having." },
    ];

    // Convert text to morse code
    const textToMorse = (text: string) => {
        const morseMap: { [key: string]: string } = {
            'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
            'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
            'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
            's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
            'y': '-.--', 'z': '--..', ' ': '/'
        };
        return text.toLowerCase().split('').map(char => morseMap[char] || char).join(' ');
    };

    // Terminal conversation typing animation
    useEffect(() => {
        if (currentLineIndex >= conversation.length) return;

        const currentLine = conversation[currentLineIndex];
        const fullLine = `${currentLine.role}: ${textToMorse(currentLine.text)}`;

        let charIndex = 0;
        const interval = setInterval(() => {
            if (charIndex <= fullLine.length) {
                setCurrentLineText(fullLine.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(interval);
                setConversationLines(prev => [...prev, fullLine]);
                setCurrentLineText('');
                setCurrentLineIndex(prev => prev + 1);
            }
        }, 15);

        return () => clearInterval(interval);
    }, [currentLineIndex]);

    // Typing animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let index = 0;
                    const interval = setInterval(() => {
                        if (index <= fullText.length) {
                            setDisplayText(fullText.slice(0, index));
                            index++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 50);

                    return () => clearInterval(interval);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    // Improved horizontal scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (!projectsSectionRef.current || !scrollContainerRef.current) return;

            const section = projectsSectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                const scrollableHeight = rect.height - windowHeight;
                const progress = Math.abs(rect.top) / scrollableHeight;

                setScrollProgress(Math.min(Math.max(progress, 0), 1));
            } else if (rect.top > 0) {
                setScrollProgress(0);
            } else if (rect.bottom < windowHeight) {
                setScrollProgress(1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [featuredProjects]);

    const languages = [
        {
            name: 'JavaScript',
            color: siteConfig.theme.colors.accent,
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#F7DF1E"/>
                    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000"/>
                </svg>
            )
        },
        {
            name: 'C#',
            color: siteConfig.theme.colors.primary,
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#239120"/>
                    <path d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm33.474 182.462c-5.553 5.553-13.066 8.515-21.088 8.515-16.481 0-29.897-13.416-29.897-29.897 0-8.022 2.962-15.535 8.515-21.088 5.553-5.553 13.066-8.515 21.088-8.515s15.535 2.962 21.088 8.515c5.553 5.553 8.515 13.066 8.515 21.088 0 8.022-2.962 15.535-8.515 21.088z" fill="#FFF"/>
                </svg>
            )
        },
        {
            name: 'C++',
            color: siteConfig.theme.colors.primary,
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#00599C"/>
                    <path d="M180.828 77.106l-60.414-34.882c-5.423-3.132-12.1-3.132-17.522 0L42.478 77.106c-5.423 3.132-8.761 8.914-8.761 15.164v69.764c0 6.25 3.338 12.032 8.761 15.164l60.414 34.882c5.423 3.132 12.1 3.132 17.522 0l60.414-34.882c5.423-3.132 8.761-8.914 8.761-15.164V92.27c0-6.25-3.338-12.032-8.761-15.164z" fill="#FFF"/>
                </svg>
            )
        },
        {
            name: 'React',
            color: siteConfig.theme.colors.primary,
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#222"/>
                    <path d="M210.483 73.824c-2.646-1.434-5.31-2.754-7.986-3.98-48.372-22.463-102.414-22.463-150.786 0-2.676 1.226-5.34 2.546-7.986 3.98C24.52 84.37 13.103 98.74 13.103 114.49c0 15.748 11.417 30.12 30.622 40.666 2.646 1.433 5.31 2.753 7.986 3.98 48.372 22.462 102.414 22.462 150.786 0 2.676-1.227 5.34-2.547 7.986-3.98 19.205-10.546 30.622-24.918 30.622-40.666 0-15.75-11.417-30.12-30.622-40.666zM128 163.125c-26.878 0-48.625-21.747-48.625-48.625S101.122 65.875 128 65.875s48.625 21.747 48.625 48.625-21.747 48.625-48.625 48.625z" fill="#61DAFB"/>
                    <circle cx="128" cy="114.5" r="23.375" fill="#61DAFB"/>
                </svg>
            )
        },
        {
            name: 'HTML/CSS',
            color: siteConfig.theme.colors.secondary,
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#E34F26"/>
                    <path d="M41 25l18.5 208L128 256l68.5-23L215 25H41zm151.5 165.7L128 213.5l-64.5-22.8-4.5-50.4h31.6l2.3 25.5 35.1 9.5 35.1-9.5 3.6-40.7H85.5l-2.3-26.3h94.6l2.4-27.5H67.8l-2.4-26.3h125.3l-2.5 28.3z" fill="#FFF"/>
                </svg>
            )
        },
    ];

    const getTransformValue = () => {
        if (!scrollContainerRef.current) return 0;

        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const containerWidth = projectsSectionRef.current?.clientWidth || window.innerWidth;

        const maxScroll = Math.max(scrollWidth - containerWidth, 0);
        return scrollProgress * maxScroll;
    };


    return (
        <div className="scroll-smooth bg-[#0f0e0d]">
            <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f0e0d] px-6 pt-20">
                <div className="relative w-full max-w-6xl h-[80vh] bg-black rounded-lg border border-white shadow-2xl overflow-hidden">
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <div className="w-3 h-3 rounded-full bg-brand-secondary"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                    </div>

                    <div className="absolute inset-0 p-6 pt-12 font-mono text-white text-sm opacity-20 overflow-auto select-none leading-loose">
                        {conversationLines.map((line, i) => (
                            <div key={i} className="mb-2">{line}</div>
                        ))}
                        {currentLineText && <div className="mb-2">{currentLineText}</div>}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
                        <div className="text-center">
                            <h1
                                className="
    text-5xl md:text-7xl font-bold mb-4 font-inter
    bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent
    bg-[length:200%_auto]
    animate-gradient
    bg-clip-text text-transparent
  "
                            >
                                {siteConfig.siteName}
                            </h1>

                            <p className="text-xl md:text-2xl text-white font-inter">
                                {siteConfig.tagline}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={sectionRef} className="min-h-[60vh] bg-[#0f0e0d] flex flex-col items-center justify-center px-6 py-12">
                <div className="min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center max-w-5xl font-inter leading-tight"
                        style={{ textShadow: '-4px 4px 8px rgba(0, 0, 0, 0.6)' }}
                    >
                        {displayText}
                        <span className="animate-blink-slow">|</span>
                    </h2>
                </div>
                <div className="mt-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        {languages.map((lang) => (
                            <div
                                key={lang.name}
                                className="px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer font-inter flex items-center gap-3"
                                style={{
                                    borderColor: lang.color,
                                    backgroundColor: 'rgba(15, 14, 13, 0.8)'
                                }}
                            >
                                {lang.logo}
                                <span className="text-white font-semibold text-base">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={projectsSectionRef} className="relative h-[300vh] bg-[#0f0e0d]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 px-8 transition-transform duration-100 ease-out will-change-transform"
                        style={{
                            transform: `translateX(-${getTransformValue()}px)`
                        }}
                    >
                        <div className="flex-shrink-0 w-[90vw] md:w-[600px] flex flex-col justify-center px-12">
                            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 font-inter">
                                Featured Projects
                            </h2>
                            <p className="text-xl text-gray-400 font-inter leading-relaxed">
                                Explore my most important projects, ranging from video games to mobile applications.
                            </p>
                        </div>

                        {featuredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex-shrink-0 w-[90vw] md:w-[600px] bg-[#1a1816] rounded-lg overflow-hidden shadow-2xl"
                            >
                                <div className="h-64 md:h-80 bg-gray-700 flex items-center justify-center text-gray-400 font-inter text-xl">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-inter">{project.title}</h3>
                                    <p className="text-gray-300 mb-6 font-inter text-lg leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-inter"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={project.link || `/projects/${project.id}`}
                                        className="inline-block px-8 py-3 bg-brand-secondary text-white font-medium rounded-md hover:bg-[#EF4444] transition-colors font-inter text-lg"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-[#0f0e0d] py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/contact"
                        className="inline-block text-5xl md:text-7xl font-bold font-inter relative group cursor-pointer"
                    >
                        <span className="relative z-10 bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] animate-gradient-shine group-hover:animate-none bg-clip-text text-transparent transition-all duration-700">
                            Wanna get in touch?
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                            Wanna get in touch?
                        </span>
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center rounded-full"></span>
                        <span className="absolute inset-0 blur-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
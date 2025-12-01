'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';


export default function Home() {
    // Terminal morse code state
    const [morseCode, setMorseCode] = useState('> ');

    // Typing Section State
    const [displayText, setDisplayText] = useState('');
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const fullText = 'Developing Projects To Shape a Better World';

    // Horizontal scroll state
    const [scrollProgress, setScrollProgress] = useState(0);
    const projectsSectionRef = useRef<HTMLDivElement>(null);

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

    // Terminal morse code typing animation
    useEffect(() => {
        const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        const morse = '> ' + textToMorse(loremIpsum);

        let index = 2;
        const interval = setInterval(() => {
            if (index <= morse.length) {
                setMorseCode(morse.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);
    }, []);

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

    // Horizontal scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (!projectsSectionRef.current) return;

            const section = projectsSectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= 0 && rect.bottom > windowHeight) {
                const progress = Math.abs(rect.top) / (rect.height - windowHeight);
                setScrollProgress(Math.min(progress, 1));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const languages = [
        {
            name: 'JavaScript',
            color: '#F7DF1E',
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#F7DF1E"/>
                    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000"/>
                </svg>
            )
        },
        {
            name: 'C#',
            color: '#239120',
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#239120"/>
                    <path d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm33.474 182.462c-5.553 5.553-13.066 8.515-21.088 8.515-16.481 0-29.897-13.416-29.897-29.897 0-8.022 2.962-15.535 8.515-21.088 5.553-5.553 13.066-8.515 21.088-8.515s15.535 2.962 21.088 8.515c5.553 5.553 8.515 13.066 8.515 21.088 0 8.022-2.962 15.535-8.515 21.088z" fill="#FFF"/>
                </svg>
            )
        },
        {
            name: 'C++',
            color: '#00599C',
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#00599C"/>
                    <path d="M180.828 77.106l-60.414-34.882c-5.423-3.132-12.1-3.132-17.522 0L42.478 77.106c-5.423 3.132-8.761 8.914-8.761 15.164v69.764c0 6.25 3.338 12.032 8.761 15.164l60.414 34.882c5.423 3.132 12.1 3.132 17.522 0l60.414-34.882c5.423-3.132 8.761-8.914 8.761-15.164V92.27c0-6.25-3.338-12.032-8.761-15.164z" fill="#FFF"/>
                </svg>
            )
        },
        {
            name: 'React',
            color: '#61DAFB',
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
            color: '#E34F26',
            logo: (
                <svg viewBox="0 0 256 256" className="w-10 h-10">
                    <rect width="256" height="256" fill="#E34F26"/>
                    <path d="M41 25l18.5 208L128 256l68.5-23L215 25H41zm151.5 165.7L128 213.5l-64.5-22.8-4.5-50.4h31.6l2.3 25.5 35.1 9.5 35.1-9.5 3.6-40.7H85.5l-2.3-26.3h94.6l2.4-27.5H67.8l-2.4-26.3h125.3l-2.5 28.3z" fill="#FFF"/>
                </svg>
            )
        },
    ];

    const featuredProjects = [
            {
                "id": 1,
                "title": "WORD ESCAPE",
                "description": "My first installation of game development: a story-based puzzle game.",
                "date": "2023-04-04",
                "tags": ["C#", "Unreal Engine 5"],
                "image": "/projects/ecommerce.jpg",
                "link": "https://github.com/s-rious/Word-Escape",
                "featured": true
            },
            {
                "id": 2,
                "title": "STITCHED UP",
                "description": "A dark narrative revolving around the concept of self-identity and depression",
                "date": "2025-01-01",
                "tags": ["C#", "Engine Engine 5"],
                "image": "/projects/portfolio.jpg",
                "link": "https://github.com/s-rious/stitched-up",
                "featured": true
            },
        {
            id: 3,
            title: 'Language Learning App',
            description: 'Mobile application for learning new languages with AI-powered pronunciation feedback.',
            tags: ['Mobile', 'AI/ML'],
            image: '/placeholder-project-3.jpg'
        },
    ];

    return (
        <div className="scroll-smooth bg-[#1a1816]">
            {/* Hero Section - Terminal */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1816] px-6 pt-20">
                <div className="relative w-full max-w-6xl h-[80vh] bg-black rounded-lg border border-white shadow-2xl overflow-hidden">
                    {/* Mac-style window buttons */}
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* Morse code background */}
                    <div className="absolute inset-0 p-6 pt-12 font-mono text-white text-xs opacity-20 overflow-hidden select-none leading-relaxed break-all">
                        {morseCode}
                    </div>

                    {/* Main content centered */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
                        <div className="text-center">
                            <h1
                                className="text-5xl md:text-7xl font-bold mb-4 font-inter bg-gradient-to-r from-[#2d5a3d] via-[#c54545] to-[#2d5a3d] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent"
                            >
                                CAMRY.DEV
                            </h1>
                            <p className="text-xl md:text-2xl text-white font-inter">
                                Full-Stack Software Engineer, Studying Electrical Engineering
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Typing Section */}
            <div ref={sectionRef} className="min-h-[60vh] bg-[#1a1816] flex flex-col items-center justify-center px-6 py-12">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center max-w-5xl font-inter leading-tight mb-8">
                    {displayText}
                    <span className="animate-pulse">|</span>
                </h2>

                {/* Language Boxes - Close to typing text */}
                <div className="mt-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        {languages.map((lang) => (
                            <div
                                key={lang.name}
                                className="px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer font-inter flex items-center gap-3"
                                style={{
                                    borderColor: lang.color,
                                    backgroundColor: 'rgba(26, 24, 22, 0.8)'
                                }}
                            >
                                {lang.logo}
                                <span className="text-white font-semibold text-base">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Projects - Horizontal Scroll */}
            <div ref={projectsSectionRef} className="relative h-[300vh] bg-[#1a1816]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16">
                    <div
                        className="flex gap-8 px-8 transition-transform duration-100 ease-out"
                        style={{
                            transform: `translateX(-${scrollProgress * 66.666}%)`
                        }}
                    >
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="flex-shrink-0 w-[90vw] md:w-[600px] bg-[#2a2726] rounded-lg overflow-hidden shadow-2xl"
                            >
                                <div className="h-64 md:h-80 bg-gray-700 flex items-center justify-center text-gray-400 font-inter text-xl">
                                    Project Image
                                </div>
                                <div className="p-8">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-inter">{project.title}</h3>
                                    <p className="text-gray-300 mb-6 font-inter text-lg leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-[#2d5a3d] text-white rounded-full text-sm font-inter"
                                            >
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/projects/${project.link}`}
                                        className="inline-block px-8 py-3 bg-[#c54545] text-white font-medium rounded-md hover:bg-[#a33838] transition-colors font-inter text-lg"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-[#1a1816] py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/contact"
                        className="inline-block text-5xl md:text-7xl font-bold text-white font-inter relative overflow-hidden group transition-all duration-500"
                    >
                        <span className="relative z-10">Wanna get in touch?</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c5a545] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-50"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
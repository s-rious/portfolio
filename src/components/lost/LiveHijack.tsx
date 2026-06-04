'use client';

import { useEffect, useState } from 'react';

const BROKEN_FRAGMENTS = [
    "don't look away",
    'he sees you',
    'GET OUT',
    'transmission_live',
    'the door is open',
    'WHILE YOU STILL CAN',
    'something is wrong',
    '@s_rious',
    'broadcasting_now',
    "don't blink",
    'TUNE IN',
    '%%%%%%',
    '404_safety_not_found',
    '█▓▒░ LIVE ░▒▓█',
    'do not refresh',
];

interface LiveHijackProps {
    twitchUrl: string;
}

export default function LiveHijack({ twitchUrl }: LiveHijackProps) {
    const [fragments, setFragments] = useState<
        Array<{ text: string; x: number; y: number; key: number }>
    >([]);
    const [pulse, setPulse] = useState(false);

    // Broken text fragments cycle in/out at random positions
    useEffect(() => {
        let counter = 0;
        const spawn = () => {
            counter += 1;
            const text =
                BROKEN_FRAGMENTS[Math.floor(Math.random() * BROKEN_FRAGMENTS.length)];
            const x = Math.random() * 80 + 5;
            const y = Math.random() * 80 + 5;
            setFragments((prev) => [...prev.slice(-5), { text, x, y, key: counter }]);
        };
        spawn();
        const interval = setInterval(spawn, 700);
        return () => clearInterval(interval);
    }, []);

    // Red background pulse — 350ms cycle = present but not seizure-territory
    useEffect(() => {
        const interval = setInterval(() => setPulse((p) => !p), 350);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
            style={{
                fontFamily: '"VT323", "DM Mono", monospace',
                background: pulse ? '#1A0008' : '#080000',
                transition: 'background 0.15s',
            }}
        >
            {/* Heavy static */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' /></svg>\")",
                    animation: 'lore-noise 0.12s steps(2) infinite',
                }}
            />

            {/* Red flash overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'rgba(255, 0, 51, 0.18)',
                    opacity: pulse ? 1 : 0.4,
                    transition: 'opacity 0.15s',
                }}
            />

            {/* Scanlines */}
            <div
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(0,0,0,0.7) 0px, rgba(0,0,0,0.7) 1px, transparent 1px, transparent 3px)',
                }}
            />

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
                }}
            />

            {/* Floating broken fragments */}
            {fragments.map((f) => (
                <div
                    key={f.key}
                    className="pointer-events-none absolute text-xs md:text-sm tracking-widest opacity-50"
                    style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        color: '#FF0033',
                        fontFamily: '"VT323", "DM Mono", monospace',
                        textShadow: '1px 0 0 #00FFEE, -1px 0 0 #CCFF00',
                        animation:
                            'lore-jitter 0.16s steps(2) infinite, lore-flicker 0.8s ease-in-out infinite',
                    }}
                >
                    {f.text}
                </div>
            ))}

            {/* Main payload */}
            <div className="relative text-center px-6" style={{ zIndex: 10 }}>
                <div
                    className="text-7xl md:text-[10rem] leading-none mb-10"
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        color: '#FFEEEE',
                        textShadow:
                            '4px 0 0 #FF0033, -4px 0 0 #00FFEE, 0 0 40px rgba(255, 0, 51, 0.6)',
                        letterSpacing: '0.02em',
                        animation: 'lore-jitter 0.18s steps(2) infinite',
                    }}
                >
                    HE&apos;S LIVE
                </div>

                <a
                    href={twitchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 border border-[#FF0033] text-[#FF0033] hover:bg-[#FF0033] hover:text-black transition-colors duration-150 text-base md:text-lg"
                    style={{
                        fontFamily: '"VT323", "DM Mono", monospace',
                        letterSpacing: '0.35em',
                        animation: 'lore-flicker 1.8s ease-in-out infinite',
                    }}
                >
                    WATCH FOR YOURSELF...
                </a>
            </div>

            {/* Bottom band */}
            <div
                className="absolute bottom-8 left-0 right-0 text-center text-xs tracking-[0.4em] opacity-50"
                style={{
                    color: '#FF0033',
                    fontFamily: '"VT323", "DM Mono", monospace',
                    animation: 'lore-flicker 0.4s steps(2) infinite',
                }}
            >
                // BROADCAST IN PROGRESS // DO NOT TURN AWAY //
            </div>
        </div>
    );
}
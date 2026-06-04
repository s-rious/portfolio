'use client';

import { useEffect, useState } from 'react';

interface Skit {
    id: string;
    title: string;
}

interface CRTFrameProps {
    skits: Skit[];
    audioEnabled: boolean;
}

export default function CRTFrame({ skits, audioEnabled }: CRTFrameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [glitchTick, setGlitchTick] = useState(0);

    // Glitch tick for the "STAND BY" mode — drives flicker text changes
    useEffect(() => {
        if (skits.length > 0) return;
        const interval = setInterval(() => setGlitchTick((t) => t + 1), 320);
        return () => clearInterval(interval);
    }, [skits.length]);

    const currentSkit = skits[currentIndex];

    const handleNextChannel = () => {
        if (skits.length <= 1) return;
        setCurrentIndex((i) => (i + 1) % skits.length);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* CRT bezel */}
            <div
                className="relative aspect-video"
                style={{
                    background:
                        'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #050505 100%)',
                    borderRadius: '24px',
                    padding: '28px',
                    boxShadow:
                        'inset 0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(255, 0, 51, 0.15), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
            >
                {/* Inner screen */}
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        borderRadius: '8px',
                        background: '#000',
                        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9)',
                    }}
                >
                    {/* The actual content: YouTube embed OR Stand By state */}
                    {currentSkit ? (
                        <iframe
                            key={currentSkit.id}
                            src={`https://www.youtube.com/embed/${currentSkit.id}?autoplay=1&mute=${audioEnabled ? 0 : 1}&modestbranding=1&rel=0`}
                            title={currentSkit.title}
                            allow="autoplay; encrypted-media"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                        />
                    ) : (
                        <StandByScreen tick={glitchTick} />
                    )}

                    {/* Scanlines overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
                        }}
                    />

                    {/* CRT vignette / curvature illusion */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
                            borderRadius: '8px',
                        }}
                    />

                    {/* Faint flicker layer */}
                    <div
                        className="pointer-events-none absolute inset-0 mix-blend-overlay"
                        style={{
                            background: 'rgba(255, 0, 51, 0.04)',
                            animation: 'lore-flicker 4s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* "Channel" label, bottom-left */}
                <div
                    className="absolute bottom-3 left-8 text-xs tracking-[0.3em] opacity-50"
                    style={{
                        fontFamily: '"VT323", "DM Mono", monospace',
                        color: '#FF0033',
                    }}
                >
                    CH {String(currentIndex + 1).padStart(2, '0')}
                    {skits.length > 0 && ` / ${String(skits.length).padStart(2, '0')}`}
                </div>

                {/* Channel switch button — only if multiple skits */}
                {skits.length > 1 && (
                    <button
                        onClick={handleNextChannel}
                        className="absolute bottom-3 right-8 text-xs tracking-[0.3em] opacity-50 hover:opacity-100 transition-opacity"
                        style={{
                            fontFamily: '"VT323", "DM Mono", monospace',
                            color: '#FFEEEE',
                        }}
                    >
                        [ CHANGE CHANNEL ]
                    </button>
                )}
            </div>
        </div>
    );
}

// "Stand By" screen — what shows when no skits are loaded yet
function StandByScreen({ tick }: { tick: number }) {
    const variants = ['STAND BY', 'NO SIGNAL', 'TUNING...', 'S T A N D  B Y', '░NO░SIGNAL░'];
    const current = variants[tick % variants.length];

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Heavy static background */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-screen"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' /></svg>\")",
                    animation: 'lore-noise 0.16s steps(2) infinite',
                }}
            />

            <div
                className="relative text-4xl md:text-6xl tracking-widest"
                style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    color: '#FFEEEE',
                    textShadow: '2px 0 0 #FF0033, -2px 0 0 #00FFEE',
                    animation: 'lore-jitter 0.16s steps(2) infinite',
                }}
            >
                {current}
            </div>
            <div
                className="relative mt-6 text-xs tracking-[0.4em] opacity-60"
                style={{
                    fontFamily: '"VT323", "DM Mono", monospace',
                    color: '#FF0033',
                }}
            >
                BROADCAST RESUMES SOON
            </div>
        </div>
    );
}
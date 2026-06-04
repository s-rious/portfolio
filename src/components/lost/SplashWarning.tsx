'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SplashWarningProps {
    onEnter: () => void;
}

export default function SplashWarning({ onEnter }: SplashWarningProps) {
    const router = useRouter();
    const [timecode, setTimecode] = useState('00:00:00');
    const [serial, setSerial] = useState('XXXXXXXX');

    // Lock the serial once on mount so it doesn't churn every render
    useEffect(() => {
        setSerial(Math.random().toString(36).substring(2, 10).toUpperCase());
    }, []);

    // Timecode that scrambles itself
    useEffect(() => {
        const interval = setInterval(() => {
            const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
            const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            setTimecode(`${h}:${m}:${s}`);
        }, 240);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            style={{ fontFamily: '"VT323", "DM Mono", monospace', color: '#FFEEEE' }}
        >
            {/* Scanlines */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
                }}
            />

            {/* Static noise */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' /></svg>\")",
                    animation: 'lore-noise 0.18s steps(2) infinite',
                }}
            />

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
                }}
            />

            <div className="relative max-w-2xl mx-auto px-8 text-center">
                {/* Top bar */}
                <div className="flex justify-between items-center text-xs tracking-[0.3em] mb-14 opacity-70">
                    <span>// INTERCEPTED</span>
                    <span style={{ animation: 'lore-flicker 0.6s steps(2) infinite' }}>
                        {timecode}
                    </span>
                </div>

                {/* Header */}
                <div
                    className="text-5xl md:text-7xl mb-8 leading-none"
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        color: '#FF0033',
                        textShadow:
                            '2px 0 0 #00FFEE, -2px 0 0 #CCFF00, 0 0 28px rgba(255, 0, 51, 0.55)',
                        letterSpacing: '0.02em',
                    }}
                >
                    WARNING
                    <br />
                </div>

                {/* Body */}
                <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-85 mb-12">
                    <p>THE FOLLOWING TRANSMISSION CONTAINS</p>
                    <p>RAPID VISUAL ARTIFACTS, AUDIO INTERFERENCE,</p>
                    <p>AND CONTENT NOT INTENDED FOR THIS NETWORK.</p>
                    <p className="pt-6 opacity-60 text-xs md:text-sm tracking-[0.25em]">
                        KNOWN TRIGGER FOR PHOTOSENSITIVE EPILEPSY.
                        <br />
                        VIEWER DISCRETION ADVISED.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={onEnter}
                        className="px-12 py-4 border border-[#FF0033] text-[#FF0033] hover:bg-[#FF0033] hover:text-black transition-colors duration-150 text-sm"
                        style={{
                            fontFamily: '"VT323", "DM Mono", monospace',
                            letterSpacing: '0.45em',
                        }}
                    >
                        ENTER
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="px-12 py-4 text-white/40 hover:text-white/70 transition-colors duration-150 text-sm"
                        style={{
                            fontFamily: '"VT323", "DM Mono", monospace',
                            letterSpacing: '0.25em',
                        }}
                    >
                        leave
                    </button>
                </div>

                {/* Bottom serial */}
                <div className="absolute -bottom-28 left-0 right-0 text-xs tracking-[0.4em] opacity-25">
                    //SERIAL_{serial}//
                </div>
            </div>
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';

export default function GlitchOverlay() {
    const [flashing, setFlashing] = useState(false);

    // Occasional rare full-screen flicker — restrained, well below seizure threshold
    useEffect(() => {
        const scheduleFlash = () => {
            const delay = 15000 + Math.random() * 25000; // 15s–40s between flashes
            return setTimeout(() => {
                setFlashing(true);
                setTimeout(() => setFlashing(false), 90);
            }, delay);
        };

        let timeout = scheduleFlash();
        const interval = setInterval(() => {
            clearTimeout(timeout);
            timeout = scheduleFlash();
        }, 40000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* Permanent scanlines */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-20"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
                }}
            />

            {/* Permanent noise */}
            <div
                className="pointer-events-none fixed inset-0 z-[101] opacity-[0.05] mix-blend-screen"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' /></svg>\")",
                    animation: 'lore-noise 0.2s steps(2) infinite',
                }}
            />

            {/* Vignette */}
            <div
                className="pointer-events-none fixed inset-0 z-[102]"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)',
                }}
            />

            {/* Rare flash */}
            {flashing && (
                <div
                    className="pointer-events-none fixed inset-0 z-[103]"
                    style={{
                        background: 'rgba(255, 0, 51, 0.12)',
                        mixBlendMode: 'screen',
                    }}
                />
            )}
        </>
    );
}
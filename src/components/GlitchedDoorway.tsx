'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Symbol soup variants — these dominate. Pure noise, looks corrupted.
const SYMBOL_VARIANTS = [
    '%̸̗̃%̴̛%̴̛%̴',
    '█̷̛█̴█̷̛',
    '▓̷̛▒̴░̷̛',
    '%̴̛██▓̷',
    '▒̷̛░̴█̷̛',
    '█̴̛̃▓̷̕%̴',
    '░̸̗̃█̴▒̷',
    '%̴̕█̷̛▒̴',
    '▓█̷̛▒%',
    '╳̸̗̃▓̷̛',
];

// Rare legible flashes — only appear ~12% of the time, briefly
const RARE_LEGIBLE = ['L̸O̷R̴E̷', 'L͠O̷S̴T̷', 'L̴͝O̵Ş̷T̴', 'L͉͝Õ̴R̴̃E̷'];

export default function GlitchedDoorway() {
    const [text, setText] = useState(SYMBOL_VARIANTS[0]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const cycle = () => {
            const showLegible = Math.random() < 0.12;
            const source = showLegible ? RARE_LEGIBLE : SYMBOL_VARIANTS;
            const next = source[Math.floor(Math.random() * source.length)];
            setText(next);

            // Legible flashes are brief; noise variants linger longer & vary
            const nextDelay = showLegible ? 200 : 600 + Math.random() * 1600;
            timeoutId = setTimeout(cycle, nextDelay);
        };

        cycle();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Link
            href="/lost"
            aria-label="lost"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute pointer-events-auto select-none z-[60] group"
            style={{
                // Clipping OUT of the navbar — pokes below the bottom edge
                bottom: '-18px',
                right: '28px',
                fontFamily: '"VT323", "DM Mono", monospace',
                fontSize: '16px',
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: isHovered ? '#FF0033' : 'rgba(255, 46, 99, 0.5)',
                textShadow: isHovered
                    ? '0 0 10px #FF0033, 0 0 22px rgba(255, 0, 51, 0.7), 1px 0 0 #00FFEE, -1px 0 0 #CCFF00'
                    : '1px 0 0 rgba(0, 255, 238, 0.35), -1px 0 0 rgba(204, 255, 0, 0.28)',
                animation:
                    'lore-jitter 0.16s steps(2) infinite, lore-flicker 2.8s ease-in-out infinite',
                transform: `rotate(${isHovered ? '-2deg' : '0deg'})`,
                transition: 'color 0.15s, text-shadow 0.15s, transform 0.15s',
                whiteSpace: 'nowrap',
            }}
        >
            {text}
        </Link>
    );
}
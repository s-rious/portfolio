'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BackLink({ href, label }: { href: string; label: string }) {
    const [hov, setHov] = useState(false);
    return (
        <Link
            href={href}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                color: hov ? 'var(--white)' : 'var(--gray-500)',
                textDecoration: 'none',
                marginBottom: '3rem',
                marginTop: '-3rem',
                position: 'relative',
                transition: 'color 0.2s',
            }}
        >
            {label}
        </Link>
    );
}
const ITEMS = [
    'GAMING', 'CODING', 'CARS', 'FILM', 'ESPORTS', 'GYM', 'SOCIAL MEDIA', 'TECH',
    'GAMING', 'CODING', 'CARS', 'FILM', 'ESPORTS', 'GYM', 'SOCIAL MEDIA', 'TECH',
    'GAMING', 'CODING', 'CARS', 'FILM', 'ESPORTS', 'GYM', 'SOCIAL MEDIA', 'TECH',
    'GAMING', 'CODING', 'CARS', 'FILM', 'ESPORTS', 'GYM', 'SOCIAL MEDIA', 'TECH',
];

export default function TickerSection() {
    return (
        <div style={{
            overflow: 'hidden',
            borderTop: '1px solid var(--gray-800)',
            borderBottom: '1px solid var(--gray-800)',
            background: 'var(--black)',
            padding: '0.6rem 0',
        }}>
            <div style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                width: 'max-content',
                animation: 'tickerLeft 22s linear infinite',
            }}>
                {ITEMS.map((word, i) => (
                    <span key={i} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--gray-500)',
                        padding: '0 1.5rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                    }}>
                        {word}
                        <span style={{ color: 'var(--red)', fontSize: '0.4rem' }}>◆</span>
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes tickerLeft {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ticker-track { animation: none; }
                }
            `}</style>
        </div>
    );
}
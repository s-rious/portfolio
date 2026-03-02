const WORDS = ['GAMES', 'CODE', 'CARS', 'FILM', 'ESPORTS', 'GYM'];

// Duplicate enough to fill any screen seamlessly
const TRACK = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

export default function TickerSection() {
    return (
        <section style={{
            background: 'var(--black)',
            borderTop: '1px solid var(--gray-800)',
            borderBottom: '1px solid var(--gray-800)',
            padding: '3rem 0',
            overflow: 'hidden',
            userSelect: 'none',
        }}>

            {/* Row 1 — left */}
            <div style={{ overflow: 'hidden', marginBottom: '0.75rem' }}>
                <div className="ticker-row ticker-left">
                    {TRACK.map((word, i) => (
                        <span key={i} className="ticker-item">
              {word}
                            <span className="ticker-dot">·</span>
            </span>
                    ))}
                </div>
            </div>

            {/* Row 2 — right (outline text) */}
            <div style={{ overflow: 'hidden' }}>
                <div className="ticker-row ticker-right">
                    {TRACK.map((word, i) => (
                        <span key={i} className="ticker-item ticker-outline">
              {word}
                            <span className="ticker-dot">·</span>
            </span>
                    ))}
                </div>
            </div>

            <style>{`
        .ticker-row {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        .ticker-left {
          animation: tickerLeft 18s linear infinite;
        }

        .ticker-right {
          animation: tickerRight 18s linear infinite;
        }

        .ticker-item {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7vw, 6rem);
          letter-spacing: 0.06em;
          color: var(--white);
          padding: 0 0.6em;
          line-height: 1;
        }

        .ticker-outline {
          -webkit-text-stroke: 1px var(--gray-700);
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .ticker-dot {
          color: var(--red);
          -webkit-text-stroke: 0;
          -webkit-text-fill-color: var(--red);
          margin-left: 0.3em;
          font-size: 0.6em;
          vertical-align: middle;
        }

        @keyframes tickerLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes tickerRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-left, .ticker-right { animation: none; }
        }
      `}</style>
        </section>
    );
}
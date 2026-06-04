'use client';

interface AudioPromptProps {
    onAccept: () => void;
    onDecline: () => void;
}

export default function AudioPrompt({ onAccept, onDecline }: AudioPromptProps) {
    return (
        <div
            className="fixed inset-0 z-[180] flex items-center justify-center"
            style={{
                fontFamily: '"VT323", "DM Mono", monospace',
                background: 'rgba(0, 0, 0, 0.92)',
            }}
        >
            {/* Scanlines */}
            <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)',
                }}
            />

            <div className="relative max-w-xl mx-auto px-8 text-center">
                <div
                    className="text-3xl md:text-5xl mb-12 leading-tight"
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        color: '#FFEEEE',
                        textShadow:
                            '1px 0 0 #FF0033, -1px 0 0 #00FFEE, 0 0 18px rgba(255, 0, 51, 0.35)',
                        letterSpacing: '0.04em',
                    }}
                >
                    ENABLE TRANSMISSION AUDIO?
                </div>

                {/* Three "YES" buttons — DDLC style. All do the same thing. */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    {[0, 1, 2].map((i) => (
                        <button
                            key={i}
                            onClick={onAccept}
                            className="w-64 px-10 py-3 border border-[#FF0033] text-[#FF0033] hover:bg-[#FF0033] hover:text-black transition-colors duration-150 text-base"
                            style={{
                                fontFamily: '"VT323", "DM Mono", monospace',
                                letterSpacing: '0.5em',
                                // Slight offset on each one so they don't look stacked perfectly
                                transform: `translateX(${(i - 1) * 6}px)`,
                            }}
                        >
                            YES
                        </button>
                    ))}
                </div>

                {/* The real opt-out, smaller and lowercase */}
                <button
                    onClick={onDecline}
                    className="text-white/30 hover:text-white/60 transition-colors duration-150 text-sm"
                    style={{
                        fontFamily: '"VT323", "DM Mono", monospace',
                        letterSpacing: '0.15em',
                    }}
                >
                    yes (i&apos;d rather not)
                </button>
            </div>
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';
import SplashWarning from '@/components/lost/SplashWarning';
import AudioPrompt from '@/components/lost/AudioPrompt';
import CRTFrame from '@/components/lost/CRTFrame';
import GlitchOverlay from '@/components/lost/GlitchOverlay';
import LiveHijack from '@/components/lost/LiveHijack';
import { useScheduledLive } from '@/lib/scheduledLive';
import skitsData from '@/data/skits.json';

// Where "Watch for yourself..." links to during the live hijack
const TWITCH_URL = 'https://twitch.tv/s_rious';

type Stage = 'splash' | 'audio-prompt' | 'experience';

export default function LostPage() {
    const [stage, setStage] = useState<Stage>('splash');
    const [audioEnabled, setAudioEnabled] = useState(false);
    const isLive = useScheduledLive();

    // Load VT323 (CRT/terminal font) for this page only
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    // Cover the body background
    useEffect(() => {
        const original = document.body.style.background;
        document.body.style.background = '#000';
        return () => {
            document.body.style.background = original;
        };
    }, []);

    // LIVE STATE: hijack everything. Bypass splash + audio prompt entirely.
    if (isLive) {
        return <LiveHijack twitchUrl={TWITCH_URL} />;
    }

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse at 30% 20%, #1A0008 0%, #080808 40%, #000 100%)',
            }}
        >
            {/* Page-wide ambient glitch — only after entering experience */}
            {stage === 'experience' && <GlitchOverlay />}

            {/* Background environment placeholder — swap for loop video later */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(255,0,51,0.06) 0%, transparent 60%)',
                    opacity: stage === 'experience' ? 1 : 0,
                    transition: 'opacity 1.2s ease',
                }}
            />

            {/* Stage 1: Splash warning */}
            {stage === 'splash' && (
                <SplashWarning onEnter={() => setStage('audio-prompt')} />
            )}

            {/* Stage 2: Audio prompt */}
            {stage === 'audio-prompt' && (
                <AudioPrompt
                    onAccept={() => {
                        setAudioEnabled(true);
                        setStage('experience');
                    }}
                    onDecline={() => {
                        setAudioEnabled(false);
                        setStage('experience');
                    }}
                />
            )}

            {/* Stage 3: The experience */}
            {stage === 'experience' && (
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
                    <div
                        className="mb-12 text-xs tracking-[0.5em] opacity-60"
                        style={{
                            fontFamily: '"VT323", "DM Mono", monospace',
                            color: '#FFEEEE',
                        }}
                    >
                        // BROADCAST INTERCEPTED FROM {skitsData.channelHandle} //
                    </div>

                    <CRTFrame skits={skitsData.skits} audioEnabled={audioEnabled} />

                    <div
                        className="mt-12 text-xs tracking-[0.4em] opacity-30 text-center"
                        style={{
                            fontFamily: '"VT323", "DM Mono", monospace',
                            color: '#FFEEEE',
                        }}
                    >
                        SOURCE: ???
                        <br />
                        <a
                            href={skitsData.channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-100 hover:text-[#FF0033] transition-opacity duration-150"
                            style={{ textDecoration: 'none' }}
                        >
                            [ if you know, you know ]
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
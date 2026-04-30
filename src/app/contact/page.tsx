'use client';

import { useState, FormEvent } from 'react';
import aboutData from '@/data/about.json';

function Label({ children }: { children: React.ReactNode }) {
    return (
        <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: 'var(--gray-500)',
            display: 'block',
            marginBottom: '0.6rem',
        }}>
      {children}
    </span>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--gray-800)',
    border: '1px solid var(--gray-700)',
    borderBottom: '1px solid var(--gray-600)',
    padding: '0.85rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--white)',
    outline: 'none',
    transition: 'border-color 0.2s',
};

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending]   = useState(false);
    const [status, setStatus]     = useState<'idle'|'success'|'error'>('idle');

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const r = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_key: 'bbae9f51-efb6-45bc-beaa-7a8585764cbf', ...form }),
            });
            if (r.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); }
            else new Error();
        } catch { setStatus('error'); }
        setSending(false);
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)', paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6vw' }}>

                {/* Header */}
                <div style={{ marginBottom: '5rem' }}>
                    <Label>Contact</Label>
                    <h1
                        className="text-6xl md:text-9xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        GET IN TOUCH
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'var(--gray-400)', maxWidth: '480px', lineHeight: 1.65 }}>
                        Partnerships, collaborations, brand deals, or just want to say something. I read everything.
                    </p>
                </div>

                {/* Body grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '4rem', alignItems: 'start' }}>

                    {/* Form */}
                    <form onSubmit={onSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--gray-800)', marginBottom: '1px' }}>
                            {/* Name */}
                            <div style={{ background: 'var(--gray-900)', padding: '1.5rem' }}>
                                <Label>Name</Label>
                                <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Cameron Rydwell"
                                       style={inputStyle}
                                       onFocus={e => (e.target.style.borderBottomColor = 'var(--red)')}
                                       onBlur={e => (e.target.style.borderBottomColor = 'var(--gray-600)')}
                                />
                            </div>
                            {/* Email */}
                            <div style={{ background: 'var(--gray-900)', padding: '1.5rem' }}>
                                <Label>Email</Label>
                                <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@company.com"
                                       style={inputStyle}
                                       onFocus={e => (e.target.style.borderBottomColor = 'var(--red)')}
                                       onBlur={e => (e.target.style.borderBottomColor = 'var(--gray-600)')}
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div style={{ background: 'var(--gray-900)', padding: '1.5rem', border: '1px solid var(--gray-800)', borderBottom: 'none' }}>
                            <Label>Subject</Label>
                            <input type="text" name="subject" value={form.subject} onChange={onChange} required placeholder="Brand partnership / Collab / Say hi"
                                   style={inputStyle}
                                   onFocus={e => (e.target.style.borderBottomColor = 'var(--red)')}
                                   onBlur={e => (e.target.style.borderBottomColor = 'var(--gray-600)')}
                            />
                        </div>

                        {/* Message */}
                        <div style={{ background: 'var(--gray-900)', padding: '1.5rem', border: '1px solid var(--gray-800)', borderBottom: 'none' }}>
                            <Label>Message</Label>
                            <textarea name="message" value={form.message} onChange={onChange} required rows={7}
                                      placeholder="Tell me about it..."
                                      style={{ ...inputStyle, resize: 'none' }}
                                      onFocus={e => (e.target.style.borderBottomColor = 'var(--red)')}
                                      onBlur={e => (e.target.style.borderBottomColor = 'var(--gray-600)')}
                            />
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={sending}
                                style={{
                                    width: '100%',
                                    background: sending ? 'var(--gray-700)' : 'var(--red)',
                                    border: 'none',
                                    padding: '1.1rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.16em',
                                    color: 'var(--white)',
                                    cursor: sending ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#BF0015'; }}
                                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = 'var(--red)'; }}
                        >
                            {sending ? 'SENDING...' : 'SEND MESSAGE'}
                        </button>

                        {status === 'success' && (
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#4ADE80', marginTop: '1rem' }}>
                                ✓ Message sent. I'll get back to you soon.
                            </p>
                        )}
                        {status === 'error' && (
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--red)', marginTop: '1rem' }}>
                                ✗ Failed to send. Email directly: him@camry.dev
                            </p>
                        )}
                    </form>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Direct */}
                        <div style={{ border: '1px solid var(--gray-800)', padding: '1.75rem' }}>
                            <Label>Direct Line</Label>
                            <a href={`mailto:${aboutData.socials?.email || 'him@camry.dev'}`}
                               style={{
                                   fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em',
                                   color: 'var(--white)', textDecoration: 'none',
                                   borderBottom: '1px solid var(--red)', paddingBottom: '2px',
                               }}
                            >
                                him@camry.dev
                            </a>
                        </div>

                        {/* Social */}
                        <div style={{ border: '1px solid var(--gray-800)', padding: '1.75rem' }}>
                            <Label>Find me on</Label>
                            {aboutData.socials && Object.entries(aboutData.socials)
                                .filter(([k]) => k !== 'email')
                                .map(([platform, url]) => (
                                    <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer"
                                       style={{
                                           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                           fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em',
                                           color: 'var(--gray-400)', textDecoration: 'none',
                                           padding: '0.6rem 0',
                                           borderBottom: '1px solid var(--gray-800)',
                                           transition: 'color 0.2s',
                                       }}
                                       onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                                       onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
                                    >
                                        <span>{platform.toUpperCase()}</span>
                                        <span>↗</span>
                                    </a>
                                ))}
                        </div>

                        {/* Response time */}
                        <div style={{ border: '1px solid var(--gray-800)', padding: '1.75rem', background: 'var(--gray-900)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                                <span style={{ width: '6px', height: '6px', background: '#4ADE80', borderRadius: '50%', display: 'block' }} />
                                <Label>Response time</Label>
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.6 }}>
                                Typically within 24–48 hours. For urgent matters, DM on X or email me directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          form + div { display: none !important; }
          form { grid-column: 1 / -1 !important; }
        }
      `}</style>
        </div>
    );
}
'use client';

import { useState, FormEvent } from 'react';
import aboutData from '@/data/about.json';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Web3Forms API endpoint
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'bbae9f51-efb6-45bc-beaa-7a8585764cbf', // Replace with your actual key
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <h1
                        className="text-6xl md:text-9xl font-black mb-4"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        GET IN TOUCH
                    </h1>
                    <div className="w-32 h-1 bg-white mb-6" />
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Have a project in mind? Want to collaborate? Just want to say hi?
                        Drop me a message and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-black mb-2 tracking-wider"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-[#FF2E63] text-white placeholder-gray-600 transition-all duration-300 outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-black mb-2 tracking-wider"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-[#FF2E63] text-white placeholder-gray-600 transition-all duration-300 outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-black mb-2 tracking-wider"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    SUBJECT
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-[#FF2E63] text-white placeholder-gray-600 transition-all duration-300 outline-none"
                                    placeholder="What's this about?"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-black mb-2 tracking-wider"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                                >
                                    MESSAGE
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-[#FF2E63] text-white placeholder-gray-600 transition-all duration-300 resize-none outline-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#FF2E63] hover:bg-[#FF2E63]/80 text-white py-4 font-black text-lg tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="p-4 border border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]">
                                    <p className="font-medium">✓ Message sent! I'll get back to you soon.</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 border border-[#FF2E63] bg-[#FF2E63]/10 text-[#FF2E63]">
                                    <p className="font-medium">✗ Failed to send. Please try again or email me directly.</p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">

                        {/* Direct Contact */}
                        <div>
                            <h3
                                className="text-2xl font-black mb-4"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                DIRECT CONTACT
                            </h3>
                            <a
                                href={`mailto:${aboutData.socials?.email || 'him@camry.dev'}`}
                                className="block px-6 py-3 border border-white/20 hover:border-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all duration-300 text-center"
                            >
                                <span className="text-sm tracking-wider">EMAIL ME</span>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3
                                className="text-2xl font-black mb-4"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                CONNECT
                            </h3>
                            <div className="space-y-3">
                                {aboutData.socials && Object.entries(aboutData.socials)
                                    .filter(([platform]) => platform !== 'email')
                                    .map(([platform, url]) => (
                                        <a
                                            key={platform}
                                            href={url as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-6 py-3 border border-white/20 hover:border-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all duration-300 text-center text-sm tracking-wider"
                                        >
                                            {platform.toUpperCase()}
                                        </a>
                                    ))}
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="p-6 bg-white/5 border border-white/10">
                            <h3
                                className="text-xl font-black mb-3"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                RESPONSE TIME
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                I typically respond within 24-48 hours. For urgent matters,
                                reach out via Twitter DM or email directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
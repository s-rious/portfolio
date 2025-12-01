'use client';

import { useState, FormEvent } from 'react';
import aboutData from '@/data/about.json';
import siteConfig from '@/data/siteConfig.json';

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

        // TODO: Replace with actual backend endpoint
        // Example implementation:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
        */

        // Temporary placeholder simulation
        setTimeout(() => {
            console.log('Form data:', formData);
            setSubmitStatus('success');
            setIsSubmitting(false);
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSubmitStatus('idle');
            }, 3000);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0f0e0d] p-8 pt-28">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-black rounded-lg border border-white/20 shadow-2xl overflow-hidden">
                    {/* COMING SOON OVERLAY */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto">
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-white font-inter drop-shadow-lg">COMING SOON</h2>
                            <p className="text-gray-400 mt-3 font-mono tracking-wide">Contact form temporarily disabled</p>
                        </div>
                    </div>

                    <div className="bg-[#1a1816] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-brand-secondary"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-mono">
                            ~/contact
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                            MESSAGE
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-inter text-white">
                                Get In Touch
                            </h1>
                            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider mb-2">
                                $ send_message.sh
                            </p>
                            <p className="text-lg text-gray-400 font-inter">
                                Have a question or want to work together? Drop me a message!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                                            NAME
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 font-mono"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                                            EMAIL
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 font-mono"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                                            SUBJECT
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 font-mono"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                                            MESSAGE
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 font-mono resize-none"
                                            placeholder="Your message..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 font-medium font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'SENDING...' : 'SEND_MESSAGE'}
                                    </button>

                                    {submitStatus === 'success' && (
                                        <div className="p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
                                            <p className="text-brand-primary font-mono text-sm">
                                                ✓ Message sent successfully! I'll get back to you soon.
                                            </p>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="p-4 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg">
                                            <p className="text-brand-secondary font-mono text-sm">
                                                ✗ Failed to send message. Please try again or contact me directly.
                                            </p>
                                        </div>
                                    )}
                                </form>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-mono text-gray-500 uppercase mb-4">Direct Contact</h3>
                                    <a
                                        href={`mailto:${aboutData.socials.email}`}
                                        className="block px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-brand-primary/50 transition-all duration-300 group"
                                    >
                                        <span className="text-gray-400 group-hover:text-brand-primary font-mono text-sm transition-colors duration-300">
                                            EMAIL
                                        </span>
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-sm font-mono text-gray-500 uppercase mb-4">Social Links</h3>
                                    <div className="space-y-3">
                                        {Object.entries(aboutData.socials)
                                            .filter(([platform]) => platform !== 'email')
                                            .map(([platform, url]) => (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-brand-primary/50 transition-all duration-300 group"
                                                >
                                                    <span className="text-gray-400 group-hover:text-brand-primary font-mono text-sm transition-colors duration-300">
                                                        {platform.toUpperCase()}
                                                    </span>
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
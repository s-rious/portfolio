// src/components/mdx/MDXContent.tsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';

interface MDXContentProps {
    content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                // Headings
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-white mb-6 mt-8 font-inter">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-white mb-4 mt-8 font-inter">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-white mb-3 mt-6 font-inter">
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-xl font-semibold text-white mb-2 mt-4 font-inter">
                        {children}
                    </h4>
                ),

                // Paragraphs
                p: ({ children }) => (
                    <p className="text-gray-300 mb-4 leading-relaxed font-sans text-lg">
                        {children}
                    </p>
                ),

                // Links
                a: ({ href, children }) => {
                    const isExternal = href?.startsWith('http');

                    if (isExternal) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-primary hover:text-brand-accent transition-colors underline"
                            >
                                {children}
                            </a>
                        );
                    }

                    return (
                        <Link
                            href={href || '#'}
                            className="text-brand-primary hover:text-brand-accent transition-colors underline"
                        >
                            {children}
                        </Link>
                    );
                },

                // Lists
                ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 text-gray-300 space-y-2 ml-4">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 text-gray-300 space-y-2 ml-4">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="text-gray-300 leading-relaxed">
                        {children}
                    </li>
                ),

                // Blockquotes
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-primary pl-6 pr-4 py-3 my-6 bg-white/5 rounded-r-lg italic text-gray-400">
                        {children}
                    </blockquote>
                ),

                // Code
                code: ({ inline, className, children, ...props }: any) => {
                    if (inline) {
                        return (
                            <code
                                className="bg-white/10 text-brand-accent px-2 py-0.5 rounded font-mono text-sm"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    return (
                        <code
                            className={`${className} text-sm`}
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },

                pre: ({ children }) => (
                    <pre className="bg-[#0d1117] border border-white/20 rounded-lg p-4 overflow-x-auto mb-6 font-mono text-sm">
                        {children}
                    </pre>
                ),

                // Images
                img: ({ src, alt }) => (
                    <div className="my-8 rounded-lg overflow-hidden border border-white/20">
                        <img
                            src={src}
                            alt={alt || ''}
                            className="w-full h-auto"
                            loading="lazy"
                        />
                        {alt && (
                            <p className="text-center text-gray-500 text-sm mt-2 pb-2">
                                {alt}
                            </p>
                        )}
                    </div>
                ),

                // Horizontal rule
                hr: () => (
                    <hr className="border-white/20 my-8" />
                ),

                // Tables
                table: ({ children }) => (
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full border border-white/20 rounded-lg">
                            {children}
                        </table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-white/20 px-4 py-2 bg-white/5 text-white font-semibold text-left">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-white/20 px-4 py-2 text-gray-300">
                        {children}
                    </td>
                ),

                // Strong/Bold
                strong: ({ children }) => (
                    <strong className="font-bold text-white">
                        {children}
                    </strong>
                ),

                // Emphasis/Italic
                em: ({ children }) => (
                    <em className="italic text-gray-300">
                        {children}
                    </em>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
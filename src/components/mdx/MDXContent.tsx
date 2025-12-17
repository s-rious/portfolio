// src/components/mdx/MDXContent.tsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MDXContentProps {
    content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-8 mb-4 text-white">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h4>
                ),
                p: ({ children }) => (
                    <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
                ),
                li: ({ children }) => (
                    <li className="text-gray-300">{children}</li>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-gray-400">
                        {children}
                    </blockquote>
                ),
                code: ({ inline, className, children, ...props }: any) => {

                    if (inline) {
                        return (
                            <code
                                className="bg-gray-900 px-1.5 py-0.5 rounded text-sm text-brand-primary font-mono"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    return (
                        <pre
                            className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto text-sm"
                        >
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </pre>
                    );
                },
                a: ({ children, href }) => (
                    <a
                        href={href}
                        className="text-brand-primary hover:text-brand-accent underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                ),
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt || ''}
                        className="rounded-lg my-4 max-w-full h-auto border border-white/20"
                    />
                ),
                hr: () => (
                    <hr className="my-8 border-white/10" />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}

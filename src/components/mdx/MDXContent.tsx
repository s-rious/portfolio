'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MDXContentProps {
    content: string;
}

// ─── Markdown preprocessor ────────────────────────────────────────────────────
// Converts > - Author  →  > — Author so you never have to type the em dash.
function preprocessMarkdown(content: string): string {
    return content
        .split('\n')
        .map((line) => {
            if (/^>\s*-\s+/.test(line)) {
                return line.replace(/^(>\s*)-\s+/, '$1— ');
            }
            return line;
        })
        .join('\n');
}

// ─── Recursively extract plain text from any React node tree ──────────────────
function extractText(node: React.ReactNode): string {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('\n');
    if (React.isValidElement(node)) return extractText((node.props as any).children);
    return '';
}

// ─── Callout config ───────────────────────────────────────────────────────────
type CalloutType = 'info' | 'tip' | 'warning' | 'attention';
const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string; icon: string }> = {
    info:      { border: 'border-[#00E5FF]', bg: 'bg-[#00E5FF]/10', label: 'text-[#00E5FF]', icon: 'ℹ INFO' },
    tip:       { border: 'border-green-400',  bg: 'bg-green-400/10',  label: 'text-green-400',  icon: '✓ TIP' },
    warning:   { border: 'border-amber-400',  bg: 'bg-amber-400/10',  label: 'text-amber-400',  icon: '⚠ WARNING' },
    attention: { border: 'border-[#FF2E63]',  bg: 'bg-[#FF2E63]/10',  label: 'text-[#FF2E63]', icon: '✕ ATTENTION' },
};

// ─── Smart blockquote renderer ────────────────────────────────────────────────
function SmartBlockquote({ children }: { children: React.ReactNode }) {
    const fullText = extractText(children);
    const lines = fullText.split('\n').map((l) => l.trim()).filter(Boolean);

    if (lines.length === 0) return null;

    // ── Callout detection — note the closing \] in the regex ─────────────────
    const calloutMatch = lines[0].match(/^\[!(info|tip|warning|attention)\]$/i);
    if (calloutMatch) {
        const type = calloutMatch[1].toLowerCase() as CalloutType;
        const s = calloutStyles[type];
        const body = lines.slice(1).join(' ').trim();

        return (
            <div className={`border-l-4 ${s.border} ${s.bg} pl-4 pr-4 py-3 my-4 rounded-r-lg`}>
                <div
                    className={`text-xs font-black tracking-wider mb-1 ${s.label}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    {s.icon}
                </div>
                <div className="text-gray-300 text-sm leading-relaxed">{body}</div>
            </div>
        );
    }

    // ── Pull quote detection ──────────────────────────────────────────────────
    const lastLine = lines[lines.length - 1];
    if (lastLine.startsWith('—')) {
        const quoteText = lines.slice(0, -1).join(' ').trim();
        const attribution = lastLine.replace(/^—\s*/, '').trim();

        const commaIdx = attribution.indexOf(',');
        const author = commaIdx !== -1 ? attribution.slice(0, commaIdx).trim() : attribution;
        const source = commaIdx !== -1 ? attribution.slice(commaIdx + 1).trim() : null;

        return (
            <div className="text-center py-8 px-4 my-6">
                <p className="text-2xl md:text-3xl italic text-white leading-relaxed mb-6 font-light">
                    {quoteText}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-[#FF2E63] text-lg">—</span>
                    <span
                        className="text-sm font-black tracking-wider text-[#FF2E63]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        {author}
                    </span>
                    {source && (
                        <span className="text-sm text-gray-500 italic font-normal">
                            {source}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    // ── Plain blockquote ──────────────────────────────────────────────────────
    return (
        <blockquote className="border-l-4 border-[#FF2E63] pl-4 my-4 italic text-gray-400 bg-white/5 py-3 rounded-r-lg">
            {children}
        </blockquote>
    );
}

export default function MDXContent({ content }: MDXContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                // ── Headings ──────────────────────────────────────────────────
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-10 mb-4 text-white">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-10 mb-4 text-white border-b border-white/10 pb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-8 mb-3 text-white">{children}</h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-xl font-bold mt-6 mb-2 text-white">{children}</h4>
                ),

                // ── Body text ─────────────────────────────────────────────────
                p: ({ children }) => (
                    <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
                ),

                // ── Inline text formatting ────────────────────────────────────
                strong: ({ children }) => (
                    <strong className="font-bold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                    <em className="italic text-gray-400">{children}</em>
                ),
                del: ({ children }) => (
                    <del className="line-through text-gray-600">{children}</del>
                ),

                // ── Lists ─────────────────────────────────────────────────────
                ul: ({ children }) => (
                    <ul className="mb-4 space-y-2 text-gray-300"
                        style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="mb-4 space-y-2 text-gray-300"
                        style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                        {children}
                    </ol>
                ),
                li: ({ children, ordered, index, checked }: any) => {
                    // Task list item — use checked prop (reliable across react-markdown versions)
                    if (checked !== null && checked !== undefined) {
                        return (
                            <li style={{ listStyle: 'none' }} className="flex items-start gap-2 text-gray-300">
                                <span className={`inline-flex items-center justify-center w-4 h-4 rounded border mt-0.5 shrink-0 ${
                                    checked
                                        ? 'bg-[#FF2E63] border-[#FF2E63]'
                                        : 'border-white/25 bg-transparent'
                                }`}>
                                    {checked && <span className="text-white text-[9px] font-bold">✓</span>}
                                </span>
                                <span>{children}</span>
                            </li>
                        );
                    }
                    // Ordered list item — show red number
                    if (ordered) {
                        return (
                            <li style={{ listStyle: 'none' }} className="flex items-start gap-3 text-gray-300">
                                <span className="mt-0.5 min-w-[1.25rem] text-right text-[#FF2E63] font-mono text-sm shrink-0 select-none tabular-nums">
                                    {typeof index === 'number' ? index + 1 : ''}.
                                </span>
                                <span>{children}</span>
                            </li>
                        );
                    }
                    // Regular unordered list item — red dot
                    return (
                        <li style={{ listStyle: 'none' }} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-2 w-1.5 h-1.5 min-w-[6px] rounded-full bg-[#FF2E63] shrink-0" />
                            <span>{children}</span>
                        </li>
                    );
                },

                // ── Task list checkbox ────────────────────────────────────────
                // Return null — the li renderer above handles the visual checkbox
                // via the `checked` prop so we don't double-render it
                input: ({ type }: any) => {
                    if (type === 'checkbox') return null;
                    return <input type={type} />;
                },

                // ── Blockquote — handles callouts, pull quotes, and plain ─────
                blockquote: ({ children }) => <SmartBlockquote>{children}</SmartBlockquote>,

                // ── Code ─────────────────────────────────────────────────────
                code: ({ inline, className, children, ...props }: any) => {
                    if (inline) {
                        return (
                            <code
                                className="bg-gray-900 px-1.5 py-0.5 rounded text-sm text-[#14B8A6] font-mono border border-white/10"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }
                    return (
                        <pre className="bg-gray-950 rounded-lg p-4 my-4 overflow-x-auto text-sm border border-white/10">
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </pre>
                    );
                },

                // ── Links ─────────────────────────────────────────────────────
                a: ({ children, href }) => (
                    <a
                        href={href}
                        className="text-[#14B8A6] hover:text-[#F59E0B] underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                ),

                // ── Images ────────────────────────────────────────────────────
                img: ({ src, alt }) => (
                    <figure className="my-6">
                        <img
                            src={src}
                            alt={alt || ''}
                            className="rounded-lg w-full h-auto border border-white/20"
                        />
                        {alt && (
                            <figcaption className="text-center text-xs text-gray-500 mt-2 italic">
                                {alt}
                            </figcaption>
                        )}
                    </figure>
                ),

                // ── Tables ────────────────────────────────────────────────────
                table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse text-sm">{children}</table>
                    </div>
                ),
                thead: ({ children }) => (
                    <thead className="border-b border-[#FF2E63]/40">{children}</thead>
                ),
                th: ({ children }) => (
                    <th className="text-left px-4 py-2 text-xs font-black tracking-wider text-[#FF2E63] bg-white/5"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {children}
                    </th>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">{children}</tr>
                ),
                td: ({ children }) => (
                    <td className="px-4 py-2 text-gray-300">{children}</td>
                ),

                // ── Horizontal Rule ────────────────────────────────────────────
                hr: () => (
                    <hr className="my-8 border-none h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #FF2E63 20%, #00E5FF 80%, transparent)' }}
                    />
                ),
            }}
        >
            {preprocessMarkdown(content)}
        </ReactMarkdown>
    );
}
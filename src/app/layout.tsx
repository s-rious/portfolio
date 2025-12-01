import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CAMRY.DEV',
    description: 'CAMRY Development Portfolio',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </head>

        <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="mt-8 flex-grow">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    );
}
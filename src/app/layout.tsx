import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import siteConfig from '@/data/siteConfig.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: siteConfig.siteTitle,
    description: siteConfig.seo.description,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">

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

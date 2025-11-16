import './globals.css'

export const metadata = {
    title: 'Portfolio',
    description: 'My Portfolio Site'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}

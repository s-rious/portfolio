/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // Disable image optimization for static export
    images: {
        unoptimized: true
    },

    // Optional: Add trailing slashes for better compatibility
    trailingSlash: true,

    experimental: {
        optimizeCss: false,
    },
}

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // Bypass optimization for all images
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Match all hostnames
        },
      ],
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ['res.cloudinary.com'],
    // Optional: if you need to specify path patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optionally restrict to specific paths:
        // pathname: '/dy57mrcvp/image/upload/**',
      },
    ],
  },
  
  // Disable pages directory scanning if you're not using it
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
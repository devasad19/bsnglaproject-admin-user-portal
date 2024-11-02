/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dev-bangla-dashboard.mysoftheaven.com', // Corrected the hostname
            port: '' // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
            
          },
          {
            protocol: 'http',
            hostname: '10.106.22.36', // Corrected the hostname
            port: '' // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
            
          }
        ],
      },
};

export default nextConfig;

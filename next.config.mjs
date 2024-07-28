/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "*.google*.com",
        protocol: "https",
      },
      {
        hostname: "cdn.jsdelivr.net",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

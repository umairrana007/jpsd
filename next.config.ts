import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      /* Unsplash removed to force local images */
      {
        protocol: 'https',
        hostname: 'prod-bwt.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'saylaniwelfare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'edhifoundation.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'alkhidmat.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jpsd.org.pk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.jpsd.org.pk',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const config: NextConfig = {
  images: {
    remotePatterns: [
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
  devIndicators: {
    position: 'bottom-right',
  },
};

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);

export default nextConfig;

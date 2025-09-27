import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true, // This disables ESLint during Vercel builds
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

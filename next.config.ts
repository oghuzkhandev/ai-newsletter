import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },

  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);

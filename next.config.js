/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config)=>{
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  },
  sentry: {
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

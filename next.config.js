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
  headers: async ()=>[
    {
      source: '/:path*{/}?',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'no-referrer',
        },
      ],
    },
  ],
  sentry: {
    hideSourceMaps: true
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false,

    domains: [
      {
        domain: 'fruitspace.ru',
        defaultLocale: 'ru',
      },
      {
        domain: 'fruitspace.one',
        defaultLocale: 'en'
      }
    ]
  },
  output: "standalone"
}

const sentryWebpackPluginOptions = {
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// module.exports = nextConfig
